export type FindAddressResult = {
  Id: string;
  Type: string;
  Text: string;
  Highlight: string;
  Description: string;
};

export type AddressError = {
  Cause: string;
  Error: string;
  Description: string;
  Resolution: string;
};

export type FindAddressResponse = {
  Items: FindAddressResult[] | AddressError[];
};

export type RetrieveAddressResult = {
  Id: string;
  Type: string;
  City: string;
  Line1: string;
  Line2: string;
  PostalCode: string;
  Label: string;
};

export type RetrieveAddressResponse = {
  Items: RetrieveAddressResult[] | AddressError[];
};
