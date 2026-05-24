import type { SVGProps } from "react";

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".16" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 8v5h5" />
    </g>
  </svg>
);

export default ClockIcon;