import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className={
        "nav w-screen p-4 bg-blue-500 text-gray-100 shadow-md flex justify-between"
      }
    >
      <h1 className={"p-2"}><Link href={"/"}>Windows Setup Automation</Link></h1>
      <ul>
        <li className="p-2 rounded hover:bg-blue-200 hover:text-black">
          <Link href={"/add"}>Neuer Computer</Link>
        </li>
      </ul>
    </nav>
  );
}
