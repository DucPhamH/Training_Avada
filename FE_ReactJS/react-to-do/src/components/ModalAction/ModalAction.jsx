import { Box, Button, Frame, Modal } from "@shopify/polaris";
import React from "react";

export default function ModalAction({
  active,
  handleChange,
  completeAllTodo,
  removeAllTodo,
  incompleteAllTodo,
  selectedItems,
}) {
  return (
    <Box>
      <Frame>
        <Modal
          size="small"
          titleHidden={true}
          open={active}
          onClose={handleChange}
        >
          <Modal.Section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button
                onClick={() => completeAllTodo(selectedItems)}
                size="large"
                pressed
              >
                Complete
              </Button>
              <Button
                onClick={() => incompleteAllTodo(selectedItems)}
                size="large"
                pressed
              >
                Incomplete
              </Button>
              <Button
                onClick={() => removeAllTodo(selectedItems)}
                size="large"
                pressed
              >
                Delete
              </Button>
            </div>
          </Modal.Section>
        </Modal>
      </Frame>
    </Box>
  );
}
