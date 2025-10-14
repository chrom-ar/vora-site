"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const IndexedProtocolsRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/spark-a1");
  }, [router]);

  return null;
};

export default IndexedProtocolsRedirect;
