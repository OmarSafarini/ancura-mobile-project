import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export const WebMockupWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isDesktop) {
    return <View style={styles.fullScreen}>{children}</View>;
  }

  return (
    <View style={styles.webContainer}>
      <style>{`
        * {
          font-family: 'FoundersGrotesk-Regular', system-ui, -apple-system, sans-serif;
        }
      `}</style>
      <div style={webStyles.background}>
        <div style={webStyles.phoneContainer}>
          <div style={webStyles.dynamicIsland}></div>
          <div style={webStyles.phoneScreen}>
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
              {children}
            </View>
          </div>
        </div>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
  },
});

const webStyles = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0f172a',
    backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)',
    overflow: 'hidden',
  },
  phoneContainer: {
    width: '390px',
    height: '844px',
    backgroundColor: '#000',
    borderRadius: '50px',
    padding: '8px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 3px #8e9399, inset 0 0 0 9px #000',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    transform: 'scale(0.9)',
  },
  dynamicIsland: {
    position: 'absolute' as const,
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '35px',
    backgroundColor: '#000',
    borderRadius: '24px',
    zIndex: 1000,
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '42px',
    overflow: 'hidden',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
};
