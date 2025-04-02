import { useFetcher } from "react-router";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = () => {
  const fetcher = useFetcher();
  const isUpdating = fetcher.state === "submitting";
  const errorMessage = fetcher.data?.error;
  return (
    <div>
      <fetcher.Form method="PATCH" className="text-right">
        <Button type="primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Make Priority"}
        </Button>
      </fetcher.Form>
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default UpdateOrder;

export async function action({ params }: { params: { orderId?: string } }) {
  try {
    if (!params.orderId) throw new Error("Order ID is missing");

    const data = { priority: true };
    const res = await updateOrder(params.orderId, data);
    return res; // إعادة الاستجابة لو كانت مطلوبة في الـ UI
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
