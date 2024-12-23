"use client";

import { useEffect } from "react";
import { useActivePage } from "@/context/ActivePageContext";

export default function About() {
  const { setActivePage } = useActivePage();

  useEffect(() => {
    setActivePage("About");
  }, [setActivePage]);

  return <h1>About Page</h1>;
}
