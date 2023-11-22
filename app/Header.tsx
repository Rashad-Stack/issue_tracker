"use client";

import { Box, Container, Flex } from "@radix-ui/themes";
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
          <Flex>
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
                <Link
                  href="/api/auth/signout"
                  className="text-zinc-500 transition-colors hover:text-zinc-800"
                >
                  Sign out
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="text-zinc-500 transition-colors hover:text-zinc-800"
                >
                  Sign in
                </Link>
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
