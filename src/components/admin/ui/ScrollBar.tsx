"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollBarProps {
  targetId: string;        // id of the scrollable element
  height?: number;         // height of scrollbar (or width for horizontal)
  thumbHeight?: number;    // height of thumb (or width for horizontal)
  orientation?: 'vertical' | 'horizontal'; // scrollbar orientation
}

const CustomScrollBar: React.FC<ScrollBarProps> = ({
  targetId,
  height = 200,
  thumbHeight = 40,
  orientation = 'horizontal', // Default to horizontal for table
}) => {
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);

  // Find target on mount
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) {
      if (orientation === 'horizontal') {
        target.style.overflowX = "auto";
        target.style.overflowY = "hidden";
      } else {
        target.style.overflowY = "scroll";
      }
      target.style.scrollbarWidth = "none"; // hide firefox
      target.classList.add("hide-native-scroll");
      setScrollTarget(target);
    }
  }, [targetId, orientation]);

  // Sync thumb on target scroll
  useEffect(() => {
    if (!scrollTarget || !thumbRef.current || !barRef.current) return;

    const updateThumb = () => {
      if (orientation === 'horizontal') {
        const ratio =
          scrollTarget.scrollLeft /
          (scrollTarget.scrollWidth - scrollTarget.clientWidth);
        const maxThumbLeft = barRef.current!.clientWidth - thumbRef.current!.clientWidth;
        thumbRef.current!.style.left = ratio * maxThumbLeft + "px";
      } else {
        const ratio =
          scrollTarget.scrollTop /
          (scrollTarget.scrollHeight - scrollTarget.clientHeight);
        const maxThumbTop = barRef.current!.clientHeight - thumbRef.current!.clientHeight;
        thumbRef.current!.style.top = ratio * maxThumbTop + "px";
      }
    };

    scrollTarget.addEventListener("scroll", updateThumb);
    return () => {
      scrollTarget.removeEventListener("scroll", updateThumb);
    };
  }, [scrollTarget, orientation]);

  // Drag logic
  useEffect(() => {
    if (!scrollTarget || !thumbRef.current || !barRef.current) return;

    let isDragging = false;
    let startPos = 0;
    let startOffset = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      if (orientation === 'horizontal') {
        startPos = e.clientX;
        startOffset = parseInt(thumbRef.current!.style.left || "0", 10);
      } else {
        startPos = e.clientY;
        startOffset = parseInt(thumbRef.current!.style.top || "0", 10);
      }
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      if (orientation === 'horizontal') {
        const deltaX = e.clientX - startPos;
        let newLeft = startOffset + deltaX;

        const maxThumbLeft = barRef.current!.clientWidth - thumbRef.current!.clientWidth;
        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxThumbLeft) newLeft = maxThumbLeft;

        thumbRef.current!.style.left = newLeft + "px";

        // sync scroll
        const ratio = newLeft / maxThumbLeft;
        scrollTarget.scrollLeft = ratio * (scrollTarget.scrollWidth - scrollTarget.clientWidth);
      } else {
        const deltaY = e.clientY - startPos;
        let newTop = startOffset + deltaY;

        const maxThumbTop = barRef.current!.clientHeight - thumbRef.current!.clientHeight;
        if (newTop < 0) newTop = 0;
        if (newTop > maxThumbTop) newTop = maxThumbTop;

        thumbRef.current!.style.top = newTop + "px";

        // sync scroll
        const ratio = newTop / maxThumbTop;
        scrollTarget.scrollTop = ratio * (scrollTarget.scrollHeight - scrollTarget.clientHeight);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    thumbRef.current.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      thumbRef.current?.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [scrollTarget, orientation]);

  return (
    <div
      className="mx-auto my-4"
      ref={barRef}
      style={{
        position: "relative",
        width: orientation === 'horizontal' ? "80%" : "10px",
        height: orientation === 'horizontal' ? "10px" : `${height}px`,
        background: "#e5e7eb",
        borderRadius: "6px",
      
     
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: orientation === 'horizontal' ? `50%` : "100%",
          height: orientation === 'horizontal' ? "100%" : `50%`,
          background: "#9ca3af",
          borderRadius: "6px",
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "grab",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#6b7280";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#9ca3af";
        }}
      />
    </div>
  );
};

export default CustomScrollBar;
