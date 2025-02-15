import { useEffect, RefObject } from "react";

function useClickOutside(
  contentRef: RefObject<HTMLElement>,
  triggerRef: RefObject<HTMLElement>, // New ref for the trigger
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const contentEl = contentRef.current;
      const triggerEl = triggerRef.current;

      // Ignore clicks inside the popover content
      if (!contentEl || contentEl.contains(event.target as Node)) {
        return;
      }

      // Ignore clicks on the popover trigger
      if (triggerEl && triggerEl.contains(event.target as Node)) {
        return;
      }

      // Otherwise, it's an outside click, call the handler
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [contentRef, triggerRef, handler]);
}

export default useClickOutside;
