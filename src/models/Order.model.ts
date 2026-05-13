export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string | null;
  productImg: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  variant?: string | null;
  /** Present when loaded from API with product relation */
  product?: { slug: string } | null;
}

export type OrderStatus = "Pending" | "Processing" | "Delivered" | "Cancelled";

interface Order {
  /** Buyer (from API include user) */
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string | null;
  };
  id: string;
  tax: number;
  discount: number;
  shippingCost?: number;
  totalPrice: number;
  isDelivered: boolean;
  shippingAddress: string;
  courierName?: string | null;
  courierService?: string | null;
  courierEtd?: string | null;
  paymentMethod?: string;
  status: OrderStatus;
  createdAt: Date;
  deliveredAt?: Date | null;
  items: OrderItem[];
}

export default Order;
