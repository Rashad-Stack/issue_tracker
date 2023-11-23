import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";

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
    <IssueSummery
      open={openIssues}
      closed={closedIssues}
      inProgress={inProgressIssues}
    />
  );
}
