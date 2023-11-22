"use client";

import { Select } from "@radix-ui/themes";

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assignee..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="item-1">Rashad</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
