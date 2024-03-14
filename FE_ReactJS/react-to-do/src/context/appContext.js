import { createContext, useState } from "react";

const initialAppContext = {
  todos: [],
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
