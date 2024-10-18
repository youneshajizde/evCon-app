"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slack, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import avatar from "@/public/assets/toyAvatar.jpg";
import { useUser } from "@/lib/userContext";
import logo from "@/public/assets/logooo.png";
function Navbar() {
  const { user } = useUser();
  const [logged, setLogged] = useState(null); // null indicates loading
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      setLogged(false);
    } else if (user) {
      setLogged(true);
    }
  }, [user]); // Ensure this runs when `user` state changes

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-between px-6 z-50">
      {/* Logo */}
      <h1 className="font-medium flex items-center gap-0">
        <Image src={logo} width={40} height={40} />
      </h1>

      {/* Burger Menu for Small Devices */}
      <div className="md:hidden">
        {menuOpen ? (
          <X className="cursor-pointer" onClick={toggleMenu} />
        ) : (
          <Menu className="cursor-pointer" onClick={toggleMenu} />
        )}
      </div>

      {/* Nav Links & Profile (Hidden on Small Devices) */}
      <ul className="hidden md:flex text-sm font-medium items-center gap-6 md:gap-12 lg:gap-12 --font-dm-sans">
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/contact">
          <li>Contact</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
      </ul>

      {/* Profile Image or Sign-Up Button (Hidden on Small Devices) */}
      <div className="hidden md:block">
        {logged === null ? (
          // Placeholder when still loading
          <div className="animate-pulse w-20 h-10 bg-gray-200 rounded-lg"></div>
        ) : logged ? (
          <Link href={`/dashboard/user/${user.id}`}>
            <Image
              src={avatar}
              width={40}
              height={40}
              className="rounded-full"
              alt="avatar"
              style={{ objectFit: "cover" }}
            />
          </Link>
        ) : (
          <Link
            href={"/sign-up"}
            className="log-btn hover:bg-blue-900 py-2 px-3 text-sm"
          >
            Sign up
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 font-medium">
            <Link href="/">
              <li onClick={toggleMenu}>Home</li>
            </Link>
            <Link href="/contact">
              <li onClick={toggleMenu}>Contact</li>
            </Link>
            <Link href="/about">
              <li onClick={toggleMenu}>About</li>
            </Link>
            {logged && (
              <Link href="/create-event">
                <li onClick={toggleMenu}>Create event</li>
              </Link>
            )}
            {logged === null ? (
              <div className="animate-pulse w-20 h-10 bg-gray-200 rounded-lg"></div>
            ) : logged ? (
              <Link href={`/dashboard/user/${user.id}`} onClick={toggleMenu}>
                Profile
              </Link>
            ) : (
              <Link
                href={"/sign-up"}
                className="log-btn hover:bg-blue-900 text-sm py-2 px-3"
                onClick={toggleMenu}
              >
                Sign up
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
