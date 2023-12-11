import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="data:image/jpeg;base64,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"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="http://127.0.0.1:5173/Profile"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </a>

                  <a
                    href="http://127.0.0.1:5173"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>

                  <a
                    href="http://127.0.0.1:5173/logout"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </a>

                  <a
                    href="http://127.0.0.1:5173/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>

                  <a
                    href="http://127.0.0.1:5173/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="http://127.0.0.1:5173/Profile"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </a>

                <a
                  href="http://127.0.0.1:5173"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>

                <a
                  href="http://127.0.0.1:5173/logout"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </a>

                <a
                  href="http://127.0.0.1:5173/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login In
                </a>

                <a
                  href="http://127.0.0.1:5173/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign up
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      
     
    </div>
  );
}


export default Header;