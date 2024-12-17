import { createContext, useContext } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  const myContext = useContext(MyContext);
  if (myContext === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return myContext;
};

export const MyContextProvider = ({ children }) => {
  const contextValue = {
    example: "Hello, World!",
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
