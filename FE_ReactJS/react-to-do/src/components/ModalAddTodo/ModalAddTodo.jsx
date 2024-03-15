import { Form, FormLayout, Modal, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

export default function ModalAddTodo({
  activeModal,
  handleCreatedChange = () => {},
  addTodo = () => {},
}) {
  const [input, setInput] = useState({});

  const handleInputChange = useCallback((key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name) return;
    addTodo({
      name: input.name,
    });
    setInput((prev) => ({
      ...prev,
      name: "",
    }));
    handleCreatedChange();
  };

  return (
    <Modal
      open={activeModal}
      onClose={handleCreatedChange}
      title="Create todo"
      size="small"
      primaryAction={{
        content: "Add",
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleCreatedChange,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={input.name}
              onChange={(val) => handleInputChange("name", val)}
              label="Title"
              type="text"
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
