export type Option = {
  id: string;
  text: string;
  value: string | number | boolean;
};

export type OptionGroup = {
  category: string;
  options: Option[];
};

export type Options = Option[] | OptionGroup[];

export const isOptionGroup = (options: Options): options is OptionGroup[] => {
  return (options as OptionGroup[])[0].options !== undefined;
};
