"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const NavsContext = createContext({
  activeNavs: 0,
  setActiveNavs: (val: number) => {},
  isModalOpen: false,
  setIsModalOpen: (val: boolean) => {},
});

function NavsProvider({ children }: { children: ReactNode }) {
  const [activeNavs, setActiveNavs] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    return setActiveNavs(0);
  }, []);

  return (
    <NavsContext.Provider
      value={{ activeNavs, setActiveNavs, isModalOpen, setIsModalOpen }}
    >
      {children}
    </NavsContext.Provider>
  );
}

function useNavsProvider() {
  const context = useContext(NavsContext);
  return context;
}

export { NavsProvider, useNavsProvider };
