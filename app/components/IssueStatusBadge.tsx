import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "orange" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  INPROGRESS: { label: "In progress", color: "orange" },
  CLOSED: { label: "Closed", color: "green" },
};

export default function IssueStatusBadge({ status }: { status: Status }) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
