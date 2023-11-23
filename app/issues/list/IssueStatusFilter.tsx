"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: Status.OPEN },
  { label: "Closed", value: Status.CLOSED },
  { label: "In Progress", value: Status.INPROGRESS },
];

export default function IssueStatusFilter() {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== "ALL" ? `?status=${status}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
