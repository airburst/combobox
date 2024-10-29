import {Combobox} from "../Combobox/Combobox";
import {Option} from "../Combobox/types";
import {formatItems, formatUkAddress} from "./formatAddress";

const API_KEY = import.meta.env.API_KEY;
const BASE_URL = "https://api.addressy.com/Capture/Interactive";
const FIND_URL = `${BASE_URL}/Find/v1.00/json3.ws`;
const RETRIEVE_URL = `${BASE_URL}/Retrieve/v1.2/json3.ws`;
const LIMIT = 10;

// TODO: Repeat lookup with Container param
// if Type is not "Address" or "Premise"
export const AddressLookup = () => {
  const findAddresses = (partialAddress: string): Promise<Option[]> => {
    return fetch(
      `${FIND_URL}?Key=${API_KEY}&Text=${partialAddress}&Limit=${LIMIT}`,
    )
      .then((response) => response.json())
      .then((data) => {
        return formatItems(data);
      });
  };

  const retrieveAddress = ({id}: Option) => {
    fetch(`${RETRIEVE_URL}?Key=${API_KEY}&Id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const address = formatUkAddress(data);
        console.log(JSON.stringify(address, null, 2));
      });
  };

  return (
    <Combobox
      label="Find address"
      onChange={findAddresses}
      onSelected={retrieveAddress}
    />
  );
};
