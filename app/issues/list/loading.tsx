import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import IssueAction from "./issueAction";

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <IssueAction />

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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="max-md:hidden">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="max-md:hidden">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
