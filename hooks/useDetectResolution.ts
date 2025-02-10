"use client";
import { useEffect, useState } from "react";

export default function useDetectResolution() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Only access window when running in the browser
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Initialize width on component mount
      setWidth(window.innerWidth);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return width;
}
