import React from "react";
import Svg, { Path } from "react-native-svg";

export const XIcon = () => {

    return(
        <Svg
            fill="none"
            height={25}
            width={25}
            viewBox="0 0 24 24"
        >

            <Path
            d="M6 18L18 6M6 6l12 12"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            />

        </Svg>
    )
}
