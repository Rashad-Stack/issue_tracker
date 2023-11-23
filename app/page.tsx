import prisma from "@/prisma/client";
import IssueCarts from "./IssueCarts";

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
    <IssueCarts
      open={openIssues}
      closed={closedIssues}
      inProgress={inProgressIssues}
    />
  );
}
