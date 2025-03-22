import { FC } from "react";

interface ItemsListHeaderProps {
  items: string[];
}

const ItemsListHeader: FC<ItemsListHeaderProps> = ({ items }) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        {items.map((item, index) => (
          <th key={index} className="py-3 px-4 text-left">
            {item}
          </th>
        ))}
        <th className="py-3 px-6 text-right ">Akcje</th>
      </tr>
    </thead>
  );
};

export default ItemsListHeader;
