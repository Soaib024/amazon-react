import { useReducer } from "react";
import SidebarContext from "./SidebarContext";

const defaultSidebarState = {
  sidebarVisible: false,
  showSidebar: () => {},
  hideSidebar: () => {},
};

const sidebarReducer = (state, action) => {
  const newState = { ...state };
  newState.sidebarVisible = !newState.sidebarVisible;
  return newState;
};
const SidebarProvider = ({ children }) => {
  const [sidebarState, dispatchSidebarAction] = useReducer(
    sidebarReducer,
    defaultSidebarState
  );

  const showSidebarHandler = () => {
    dispatchSidebarAction();
  };

  const hideSidebarHandler = () => {
    dispatchSidebarAction();
  };

  const sidebarContext = {
    sidebarVisible: sidebarState.sidebarVisible,
    showSidebar: showSidebarHandler,
    hideSidebar: hideSidebarHandler,
  };

  return (
    <SidebarContext.Provider value={sidebarContext}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
