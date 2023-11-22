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
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="mb-5 border-b">
      <nav className="p-5">
        <Container>
          <Flex align="center" justify="between">
            <Flex align="center" gap="3">
              <Link href="/">
                <HiOutlineBugAnt className="text-xl" />
              </Link>
              <ul className="flex space-x-6">
                {links.map(({ href, label }) => (
                  <li key={`${href}${label}`}>
                    <Link
                      href={href}
                      className={classNames({
                        "text-zinc-900": currentPath === href,
                        "text-zinc-500": currentPath !== href,
                        "transition-colors hover:text-zinc-800": true,
                      })}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Flex>

            <Box>
              {status === "authenticated" ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="cursor-pointer">
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      referrerPolicy="no-referrer"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size="2">{session.user?.name}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Sign out</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              ) : (
                <Link href="/api/auth/signin">Sign in</Link>
              )}
            </Box>
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
