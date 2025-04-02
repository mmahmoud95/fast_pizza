import { formatCurrency } from "../../utils/helpers";
import { ICartItem } from "../../utils/types/cart";

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: {
  item: ICartItem;
  isLoadingIngredients: boolean;
  ingredients?: string[];
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 capitalize italic">
        {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}{" "}
      </p>
    </li>
  );
}

export default OrderItem;
