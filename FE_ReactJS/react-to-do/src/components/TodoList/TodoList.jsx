import { ResourceList, ResourceItem } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "../TodoItem";
import { fetchApi } from "../../config/api";

export default function TodoList({
  todos,
  completeOneTodo = () => {},
  removeOneTodo = () => {},
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const removeManyTodos = async () => {
    try {
      const objID = { selectedItems: selectedItems };
      console.log(objID);
      const res = await fetchApi({
        method: "POST",
        endpoint: `/removeManyProducts`,
        data: objID,
      });
      console.log(res);
      setSelectedItems([]);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const completeManyTodos = async () => {
    try {
      const objID = { selectedItems: selectedItems };
      const res = await fetchApi({
        method: "PUT",
        endpoint: `/completeManyProducts`,
        data: objID,
      });
      console.log(res);
      setSelectedItems([]);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const incompleteManyTodos = async () => {
    try {
      const objID = { selectedItems: selectedItems };
      const res = await fetchApi({
        method: "PUT",
        endpoint: `/incompleteManyProducts`,
        data: objID,
      });
      console.log(res);
      setSelectedItems([]);
    } catch (err) {
      console.log(err);
    }
  };
  const promotedBulkActions = [
    {
      content: "Incomplete",
      onAction: () => incompleteManyTodos(),
    },
    {
      content: "Complete",
      onAction: () => completeManyTodos(),
    },
    {
      content: "Delete",
      onAction: () => removeManyTodos(),
    },
  ];
  return (
    <ResourceList
      promotedBulkActions={promotedBulkActions}
      items={todos}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      selectable
      renderItem={(item) => {
        return (
          <ResourceItem
            id={item.id}
            accessibilityLabel={`View details for ${item.name}`}
            name={item.name}
          >
            <TodoItem
              id={item.id}
              text={item.name}
              completeOneTodo={completeOneTodo}
              removeOneTodo={removeOneTodo}
              isCompleted={item.isDone}
            />
          </ResourceItem>
        );
      }}
    />
  );
}
