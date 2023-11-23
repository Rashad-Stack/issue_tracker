"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={currentPage === pageCount}
        color="gray"
        variant="soft"
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
