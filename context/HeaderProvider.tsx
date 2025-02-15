"use client";
import { createContext, ReactNode, useContext, useState } from "react";

const HeaderContext = createContext({
  toggleSearch: false,
  onToggleSearch: () => {},
});

function HeaderProvider({ children }: { children: ReactNode }) {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  function onToggleSearch() {
    setToggleSearch((c) => !c);
  }

  return (
    <HeaderContext.Provider value={{ toggleSearch, onToggleSearch }}>
      {children}
    </HeaderContext.Provider>
  );
}

function useHeaderProvider() {
  const context = useContext(HeaderContext);
  return context;
}

export { HeaderProvider, useHeaderProvider };
