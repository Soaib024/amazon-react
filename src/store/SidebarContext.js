import { createContext } from "react";

const SidebarContext = createContext({
  sidebarVisible: true,
  showSidebar: () => {},
  hideSidebar: () => {}
})

export default SidebarContext;