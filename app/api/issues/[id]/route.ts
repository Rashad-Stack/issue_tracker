import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import statusCodes from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: statusCodes.UNAUTHORIZED,
      },
    );
  }
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: statusCodes.BAD_REQUEST,
    });
  }

  const { assignedToUserId, description, title } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid user" },
        {
          status: statusCodes.BAD_REQUEST,
        },
      );
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(
      { error: "Invalid issue" },
      {
        status: statusCodes.BAD_REQUEST,
      },
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: statusCodes.UNAUTHORIZED,
      },
    );
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(
      { error: "Invalid issue" },
      {
        status: statusCodes.NOT_FOUND,
      },
    );
  }

  await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
