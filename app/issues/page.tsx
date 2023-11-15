import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issus</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="max-md:hidden">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="max-md:hidden">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="max-md:hidden">{issue.status}</Table.Cell>
              <Table.Cell className="max-md:hidden">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
