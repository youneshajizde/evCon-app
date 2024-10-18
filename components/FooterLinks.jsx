import Link from "next/link";
import React from "react";

function FooterLinks({ title, links }) {
  const myLinks = links.map((link, index) => (
    <li key={index}>
      <Link href={"/"}>{link}</Link>
    </li>
  ));
  return (
    <div>
      <h1 className="font-medium text-lg mb-4">{title}</h1>
      <ul className="space-y-2 text-gray-300 text-sm">{myLinks}</ul>
    </div>
  );
}

export default FooterLinks;
