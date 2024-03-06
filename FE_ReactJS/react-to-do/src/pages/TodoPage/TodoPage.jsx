import React, { useCallback, useContext, useState } from "react";
import TodoForm from "../../components/TodoForm";
import { Box } from "@shopify/polaris";
import Todo from "../../components/Todo";
import ModalAddTodo from "../../components/ModalAddTodo";
import { AppContext } from "../../context/appContext";

export default function TodoPage() {
  const { todos, setTodos } = useContext(AppContext);

  const addTodo = (text) => {
    const newTodos = [
      ...todos,
      { id: Date.now(), text: text, isCompleted: false },
    ];
    console.log(newTodos);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  return (
    <>
      <Box>
        <TodoForm handleChange={handleChange} />
        <Box style={{ marginRight: "18rem", marginLeft: "18rem" }}>
          <Todo completeTodo={completeTodo} removeTodo={removeTodo} />
        </Box>
      </Box>
      <ModalAddTodo
        addTodo={addTodo}
        active={active}
        handleChange={handleChange}
      />
    </>
  );
}
