import { Badge, Button, InlineStack, Text } from "@shopify/polaris";
import React from "react";

export default function TodoItem({
  id,
  text,
  isCompleted,
  completeOneTodo = () => {},
  removeOneTodo = () => {},
}) {
  const StatusBadge = () => {
    if (isCompleted) {
      return <Badge status="success">Complete</Badge>;
    }

    return <Badge tone="attention">Incomplete</Badge>;
  };
  return (
    <InlineStack align="space-between" blockAlign="center">
      <Text variant="bodyMd" fontWeight="bold" as="h3">
        {text}
      </Text>
      <InlineStack blockAlign="center" gap="200">
        <StatusBadge />
        <Button onClick={() => completeOneTodo(id)}>Complete</Button>
        <Button onClick={() => removeOneTodo(id)} tone="critical">
          Delete
        </Button>
      </InlineStack>
    </InlineStack>
  );
}
