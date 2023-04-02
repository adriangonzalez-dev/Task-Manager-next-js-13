
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import Image from "next/image";

//react component for the header with tailwind css and links to home and new task
export default function Header() {
  const { user,userDispatch } = useAuth();
  const logout = () => {
    localStorage.removeItem('token');
    userDispatch({type:'LOGOUT'})
  }
  return (
    <header className="flex justify-between items-center p-2 bg-gray-900 text-white">
      <Link href="/" className="text-sm md:text-2xl font-bold">
        Task Manager
      </Link>
      <div className="flex gap-2 items-center justify-end">
        <Link
          href="tasks/new"
          className="bg-blue-500 hover:bg-blue-600 text-white p-1 md:p-2 rounded"
        >
          New Task
        </Link>
        {/* Dropdown */}
        <div class="flex justify-center">
          <div>
            <div className="relative" data-te-dropdown-ref>
              <button
                type="button"
                id="dropdownMenuButton1"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                {/* aca bva el avatar */}
                <div className="[word-wrap: break-word] my-[5px] flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] ">
                  <Image
                    className="my-0 mr-[8px] -ml-[12px] h-[inherit] w-[inherit] rounded-[100%]"
                    src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user?.avatar}`}
                    width={32}
                    height={32}
                    alt="Contact Person"
                  />
                  {user && user.name}
                </div>
              </button>
              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref
              >
                <li>
                  <button
                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100  active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400  "
                    data-te-dropdown-item-ref
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}