"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: Status.OPEN },
  { label: "Closed", value: Status.CLOSED },
  { label: "In Progress", value: Status.INPROGRESS },
];

export default function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status !== "ALL") params.append("status", status);

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? `?${params.toString()}` : "";
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
