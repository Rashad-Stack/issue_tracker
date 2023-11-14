import Link from "next/link";
import { HiOutlineBugAnt } from "react-icons/hi2";
export default function Header() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <header className="border-b mb-5">
      <nav className="flex justify-between p-5 max-w-7xl mx-auto">
        <Link href="/">
          <HiOutlineBugAnt />
        </Link>
        <ul className="flex space-x-6">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link
                href={href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
