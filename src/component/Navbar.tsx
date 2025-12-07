"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "../lib/auth";
import { useWindowSize } from "../hooks/useWindowSize";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { width } = useWindowSize();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isMobile = width !== null && width <= 768;

  useEffect(() => {
    if (!isMobile && openMenu) setOpenMenu(false);
  }, [isMobile, openMenu]);

  const NavLink = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => (
    <Link
      href={href}
      onClick={() => isMobile && setOpenMenu(false)}
      className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === href ? "border-b-2 border-gray-800" : ""
      }`}
    >
      {label}
    </Link>
  );

  const AuthLinks = () =>
    session ? (
      <>
        <NavLink href="/jobs/post" label="Post a Job" />
        <NavLink href="/dashboard" label="Dashboard" />
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </>
    ) : (
      <NavLink href="/auth/signin" label="Sign In" />
    );

  // Estado de carga inicial
  if (width === null) {
    return (
   <nav className="h-16 bg-white shadow-sm" />
    );
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/globe.svg"
              alt="Job Board Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="text-xl font-semibold text-gray-900">
              Job Board
            </span>
          </Link>

          {/* Desktop Menu */}
{/* Menú de escritorio */}
<div className="hidden md:flex items-center space-x-4">
  <NavLink href="/jobs" label="Browse Jobs" />
  <AuthLinks />
</div>

{/* Botón menú móvil */}
<button
  onClick={() => setOpenMenu(!openMenu)}
  aria-label="Toggle menu"
  className="block md:hidden p-2 rounded-md hover:bg-gray-100"
>
  <Image
    alt="menu"
    src="/menu.svg"
    width={24}
    height={24}
    className="transition-transform"
  />
</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && openMenu && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md z-10">
          <div className="flex flex-col p-4 space-y-3">
            <NavLink href="/jobs" label="Browse Jobs" />
            <AuthLinks />
          </div>
        </div>
      )}
    </nav>
  );
};
