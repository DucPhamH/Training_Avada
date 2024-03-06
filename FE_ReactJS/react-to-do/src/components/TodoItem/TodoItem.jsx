import { Badge, Box, Button, Text } from "@shopify/polaris";
import React from "react";

export default function TodoItem({
  id,
  text,
  isCompleted,
  completeTodo,
  removeTodo,
}) {
  const checkComplete = () => {
    if (isCompleted) {
      return <Badge status="success">Complete</Badge>;
    } else {
      return <Badge tone="attention">Incomplete</Badge>;
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text variant="bodyMd" fontWeight="bold" as="h3">
        {text}
      </Text>
      <Box
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {checkComplete()}
        <Button onClick={() => completeTodo(id)}>Complete</Button>
        <Button onClick={() => removeTodo(id)} tone="critical">
          Delete
        </Button>
      </Box>
    </Box>
  );
}
