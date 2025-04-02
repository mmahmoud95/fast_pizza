import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

export default function UpdateItemQuantity({
  quantity,
  pizzaId,
}: {
  quantity: number;
  pizzaId: number;
}) {
  const dispatch = useDispatch();
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(pizzaId));
  };
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="rounded" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span className="text-sm font-medium text-black"> {quantity} </span>{" "}
      <Button type="rounded" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}
