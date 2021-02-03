import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className={
        "nav w-screen p-4 bg-blue-500 text-gray-100 shadow-md flex justify-between"
      }
    >
      <h1 className={"flex-"}><Link href={"/"}>Windows Setup Automation</Link></h1>
      <ul>
        <li>
          <Link href={"/add"}>Add Computer</Link>
        </li>
      </ul>
    </nav>
  );
}
