import React, { createContext, useReducer, useContext } from 'react';
import { ACTIONS } from './actions';
import { reducer } from './reducer';

const initialState = {
    user: false,
    access_token: null
};

const storeContext = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [store, storeDispatch] = useReducer(reducer, initialState);

    return <storeContext.Provider value={{ store, storeDispatch }}>{children}</storeContext.Provider>
};

const useStoreContext = () => useContext(storeContext);

export { StoreProvider, useStoreContext, ACTIONS }