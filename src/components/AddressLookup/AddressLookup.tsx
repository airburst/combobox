import {Combobox} from "../Combobox/Combobox";
import {AsyncResponse, Option} from "../Combobox/types";
import {formatItems, formatUkAddress} from "./formatAddress";

const API_KEY = import.meta.env.API_KEY;
const BASE_URL = "https://api.addressy.com/Capture/Interactive";
export const FIND_URL = `${BASE_URL}/Find/v1.00/json3.ws?Key=${API_KEY}`;
const RETRIEVE_URL = `${BASE_URL}/Retrieve/v1.2/json3.ws?Key=${API_KEY}`;
const LIMIT = 10;

export const AddressLookup = () => {
  // onChange action: find addresses
  const findAddresses = (partialAddress: string): Promise<AsyncResponse> => {
    if (!partialAddress) {
      return Promise.resolve({error: new Error("No search term provided")});
    }

    return fetch(`${FIND_URL}&Text=${partialAddress}&Limit=${LIMIT}`)
      .then((response) => response.json())
      .then((data) => formatItems(data));
  };

  // onSelected action: retrieve address
  const retrieveAddress = ({id}: Option) => {
    fetch(`${RETRIEVE_URL}&Id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const address = formatUkAddress(data);
        console.log(JSON.stringify(address, null, 2));
      });
  };

  return (
    <Combobox
      label="Find address"
      delay={300}
      onChange={findAddresses}
      onSelected={retrieveAddress}
    />
  );
};
