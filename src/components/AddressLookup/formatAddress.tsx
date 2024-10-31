import {AsyncResponse, Option} from "../Combobox/types";
import {FIND_URL} from "./AddressLookup";
import {
  AddressError,
  FindAddressResponse,
  FindAddressResult,
  RetrieveAddressResponse,
  RetrieveAddressResult,
} from "./types";

// Cast a string to an Option
export const optionise = (text: string): Option => ({
  id: text,
  text,
  value: text,
});

// Callback function to expand addresses from a group container
const expandAddress = (id: string): Promise<AsyncResponse> =>
  fetch(`${FIND_URL}&Container=${id}`)
    .then((response) => response.json())
    .then((data) => formatItems(data));

const formatError = (message: string) => ({
  error: new Error(message),
});

export const formatItems = ({Items}: FindAddressResponse): AsyncResponse => {
  if (!Items || !Array.isArray(Items)) {
    return formatError("No address found");
  }

  if ((Items[0] as AddressError).Error) {
    console.error(Items[0]);

    return formatError(Items[0].Description);
  }

  return {
    options: (Items as FindAddressResult[]).map(
      (item): Option => ({
        id: item.Id,
        text: `${item.Text}, ${item.Description}`,
        value: item.Text,
        // Add a callback to trigger secondary search
        // if the address type is not "Address"
        callback:
          item.Type === "Address" ? undefined : () => expandAddress(item.Id),
      }),
    ),
  };
};

export const formatUkAddress = ({Items}: RetrieveAddressResponse) => {
  if (!Items || !Array.isArray(Items)) {
    return Error("No address found");
  }

  if ((Items[0] as AddressError).Error) {
    return Error((Items[0] as AddressError).Description);
  }

  const {Line1, Line2, City, PostalCode} = (
    Items as RetrieveAddressResult[]
  )[0];

  return {
    address_1: Line1,
    address_2: Line2,
    town: City,
    uk_postcode: PostalCode,
  };
};
