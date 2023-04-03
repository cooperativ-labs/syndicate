// store.js
import React, { createContext, useReducer } from 'react';

export interface ApplicationStoreProps {
  ManagerSidebarOpen: boolean;
  WalletModalOpen: boolean;
  WalletActionLockModalOpen: boolean;
  PageIsLoading: boolean;
  ProfilePrivateModalOn: boolean;
  sidebarOpen: boolean;
  noticesOpen: boolean;
  searchText: string;
  project: any;
  dispatch: React.Dispatch<any>;
}

const initialState: ApplicationStoreProps = {
  project: {},
  ManagerSidebarOpen: false,
  WalletModalOpen: false,
  WalletActionLockModalOpen: false,
  PageIsLoading: false,
  ProfilePrivateModalOn: false,
  sidebarOpen: false,
  noticesOpen: true,
  searchText: undefined,
  dispatch: null,
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'TOGGLE_MANAGER_SIDEBAR':
        return { ...state, ManagerSidebarOpen: !state.ManagerSidebarOpen };
      case 'TOGGLE_WALLET_MODAL':
        return { ...state, WalletModalOpen: !state.WalletModalOpen };
      case 'TOGGLE_WALLET_ACTION_LOCK':
        return { ...state, WalletActionLockModalOpen: !state.WalletActionLockModalOpen };
      case 'TOGGLE_LOADING_PAGE_OFF':
        return { ...state, PageIsLoading: false };
      case 'TOGGLE_LOADING_PAGE_ON':
        return { ...state, PageIsLoading: true };
      case 'SET_PROFILE_PRIVATE_MODAL_OFF':
        return { ...state, ProfilePrivateModalOn: false };
      case 'SET_PROFILE_PRIVATE_MODAL_ON':
        return { ...state, ProfilePrivateModalOn: true };
      case 'TOGGLE_SIDEBAR':
        return { ...state, sidebarOpen: !state.sidebarOpen };
      case 'TOGGLE_NOTICES':
        return { ...state, noticesOpen: !state.noticesOpen };
      case 'SET_SEARCHTEXT':
        return { ...state, searchText: action.payload };
      default:
        const error = new Error();
        return { ...state, error };
    }
  }, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
