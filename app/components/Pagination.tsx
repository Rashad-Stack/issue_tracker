import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

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

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button disabled={currentPage === 1} color="gray" variant="soft">
        <DoubleArrowLeftIcon />
      </Button>

      <Button disabled={currentPage === 1} color="gray" variant="soft">
        <ChevronLeftIcon />
      </Button>
      <Button disabled={currentPage === pageCount} color="gray" variant="soft">
        <ChevronRightIcon />
      </Button>

      <Button disabled={currentPage === pageCount} color="gray" variant="soft">
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
