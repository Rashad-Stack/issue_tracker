import { Button } from "@radix-ui/themes";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return <Button color="red">Delete issue</Button>;
}
