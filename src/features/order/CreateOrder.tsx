import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { AppDispatch, store } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, getUserInfo } from "../user/userSlice";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { IOrder } from "../../utils/types/order";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch: AppDispatch = useDispatch();

  const {
    position,
    address,
    status: addressStatus,
    userName: name,
    error: errorAddress,
  } = useSelector(getUserInfo);
  const [userName, setUserName] = useState(name);

  const totalCartPrice = useSelector(getTotalCartPrice);

  const [withPriority, setWithPriority] = useState("false");
  const priorityPrice = withPriority === "true" ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const { state } = useNavigation();
  const isSubmitting = state === "submitting";

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;

  const handleFetchAddress = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    dispatch(fetchAddress());
  };

  const isLoadingAddress = addressStatus === "loading";

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            defaultValue={userName}
            required
            className="input grow"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-5 flex grow-1 flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow-1">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="relative grow-1">
            <input
              type="text"
              name="address"
              id="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
            {!position.latitude && !position.longitude && (
              <span className="absolute top-[2.8px] right-[3.5px] sm:top-0.25 sm:right-0 md:top-[4.8px] md:right-[4.8px]">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={handleFetchAddress}
                >
                  Get Location
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-0"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(String(e.target.checked))}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input value={JSON.stringify(cart)} type="hidden" name="cart" />
          <input
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
            type="hidden"
            name="position"
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number, we might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) return errors;
  const newOrder: IOrder = await createOrder(order);

  //Do not overuse this technique
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
