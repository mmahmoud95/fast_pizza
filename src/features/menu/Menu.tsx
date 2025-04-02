import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import { IMenuItem } from "../../utils/types/menu";
import MenuItem from "./MenuItem";

function Menu() {
  const menu: IMenuItem[] = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu?.map((pizza) => <MenuItem pizza={pizza} key={pizza.id} />)}
    </ul>
  );
}

export default Menu;

export async function loader() {
  const menu = await getMenu();
  return menu;
}
