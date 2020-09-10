import React, { createContext, useReducer, useContext } from 'react';
import { ACTIONS } from './actions';
import { reducer } from './reducer';

const initialState = {
    user: false,
    access_token: null
};

const storeContext = createContext(initialState);

const StoreProvider = ({ children }) => {
    const storeReducer = useReducer(reducer, initialState);

    return <storeContext.Provider value={ storeReducer }>{children}</storeContext.Provider>
};

const useStore = () => useContext(storeContext);

export { StoreProvider, useStore, ACTIONS }