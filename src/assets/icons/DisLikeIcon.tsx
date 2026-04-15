import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color: string;
  size: number;
  filled?: boolean;
};

export default function DisLikeIcon({
  color,
  size,
  filled = false,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M15.7505 10.6875H12.3755V3.375H15.7505C15.8997 3.375 16.0427 3.43426 16.1482 3.53975C16.2537 3.64524 16.313 3.78832 16.313 3.9375V10.125C16.313 10.2742 16.2537 10.4173 16.1482 10.5227C16.0427 10.6282 15.8997 10.6875 15.7505 10.6875V10.6875Z"
        {...(filled
          ? {
              fill: color,
            }
          : {
              stroke: color,
              strokeWidth: 1.2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })}
      />

      <Path
        d="M12.3755 10.6875L9.56299 16.3125C9.26751 16.3125 8.97493 16.2543 8.70195 16.1412C8.42897 16.0282 8.18093 15.8624 7.972 15.6535C7.76307 15.4446 7.59733 15.1965 7.48426 14.9235C7.37119 14.6506 7.31299 14.358 7.31299 14.0625V12.375H2.96237C2.80285 12.375 2.64516 12.3411 2.49975 12.2755C2.35434 12.2099 2.22455 12.1141 2.11898 11.9945C2.01341 11.8749 1.93448 11.7343 1.88743 11.5819C1.84037 11.4294 1.82627 11.2687 1.84606 11.1105L2.68981 4.36046C2.72382 4.08838 2.85603 3.83808 3.06159 3.65661C3.26715 3.47514 3.53192 3.375 3.80612 3.375H12.3755"
        {...(filled
          ? {
              fill: color,
            }
          : {
              stroke: color,
              strokeWidth: 1.2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })}
      />
    </Svg>
  );
}