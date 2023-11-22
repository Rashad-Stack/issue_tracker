"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBugAnt } from "react-icons/hi2";

export default function Header() {
  return (
    <header className="mb-5 border-b">
      <nav className="p-5">
        <Container>
          <Flex align="center" justify="between">
            <Flex align="center" gap="3">
              <Link href="/">
                <HiOutlineBugAnt className="text-xl" />
              </Link>
              <NavLinks />
            </Flex>
            <AuthAccess />
          </Flex>
        </Container>
      </nav>
    </header>
  );
}

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues/list", label: "Issues" },
];

function NavLinks() {
  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {links.map(({ href, label }) => (
        <li key={`${href}${label}`}>
          <Link
            href={href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": currentPath === href,
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const AuthAccess = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Sign in</Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.name}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout" className="nav-link">
              Sign out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
