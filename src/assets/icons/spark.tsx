import type { SVGProps } from "react";

const SparkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" clipRule="evenodd">
      <path fill="currentColor" fillOpacity="0.16" fillRule="evenodd" d="m12.667 10.5l1.25-7.5L6 13h5l-1.25 7.5l7.917-10z" />
	    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="m12.667 10.5l1.25-7.5L6 13h5l-1.25 7.5l7.917-10z" />
    </g>
  </svg>
);

export default SparkIcon;