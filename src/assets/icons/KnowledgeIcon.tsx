import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function KnowledgeIcon({ color, size }: { color: string; size: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
            <Path
                d="M10.8614 3.09036V16.0422M10.8614 3.09036L16.0422 0.5V13.4518L10.8614 16.0422M10.8614 3.09036L5.68072 0.5M10.8614 16.0422L5.68072 13.4518M5.68072 13.4518L0.5 16.0422V3.09036L5.68072 0.5M5.68072 13.4518V0.5"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
