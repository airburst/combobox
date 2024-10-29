import {RefObject, useId} from "react";
import {ComboboxListItem} from "./ComboboxListItem";
import {Option} from "./types";

type ComboboxListGroupProps = {
  listRef: RefObject<HTMLUListElement>;
  category: string;
  options: Option[];
  onSelected?: (option: Option) => void;
};

export const ComboboxListGroup = ({
  listRef,
  category,
  options,
  onSelected,
}: ComboboxListGroupProps) => {
  const groupId = useId();

  return (
    <ul role="group" aria-labelledby={groupId} ref={listRef}>
      <li role="presentation" id={groupId}>
        {category}
      </li>
      {options.map((option) => (
        <ComboboxListItem key={option.id} {...option} onSelected={onSelected} />
      ))}
    </ul>
  );
};
