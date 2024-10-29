import clsx from "clsx";
import {Option} from "./types";

export type ComboboxListItemProps = Option & {
  focused?: boolean;
  onSelected?: (option: Option) => void;
};

export const ComboboxListItem = ({
  id,
  text,
  value,
  focused,
  onSelected,
}: ComboboxListItemProps) => {
  const handleSelected = () => {
    onSelected?.({id, text, value});
  };

  const classes = clsx("combobox__listitem", {focused});

  return (
    <li role="option" className={classes} onClick={handleSelected}>
      {text}
    </li>
  );
};
