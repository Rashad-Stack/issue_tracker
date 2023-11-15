import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
      <Skeleton height="2rem" width="6rem" className="mt-6" />
    </Box>
  );
}
