import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <header className="bg-black shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Right Section with Login/Register and Mobile Menu */}
        <div className="flex items-center gap-6">
          {/* Login and Register Links */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="px-5 py-2.5 text-sm font-medium text-white bg-transparent transition hover:bg-gray-700 rounded-md">
              <LoginLink postLoginRedirectURL="/dashboard">Login</LoginLink>
            </div>

            <div className="px-5 py-2.5 text-sm font-medium text-black bg-white transition hover:bg-gray-200 rounded-md">
              <RegisterLink>Register</RegisterLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:bg-gray-200 md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
