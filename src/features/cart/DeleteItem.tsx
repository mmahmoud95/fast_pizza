import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

const DeleteItem = ({ pizzaId }: { pizzaId: number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteItem(pizzaId));
  };
  return (
    <Button type="small" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteItem;
