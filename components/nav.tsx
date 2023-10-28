import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className={
        "nav w-screen p-4 bg-blue-500 text-gray-100 shadow-md flex justify-between"
      }
    >
      <h1>
        <Link href={"/"}>Windows Setup Automation</Link>
      </h1>
      <ul className="flex flex-row">
        <li>
          <Link href={"/add"}>
            <span className="p-2 rounded hover:bg-blue-200 hover:text-black">
              Neuer Computer
            </span>
          </Link>
        </li>
        <li>
          <Link href={"/import-csv"}>
            <span className="p-2 rounded hover:bg-blue-200 hover:text-black">
              Import
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
