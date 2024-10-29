import {Combobox} from "../Combobox/Combobox";
import {Option} from "../Combobox/types";
import {formatAddress} from "./formatAddress";

const API_KEY = import.meta.env.API_KEY;
const FIND_URL =
  "https://api.addressy.com/Capture/Interactive/Find/v1.00/json3.ws";
const LIMIT = 10;

export const AddressLookup = () => {
  // const [isFetching, setIsFetching] = useState(false);

  const lookupAddress = (partialAddress: string): Promise<Option[]> => {
    // setIsFetching(true);
    return fetch(
      `${FIND_URL}?Key=${API_KEY}&Text=${partialAddress}&Limit=${LIMIT}`,
    )
      .then((response) => response.json())
      .then((data) => {
        // setIsFetching(false);
        return formatAddress(data);
      });
  };

  return (
    <Combobox
      label="Find address"
      onChange={lookupAddress}
      // isFetching={isFetching}
      onSelected={(address) => console.log(JSON.stringify(address, null, 2))}
    />
  );
};
