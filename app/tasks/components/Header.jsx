
import Link from "next/link";

//react component for the header with tailwind css and links to home and new task
export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link href="/" className="text-2xl font-bold">
        Task Manager
      </Link>
      <Link href="tasks/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          New Task
      </Link>
    </header>
  );
}