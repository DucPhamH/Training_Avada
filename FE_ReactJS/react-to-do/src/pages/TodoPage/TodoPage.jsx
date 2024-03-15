import React, { useCallback, useState } from "react";
import { Page } from "@shopify/polaris";
import ModalAddTodo from "../../components/ModalAddTodo";
import TodoList from "../../components/TodoList";

import useFetchApi from "../../hooks/useFetchApi";
import { fetchApi } from "../../config/api";

export default function TodoPage() {
  const { data: todos, setData } = useFetchApi("/products");

  const [activeModal, setActiveModal] = useState(false);

  const handleCreatedChange = useCallback(
    () => setActiveModal(!activeModal),
    [activeModal]
  );

  const addTodo = async (value) => {
    try {
      console.log(value);
      const data = {
        name: value.name,
      };

      const res = await fetchApi({
        method: "POST",
        endpoint: "/products",
        data: data,
      });
      if (res.success === true) {
        setData(res.data);
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const completeOneTodo = async (id) => {
    try {
      const data = {
        isDone: true,
      };
      const res = await fetchApi({
        method: "PUT",
        endpoint: `/products/${id}`,
        data: data,
      });
      if (res.success === true) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeOneTodo = async (id) => {
    try {
      const res = await fetchApi({
        method: "DELETE",
        endpoint: `/products/${id}`,
      });
      if (res.success === true) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create",
        onAction: handleCreatedChange,
      }}
    >
      <TodoList
        setData={setData}
        todos={todos}
        completeOneTodo={completeOneTodo}
        removeOneTodo={removeOneTodo}
      />

      <ModalAddTodo
        addTodo={addTodo}
        activeModal={activeModal}
        handleCreatedChange={handleCreatedChange}
      />
    </Page>
  );
}
