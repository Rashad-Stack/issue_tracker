import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

export default function IssueSummery({ open, closed, inProgress }: Props) {
  const statuses: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: Status.OPEN,
    },
    {
      label: "Closed Issues",
      value: closed,
      status: Status.CLOSED,
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: Status.INPROGRESS,
    },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ label, value, status }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${status}`}
              className="text-sm font-medium"
            >
              {label}
            </Link>
            <Text size="5" weight="bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
