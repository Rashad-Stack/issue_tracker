"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <Skeleton width="13rem" />;

  if (isError) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId || "unassigned"}
        onValueChange={(userId) => {
          const assignee = () =>
            axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            });

          toast.promise(assignee(), {
            loading: "processing",
            success: "done.",
            error: "failed.",
          });
        }}
      >
        <Select.Trigger placeholder="Assignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
