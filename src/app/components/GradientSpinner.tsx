"use client";

import React from "react";

type Props = { size?: number; speed?: number; colorA?: string; colorB?: string };

export default function GradientSpinner({ size = 40, speed = 1, colorA = "red", colorB = "silver" }: Props) {
  const viewBoxSize = 50;
  const strokeWidth = 4;
  const r = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * 0.25; // visible arc length

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="gs-spinner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorA}>
            <animate attributeName="stop-color" values={`${colorA};${colorB};${colorA}`} dur={`${speed}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={colorB}>
            <animate attributeName="stop-color" values={`${colorB};${colorA};${colorB}`} dur={`${speed}s`} repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      <g>
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={r}
          fill="none"
          stroke="url(#gs-spinner)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${viewBoxSize / 2} ${viewBoxSize / 2}`}
            to={`360 ${viewBoxSize / 2} ${viewBoxSize / 2}`}
            dur={`${speed}s`}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
