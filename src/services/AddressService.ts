import Remote from "../lib/Remote";
import { TAction } from "../reducers/actions/actions";
import { AddressActions } from "../reducers/actions/AddressActions";
import axios from "axios";
import { LookupPostalCodeResponse } from "../lib/Models/LookupPostalCodeResponse";

export const AddressService = {
    lookupPostalCode,
};

function lookupPostalCode(postalCode: string): TAction<Promise<string>, void> {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(AddressActions.lookupPostalCodebegin(postalCode));

            axios.get<LookupPostalCodeResponse>(`https://api.dataforsyningen.dk/postnumre?nr=${postalCode}`)
                .then(result => {
                    dispatch(AddressActions.lookupPostalCodeComplete(result.data[0].navn));
                    resolve(result.data[0].navn);
                    return;
                })
                .catch(result => {
                    switch (result.status)
                    {
                        case 404:
                            dispatch(AddressActions.lookupPostalCodeError("Postal code not found"));
                            reject();
                            return;
                        case 400:
                            dispatch(AddressActions.lookupPostalCodeError("Invalid postal code"));
                            reject();
                            return;
                        default:
                            dispatch(AddressActions.lookupPostalCodeError("An unknown error occurred"));
                            reject();
                            return;
                    }
                });
        });
    };
}
