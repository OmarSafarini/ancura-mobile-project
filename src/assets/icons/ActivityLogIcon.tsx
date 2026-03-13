import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ActivityLogIcon({ color, size }: { color: string; size: number }) {
    return (
        <Svg width={size} height={(size / 20) * 17} viewBox="0 0 20 17" fill="none">
            <Path
                d="M10.3068 8.92224L7.4556 0.753343C7.33783 0.415552 6.85535 0.415552 6.73758 0.753343L3.99088 8.65201C3.9377 8.80401 3.79333 8.90535 3.63187 8.90535H0"
                stroke={color}
                strokeMiterlimit="10"
            />
            <Path
                d="M19.9999 7.15825H16.368C16.2066 7.15825 16.0622 7.25958 16.009 7.41159L13.2623 15.3103C13.1445 15.648 12.6621 15.648 12.5443 15.3103L9.69312 7.14136"
                stroke={color}
                strokeMiterlimit="10"
            />
        </Svg>
    );
}
