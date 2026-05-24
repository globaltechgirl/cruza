import type { SVGProps } from "react";

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    {...props}
  >
    <g className="check-outline">
      <g fill="none" fillRule="evenodd" clipRule="evenodd">
        <path fill="currentColor" d="M13.864 3.655a.5.5 0 0 1-.021.707l-7.93 7.474a.6.6 0 0 1-.839-.016L2.394 9.1a.5.5 0 0 1 .712-.702l2.406 2.442l7.645-7.206a.5.5 0 0 1 .707.021" />
      </g>
    </g>
  </svg>
);

export default CheckIcon;