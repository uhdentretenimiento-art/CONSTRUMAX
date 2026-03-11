import * as React from "react";

type HydromassageIconProps = React.SVGProps<SVGSVGElement>;

export default function HydromassageIcon(props: HydromassageIconProps) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M4 35l2.5 1.351c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0L44 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 41l2.5 1.351c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0c1.6-.864 3.4-.864 5 0c1.6.865 3.4.865 5 0L44 41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M25 29l-1-4M4 11l7 11l13 2.93h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="7" r="3" fill="currentColor" />
    </svg>
  );
}