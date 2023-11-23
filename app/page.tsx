import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueCarts from "./IssueCarts";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const openIssues = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const closedIssues = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  const inProgressIssues = await prisma.issue.count({
    where: {
      status: "INPROGRESS",
    },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
        <IssueCarts
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
