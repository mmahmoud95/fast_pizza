import { createBrowserRouter } from "react-router";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import {
  Cart,
  createNewOrderAction,
  CreateOrder,
  Menu,
  menuLoader,
  Order,
  orderLoader,
  updateOrderAction,
} from "./features";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },
      {
        path: "/menu",
        Component: Menu,
        loader: menuLoader,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/order/new",
        Component: CreateOrder,
        action: createNewOrderAction,
      },
      {
        path: "/order/:orderId",
        Component: Order,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
