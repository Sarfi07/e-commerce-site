// context/ActivePageContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type ActivePageContextType = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const ActivePageContext = createContext<ActivePageContextType | undefined>(
  undefined
);

export const ActivePageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePage, setActivePage] = useState<string>("");

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePage = () => {
  const context = useContext(ActivePageContext);
  if (!context) {
    throw new Error("useActivePage must be used within an ActivePageProvider");
  }
  return context;
};
