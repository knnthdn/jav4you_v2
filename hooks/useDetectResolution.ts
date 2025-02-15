"use client";
import { useState, useLayoutEffect } from "react";

export default function useDetectResolution() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Ensure width is correct after hydration
    setWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
