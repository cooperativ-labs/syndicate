// store.js
import React, { createContext, useReducer } from 'react';

export interface ApplicationStoreProps {
  ManagerSidebarOpen: boolean;
  WalletModalOpen: boolean;
  WalletActionLockModalOpen: boolean;
  CreateOrgModalOpen: boolean;
  PageIsLoading: boolean;
  ProfilePrivateModalOn: boolean;
  // SidebarOpen: boolean;
  NoticesOpen: boolean;
  SearchText: string;
  ActiveOrg: string;
  dispatch: React.Dispatch<any>;
}

const initialState: ApplicationStoreProps = {
  ManagerSidebarOpen: false,
  WalletModalOpen: false,
  WalletActionLockModalOpen: false,
  CreateOrgModalOpen: false,
  PageIsLoading: false,
  ProfilePrivateModalOn: false,
  // SidebarOpen: false,
  NoticesOpen: true,
  SearchText: undefined,
  ActiveOrg: undefined,
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
      case 'TOGGLE_CREATE_ORG_MODAL':
        return { ...state, CreateOrgModalOpen: !state.CreateOrgModalOpen };
      case 'TOGGLE_LOADING_PAGE_OFF':
        return { ...state, PageIsLoading: false };
      case 'TOGGLE_LOADING_PAGE_ON':
        return { ...state, PageIsLoading: true };
      case 'SET_PROFILE_PRIVATE_MODAL_OFF':
        return { ...state, ProfilePrivateModalOn: false };
      case 'SET_PROFILE_PRIVATE_MODAL_ON':
        return { ...state, ProfilePrivateModalOn: true };
      // case 'TOGGLE_SIDEBAR':
      //   return { ...state, SidebarOpen: !state.SidebarOpen };
      case 'TOGGLE_NOTICES':
        return { ...state, NoticesOpen: !state.NoticesOpen };
      case 'SET_SEARCHTEXT':
        return { ...state, SearchText: action.payload };
      case 'SET_ACTIVE_ORG':
        return { ...state, ActiveOrg: action.payload };
      default:
        return { ...state };
    }
  }, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
