"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBugAnt } from "react-icons/hi2";

export default function Header() {
  const currentPath = usePathname();

  return (
    <header className="mb-5 border-b">
      <nav className="mx-auto flex max-w-7xl justify-between p-5">
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
      </nav>
    </header>
  );
}

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];
