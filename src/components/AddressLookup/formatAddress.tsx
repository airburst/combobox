import {Option} from "../Combobox/types";
import {
  FindAddressError,
  FindAddressResponse,
  FindAddressResult,
} from "./types";

// Cast a string to an Option
export const optionise = (text: string): Option => ({
  id: text,
  text,
  value: text,
});

export const formatAddress = ({Items}: FindAddressResponse) => {
  if (!Items || !Array.isArray(Items)) {
    return [optionise("No address found")];
  }

  if ((Items[0] as FindAddressError).Error) {
    return [optionise(Items[0].Description)];
  }

  return (Items as FindAddressResult[]).map(
    (item): Option => ({
      id: item.Id,
      text: `${item.Text}, ${item.Description}`,
      value: item.Text,
    }),
  );
};
