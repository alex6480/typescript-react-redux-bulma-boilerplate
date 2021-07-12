import { createAction } from "./actions";

export const LOOKUP_POSTAL_CODE_BEGIN = "LOOKUP_POSTAL_CODE_BEGIN";
export const LOOKUP_POSTAL_CODE_COMPLETE = "LOOKUP_POSTAL_CODE_COMPLETE";
export const LOOKUP_POSTAL_CODE_ERROR = "LOOKUP_POSTAL_CODE_ERROR";

export const AddressActions = {
    lookupPostalCodebegin: (postalCode: string) =>
        createAction(LOOKUP_POSTAL_CODE_BEGIN, postalCode),
    lookupPostalCodeComplete: (cityName: string) =>
        createAction(LOOKUP_POSTAL_CODE_COMPLETE, cityName),
    lookupPostalCodeError: (error: string) =>
        createAction(LOOKUP_POSTAL_CODE_ERROR, error),
};
