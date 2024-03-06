import { Box, Button, Page } from "@shopify/polaris";
import React from "react";

export default function TodoForm({ addTodo, handleChange }) {
  return (
    <>
      <Box>
        <Page
          title="Todoes"
          primaryAction={
            <Button variant="primary" onClick={handleChange}>
              Create
            </Button>
          }
        ></Page>
      </Box>
    </>
  );
}
