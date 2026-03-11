import * as React from "react";

type ExcavatorIconProps = React.SVGProps<SVGSVGElement>;

export default function ExcavatorIcon(props: ExcavatorIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      {...props}
    >
      <path d="M18,29H6c-1.6,0-3-1.3-3-3v0c0-1.6,1.3-3,3-3h12c1.6,0,3,1.3,3,3v0C21,27.7,19.7,29,18,29z" />
      <path d="M15,11h-4v5H8c-2.2,0-4,1.8-4,4v0h7h8v-2v-2L15,11z" />
      <line x1={7} y1={26} x2={7} y2={26} />
      <line x1={17} y1={26} x2={17} y2={26} />
      <line x1={12} y1={26} x2={12} y2={26} />
      <path d="M22,16l7-2l-0.5,2.6C28.2,18,27,19,25.6,19h0c-1,0-1.9-0.5-2.5-1.3L22,16z" />
      <polyline points="29,14 24,3 17,3 11,11 15,11 17,3" />
      <line x1={26} y1={14} x2={21} y2={3} />
      <line x1={22} y1={14} x2={22} y2={16} />
      <path d="M11,14h2.7l0,0c0.5,1.2,1.7,2,2.9,2H19" />
    </svg>
  );
}
