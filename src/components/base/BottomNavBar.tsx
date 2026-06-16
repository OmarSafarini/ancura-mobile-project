import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors as colors } from '../../utils/colors';
import { Family } from '../../utils/typography';
import { scale } from '../../utils/responsive';

// ─── Constants ───────────────────────────────────────────────────────────────

const ACTIVE_COLOR   = colors.secondary;
const INACTIVE_COLOR = colors.primary;
const BAR_HEIGHT     = scale(67);
const FAB_SIZE       = scale(62);

// ─── Types ───────────────────────────────────────────────────────────────────

export type NavIconComponent = React.FC<{ color: string; size: number }>;

export interface TabItem {
    name: string;
    label: string;
    icon: NavIconComponent;
}

export interface BottomNavBarProps {
    tabs: TabItem[];
    activeTab: string;
    onTabPress: (name: string) => void;
    showFab?: boolean;
    fabIcon?: NavIconComponent;
    onAddPress?: () => void;
}

// ─── Internal NavItem ────────────────────────────────────────────────────────

interface NavItemProps {
    Icon: NavIconComponent;
    label: string;
    active: boolean;
    onPress: () => void;
}

function NavItem({ Icon, label, active, onPress }: NavItemProps) {
    const color = active ? ACTIVE_COLOR : INACTIVE_COLOR;
    return (
        <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.7}>
            <Icon color={color} size={scale(20)} />
            <Text style={[styles.navLabel, { color }]}>{label}</Text>
        </TouchableOpacity>
    );
}

// ─── BottomNavBar ────────────────────────────────────────────────────────────

export default function BottomNavBar({
    tabs,
    activeTab,
    onTabPress,
    showFab = false,
    fabIcon: FabIcon,
    onAddPress,
}: BottomNavBarProps) {
    const insets    = useSafeAreaInsets();
    const bottomPad = insets.bottom > 0 ? insets.bottom * 0.5 : scale(15);

    const midIndex  = Math.ceil(tabs.length / 2);
    const leftTabs  = showFab ? tabs.slice(0, midIndex) : tabs;
    const rightTabs = showFab ? tabs.slice(midIndex)    : [];
    const fabRise = (FAB_SIZE * 1.8) / 2;

    return (
        <View style={styles.wrapper}>
            {/* ── FAB (optional) ── */}
            {showFab && (
                <TouchableOpacity
                    style={[styles.fabTouchable, { top: -fabRise }]}
                    onPress={onAddPress}
                    activeOpacity={0.85}
                >
                    <View style={styles.fabDiamond}>
                        <View style={styles.fabIconWrapper}>
                            {FabIcon && <FabIcon color="#F1EDF8" size={scale(30)} />}
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {/* ── Bar ── */}
            <View style={[styles.bar, { paddingBottom: bottomPad, height: BAR_HEIGHT + bottomPad }]}>
                {leftTabs.map((tab) => (
                    <NavItem
                        key={tab.name}
                        Icon={tab.icon}
                        label={tab.label}
                        active={activeTab === tab.name}
                        onPress={() => onTabPress(tab.name)}
                    />
                ))}

                {/* Centre gap for the FAB */}
                {showFab && <View style={styles.fabSpacer} />}

                {rightTabs.map((tab) => (
                    <NavItem
                        key={tab.name}
                        Icon={tab.icon}
                        label={tab.label}
                        active={activeTab === tab.name}
                        onPress={() => onTabPress(tab.name)}
                    />
                ))}
            </View>
        </View>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        overflow: 'visible',
    },

    bar: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: scale(12),
        backgroundColor: colors.formBackground,
        borderTopLeftRadius: 32.5,
        borderTopRightRadius: 32.5,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.04)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },

    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(10),
        gap: 3,
    },

    navLabel: {
        fontFamily: Family.FG_Regular,
        fontSize: scale(11),
        letterSpacing: -0.165,
        textAlign: 'center',
    },

    fabSpacer: {
        flex: 1,
    },

    fabTouchable: {
        position: 'absolute',
        alignSelf: 'center',
        width: FAB_SIZE * 1.8,
        height: FAB_SIZE * 1.8,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },

    fabDiamond: {
        width: FAB_SIZE,
        height: FAB_SIZE,
        borderRadius: scale(9),
        backgroundColor: colors.secondary,
        transform: [{ rotate: '-45deg' }],
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#8EB392',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.76,
        shadowRadius: 6.4,
        elevation: 8,
    },

    fabIconWrapper: {
        transform: [{ rotate: '45deg' }],
        alignItems: 'center',
        justifyContent: 'center',
    },
});
