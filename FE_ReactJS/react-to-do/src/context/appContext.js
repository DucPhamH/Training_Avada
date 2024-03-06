import { createContext, useState } from "react";
import { intialData } from "../constant/data";

const initialAppContext = {
  todos: intialData,
  setTodos: () => null,
};

export const AppContext = createContext(initialAppContext);

export const AppProviderContext = ({ children }) => {
  const [todos, setTodos] = useState(initialAppContext.todos);
  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
