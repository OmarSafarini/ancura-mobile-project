import React, { useState } from 'react';
import BottomNavBar, { TabItem } from '../../../components/layout/BottomNavBar';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ActivityLogIcon from '../../../assets/icons/ActivityLogIcon';
import NotificationsIcon from '../../../assets/icons/NotificationsIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import FabAddIcon from '../../../assets/icons/FabAddIcon';

const TABS: TabItem[] = [
    { name: 'HomeTab',          label: 'Dashboard',    icon: HomeIcon          },
    { name: 'ActivityTab',      label: 'Activity Log', icon: ActivityLogIcon   },
    { name: 'NotificationsTab', label: 'Notifications',icon: NotificationsIcon },
    { name: 'ProfileTab',       label: 'Profile',      icon: ProfileIcon       },
];

export default function DoctorBNB(props: any) {
    // If navigation props are provided (used as a custom tab bar)
    if (props.state && props.navigation) {
        const activeRoute = props.state.routes[props.state.index];
        const currentTab = activeRoute.name;

        const handleTabPress = (tabName: string) => {
            const isFocused = props.state.routes[props.state.index].name === tabName;
            const event = props.navigation.emit({
                type: 'tabPress',
                target: props.state.routes.find((r: any) => r.name === tabName)?.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                props.navigation.navigate(tabName);
            }
        };

        return (
            <BottomNavBar
                tabs={TABS}
                activeTab={currentTab}
                onTabPress={handleTabPress}
                showFab={false}
                fabIcon={FabAddIcon}
            />
        );
    }

    // Fallback for standalone usage (no navigation props)
    const [activeTab, setActiveTab] = useState('HomeTab');

    return (
        <BottomNavBar
            tabs={TABS}
            activeTab={activeTab}
            onTabPress={setActiveTab}
            showFab={false}
            fabIcon={FabAddIcon}
        />
    );
}
