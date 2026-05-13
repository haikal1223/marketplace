import { NextRequest, NextResponse } from "next/server";
import { prisma } from "lib/prisma";
import { requireAuth } from "lib/auth-helpers";

// POST /api/checkout — create order from cart
export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await req.json();
  const {
    shippingAddress,
    paymentMethod = "COD",
    tax = 0,
    discount = 0,
  } = body;

  // Multi-vendor checkout (1 order per vendor)
  const orders = body?.orders as
    | Array<{
        shopId: string;
        shippingCost: number;
        courierName: string;
        courierService: string;
        courierEtd: string;
        items: Array<{
          name: string;
          price: number;
          qty: number;
          imgUrl: string;
          productId: string;
          variant?: string | null;
        }>;
      }>
    | undefined;

  if (Array.isArray(orders) && orders.length > 0) {
    const overallItemsTotal = orders.reduce((sum, o) => {
      const itemsTotal =
        o.items?.reduce((s, it) => s + it.price * it.qty, 0) ?? 0;
      return sum + itemsTotal;
    }, 0);

    const created = [];

    for (const o of orders) {
      const itemsTotal = o.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
      );
      const share = overallItemsTotal > 0 ? itemsTotal / overallItemsTotal : 0;

      const orderTax = tax * share;
      const orderDiscount = discount * share;

      const totalPrice =
        itemsTotal + (o.shippingCost ?? 0) + orderTax - orderDiscount;

      const createdOrder = await prisma.order.create({
        data: {
          userId: user!.id,
          tax: orderTax,
          discount: orderDiscount,
          shippingCost: o.shippingCost ?? 0,
          totalPrice,
          shippingAddress,
          courierName: o.courierName ?? null,
          courierService: o.courierService ?? null,
          courierEtd: o.courierEtd ?? null,
          paymentMethod,
          items: {
            create: o.items.map((item) => ({
              productId: item.productId ?? null,
              productImg: item.imgUrl,
              productName: item.name,
              productPrice: item.price,
              productQuantity: item.qty,
              variant: item.variant ?? null,
            })),
          },
        },
        include: { items: true },
      });

      created.push(createdOrder);
    }

    return NextResponse.json(
      { orderIds: created.map((o) => o.id) },
      { status: 201 },
    );
  }

  // Backward-compatible single-order checkout
  const {
    items,
    shippingCost = 0,
    courierName,
    courierService,
    courierEtd,
  } = body as {
    items:
      | Array<{
          name: string;
          price: number;
          qty: number;
          imgUrl: string;
          productId: string;
          variant?: string | null;
        }>
      | undefined;
    shippingCost?: number;
    courierName?: string;
    courierService?: string;
    courierEtd?: string;
  };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const itemsTotal = items.reduce(
    (sum: number, item: { price: number; qty: number }) =>
      sum + item.price * item.qty,
    0,
  );

  const totalPrice = itemsTotal + shippingCost + tax - discount;

  const order = await prisma.order.create({
    data: {
      userId: user!.id,
      tax,
      discount,
      shippingCost,
      totalPrice,
      shippingAddress,
      courierName: courierName ?? null,
      courierService: courierService ?? null,
      courierEtd: courierEtd ?? null,
      paymentMethod,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId ?? null,
          productImg: item.imgUrl,
          productName: item.name,
          productPrice: item.price,
          productQuantity: item.qty,
          variant: item.variant ?? null,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json({ id: order.id }, { status: 201 });
}
