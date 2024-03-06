import {
  Box,
  Form,
  FormLayout,
  Frame,
  Modal,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

export default function ModalAddTodo({ active, handleChange, addTodo }) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addTodo(text);
    setText("");
    handleChange();
  };
  const handleTextChange = useCallback((value) => setText(value), []);

  return (
    <Box>
      <Frame>
        <Modal
          open={active}
          onClose={handleChange}
          title="Create todo"
          size="small"
          primaryAction={{
            content: "Add",
            onAction: handleSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={text}
                  onChange={handleTextChange}
                  label="Title"
                  type="text"
                />
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
      </Frame>
    </Box>
  );
}
