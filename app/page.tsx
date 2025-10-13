"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/spark-a1");
    }
  }, [pathname, router]);

  return null;
};

export default Page;
