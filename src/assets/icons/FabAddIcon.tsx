import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function FabAddIcon({ color, size }: { color: string; size: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <Path
                d="M1.5 17.5602H17.5602M17.5602 17.5602H33.6205M17.5602 17.5602V33.6205M17.5602 17.5602V1.5"
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
