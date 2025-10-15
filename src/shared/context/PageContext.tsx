"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PageState = "home" | "download";

interface PageContextType {
  currentPage: PageState;
  setCurrentPage: (page: PageState) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [currentPage, setCurrentPage] = useState<PageState>("home");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
