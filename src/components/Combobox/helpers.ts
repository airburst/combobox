import {isOptionGroup, OptionGroup, Options} from "./types";

const sortByText = (a: {text: string}, b: {text: string}) => {
  if (a.text < b.text) {
    return -1;
  }
  if (a.text > b.text) {
    return 1;
  }
  return 0;
};

export const filterOptions = (options: Options, inputValue: string) => {
  if (!options) {
    return [];
  }

  if (isOptionGroup(options)) {
    const filteredGroup: OptionGroup[] = [];

    options.map((group) => {
      const filterOptions = group.options
        .filter((option) =>
          option.text.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .sort(sortByText);

      if (filterOptions.length > 0) {
        filteredGroup.push({
          category: group.category,
          options: filterOptions,
        });
      }
    });

    return filteredGroup;
  }

  return options
    .filter((option) =>
      option.text.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .sort(sortByText);
};
