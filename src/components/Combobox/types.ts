import {ChangeEvent, FocusEvent} from "react";

export type Option = {
  id: string;
  text: string;
  value: string | number | boolean;
  callback?: () => Promise<Options>;
};

export type OptionGroup = {
  category: string;
  options: Option[];
};

export type Options = Option[] | OptionGroup[];

export const isOptionGroup = (options: Options): options is OptionGroup[] => {
  return (options as OptionGroup[])[0].options !== undefined;
};

export type ComboboxProps = {
  label: string;
  defaultValue?: string;
  options?: Options;
  onSelected?: (selection: Option) => void;
  onChange?: (searchTerm: string) => Promise<Options>;
  isFetching?: boolean;
  delay?: number;
};

export type ShowOptionsEvent =
  | ChangeEvent<HTMLInputElement>
  | FocusEvent<Element, Element>;
