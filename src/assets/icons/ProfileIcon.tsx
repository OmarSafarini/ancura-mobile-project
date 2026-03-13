import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ProfileIcon({ color, size }: { color: string; size: number }) {
    return (
        <Svg width={size} height={(size / 16) * 18} viewBox="0 0 16 18" fill="none">
            <Path
                d="M15.006 17.0783C15.006 14.535 11.7587 12.4732 7.75301 12.4732C3.74728 12.4732 0.5 14.535 0.5 17.0783M7.75301 9.71017C5.24943 9.71017 3.21988 7.64841 3.21988 5.10509C3.21988 2.56177 5.24943 0.5 7.75301 0.5C10.2566 0.5 12.2861 2.56177 12.2861 5.10509C12.2861 7.64841 10.2566 9.71017 7.75301 9.71017Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
