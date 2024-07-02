import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <h1>404 | Not Found</h1>
      <p>페이지를 찾을 수 없어요 :/</p>
      <Link href="/"> {"< "}Go To Home</Link>
    </div>
  );
}
