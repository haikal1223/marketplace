import { auth } from "lib/auth";
import { prisma } from "lib/prisma";

/** Shared queries — callers must enforce auth (route + requireRole or RSC + auth()). */

export async function fetchVendorProductReviewsForUser(userId: string) {
  const shop = await prisma.shop.findUnique({
    where: { userId },
  });
  if (!shop) return null;

  const reviews = await prisma.review.findMany({
    where: { product: { shopId: shop.id } },
    include: {
      product: { select: { id: true, title: true, thumbnail: true } },
      customer: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({
    rating: r.rating,
    comment: r.comment,
    name: r.product.title,
    image: r.product.thumbnail,
    customer: `${r.customer.firstName} ${r.customer.lastName}`,
  }));
}

export async function fetchVendorRefundRequestsForUser(userId: string) {
  const shop = await prisma.shop.findUnique({
    where: { userId },
  });
  if (!shop) return null;

  return prisma.refundRequest.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchVendorPayoutRequestsForUser(userId: string) {
  const shop = await prisma.shop.findUnique({
    where: { userId },
  });
  if (!shop) return null;

  const payouts = await prisma.payoutRequest.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "desc" },
  });

  return payouts.map((p, i) => ({
    no: i + 1,
    amount: p.amount,
    date: p.createdAt.toLocaleDateString("en-GB"),
    status: p.status,
    message: p.message,
  }));
}

/** Server Components / cached loaders — uses session */
export async function getVendorProductReviewsData() {
  const session = await auth();
  if (!session?.user?.id) return [];
  const role = session.user.role;
  if (role !== "VENDOR" && role !== "ADMIN") return [];

  return (await fetchVendorProductReviewsForUser(session.user.id)) ?? [];
}

export async function getVendorRefundRequestsData() {
  const session = await auth();
  if (!session?.user?.id) return [];
  const role = session.user.role;
  if (role !== "VENDOR" && role !== "ADMIN") return [];

  return (await fetchVendorRefundRequestsForUser(session.user.id)) ?? [];
}

export async function getVendorPayoutRequestsData() {
  const session = await auth();
  if (!session?.user?.id) return [];
  const role = session.user.role;
  if (role !== "VENDOR" && role !== "ADMIN") return [];

  return (await fetchVendorPayoutRequestsForUser(session.user.id)) ?? [];
}
