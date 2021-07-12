import Remote, { GetRemoteValue, RemoteState } from "../lib/Remote";
import { Action } from "./actions/actions";
import { AddressActions, LOOKUP_POSTAL_CODE_BEGIN, LOOKUP_POSTAL_CODE_COMPLETE, LOOKUP_POSTAL_CODE_ERROR } from "./actions/AddressActions";

export interface IAppState {
    cityName: Remote<string, string>,
    postalCode: string,
}

const initialState: IAppState = {
    cityName: { state: RemoteState.NoValue },
    postalCode: "0000",
};

export default function store(state: IAppState = initialState, action: Action): IAppState {
    return {
        cityName: reduceCityName(state.cityName, action),
        postalCode: reducePostalCode(state.postalCode, action),
    };
}

function reduceCityName(currentState: Remote<string, string>, action: Action): Remote<string, string> {
    switch (action.type)
    {
        case LOOKUP_POSTAL_CODE_BEGIN:
            return {
                state: RemoteState.Fetching,
                value: GetRemoteValue(currentState)
            };
        case LOOKUP_POSTAL_CODE_COMPLETE:
            return {
                state: RemoteState.HasValue,
                value: action.payload
            };
        case LOOKUP_POSTAL_CODE_ERROR:
            return {
                state: RemoteState.Error,
                value: GetRemoteValue(currentState),
                error: action.payload
            };
        default:
            return currentState;
    }
}

function reducePostalCode(currentState: string, action: Action): string {
    switch (action.type)
    {
        case LOOKUP_POSTAL_CODE_BEGIN:
            return action.payload;
        default:
            return currentState;
    }
}