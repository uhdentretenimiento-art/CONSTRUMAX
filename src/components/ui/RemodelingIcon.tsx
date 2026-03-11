import * as React from "react";

type RemodelingIconProps = React.SVGProps<SVGSVGElement>;

export default function RemodelingIcon(props: RemodelingIconProps) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        d="M26.1,3.9l-14,2.7c-2,0.4-2.7,2.8-1.3,4.2l10.5,10.5c1.4,1.4,3.8,0.6,4.2-1.3l2.7-14 C28.4,4.7,27.3,3.6,26.1,3.9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="13.7"
        y1="18.3"
        x2="16"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.3,27.7L4.3,27.7c-1.3-1.3-1.2-3.3,0.2-4.5l7.6-6.4l3.1,3.1l-6.4,7.6C7.7,28.8,5.6,28.9,4.3,27.7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}