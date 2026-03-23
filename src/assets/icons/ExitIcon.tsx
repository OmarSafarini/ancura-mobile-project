import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const ExitIcon = ({ color = '#FF0000', size = 40 }: { color?: string; size?: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M8.75 11.75L11.75 8.75M11.75 8.75L8.75 5.75M11.75 8.75H0.75M5.75 3.99859V3.9502C5.75 2.83009 5.75 2.26962 5.96799 1.8418C6.15973 1.46547 6.46547 1.15973 6.8418 0.967987C7.26962 0.75 7.83009 0.75 8.9502 0.75H13.5502C14.6703 0.75 15.2296 0.75 15.6574 0.967987C16.0337 1.15973 16.3405 1.46547 16.5322 1.8418C16.75 2.2692 16.75 2.82899 16.75 3.94691V13.5536C16.75 14.6715 16.75 15.2305 16.5322 15.6579C16.3405 16.0342 16.0337 16.3405 15.6574 16.5322C15.23 16.75 14.671 16.75 13.5531 16.75H8.94691C7.82899 16.75 7.2692 16.75 6.8418 16.5322C6.46547 16.3405 6.15973 16.0339 5.96799 15.6576C5.75 15.2298 5.75 14.6701 5.75 13.55V13.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default ExitIcon;
