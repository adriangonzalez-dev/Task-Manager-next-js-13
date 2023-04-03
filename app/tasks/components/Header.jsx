
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import Image from "next/image";
import { useState } from "react";

//react component for the header with tailwind css and links to home and new task
export default function Header() {
  const { user,userDispatch } = useAuth();
  const [userDropdown, setUserDropdown] = useState(false);
  const logout = () => {
    localStorage.removeItem('token');
    userDispatch({type:'LOGOUT'})
  }

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  }

  return (

    <header aria-label="Page Header" className="bg-slate-900">
      <div className="mx-auto max-w-screen-xl px-2 py-4 sm:py-4 sm:px-2 lg:px-8">
        <div className="sm:flex sm:item-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl">
              Welcome {user?.name}!
            </h1>

            <p className="mt-1.5 text-sm text-gray-200">
              Let's write a new task! 🎉
            </p>
          </div>

          <div className=" flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link 
            href='/tasks/new' className="btn" type="button">
              Create Task
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-4 items-center sm:mt-0 sm:flex-row sm:items-end relative">
            <Image
              id="avatarButton"
              width={60}
              height={60}
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              className="w-14 h-14 cursor-pointer  p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={user?.avatar}
              alt="User dropdown"
              onClick={toggleUserDropdown}
            />

            {userDropdown && (
              <div
                id="userDropdown"
                className="z-10 absolute top-16 sm:top-20 sm:right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{`${user?.name} ${user?.lastName}`}</div>
                  <div className="font-medium truncate">{user?.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      href="/tasks"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <button
                    href="#"
                    className="px-4 py-2 text-sm text-gray-700
                  dark:text-gray-200  m-auto flex gap-2 items-center"
                  onClick={()=>logout()}>
                    Sign out
                    <i className="material-symbols-outlined">logout</i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


