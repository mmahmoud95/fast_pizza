import { ICartItem } from "./cart";

export interface IOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: ICartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: "Delivered" | "Preparing";
}
