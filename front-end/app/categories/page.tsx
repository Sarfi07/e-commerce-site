"use client";
import { useActivePage } from "@/context/ActivePageContext";
import { useEffect } from "react";

export default function About() {
  const { setActivePage } = useActivePage();

  useEffect(() => {
    setActivePage("categories");
  }, [setActivePage]);
  return <>Categories</>;
}
