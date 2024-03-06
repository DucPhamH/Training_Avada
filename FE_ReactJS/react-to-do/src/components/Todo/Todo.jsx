import { ResourceList, ResourceItem, Box } from "@shopify/polaris";
import { useCallback, useContext, useEffect, useState } from "react";
import TodoItem from "../TodoItem";
import ModalAction from "../ModalAction";
import { AppContext } from "../../context/appContext";

export default function Todo({ completeTodo, removeTodo }) {
  const { todos, setTodos } = useContext(AppContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);
  const handleChangeActive = useCallback(() => setActive(true), []);
  const handleChange = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (todos.length === selectedItems.length && todos.length > 0) {
      handleChangeActive();
    }
  }, [selectedItems, handleChangeActive, todos]);

  // selectedItems la 1 mang id : [1,2,3]
  const removeAllTodo = (selectedItems) => {
    const newTodos = todos.filter((todo) => !selectedItems.includes(todo.id));
    setTodos(newTodos);
    setSelectedItems([]);
    setActive(false);
  };
  // console.log(todos);
  const completeAllTodo = (selectedItems) => {
    const newTodos = todos.map((todo) => {
      if (selectedItems.includes(todo.id)) {
        todo.isCompleted = true;
      }
      return todo;
    });
    setTodos(newTodos);
    setSelectedItems([]);
    setActive(false);
  };

  const incompleteAllTodo = (selectedItems) => {
    const newTodos = todos.map((todo) => {
      if (selectedItems.includes(todo.id)) {
        todo.isCompleted = false;
      }
      return todo;
    });
    setTodos(newTodos);
    setSelectedItems([]);
    setActive(false);
  };
  return (
    <>
      <Box>
        <ResourceList
          items={todos}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
          renderItem={(item) => {
            console.log(item.isCompleted);
            return (
              <ResourceItem
                id={item.id}
                accessibilityLabel={`View details for ${item.text}`}
                name={item.text}
              >
                <TodoItem
                  id={item.id}
                  text={item.text}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  isCompleted={item.isCompleted}
                />
              </ResourceItem>
            );
          }}
        />
      </Box>
      <ModalAction
        completeAllTodo={completeAllTodo}
        removeAllTodo={removeAllTodo}
        incompleteAllTodo={incompleteAllTodo}
        selectedItems={selectedItems}
        active={active}
        handleChange={handleChange}
      />
    </>
  );
}
