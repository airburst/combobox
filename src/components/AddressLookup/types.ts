export type FindAddressResult = {
  Id: string;
  Type: string;
  Text: string;
  Highlight: string;
  Description: string;
};

export type FindAddressError = {
  Cause: string;
  Error: string;
  Description: string;
  Resolution: string;
};

export type FindAddressResponse = {
  Items: FindAddressResult[] | FindAddressError[];
};
