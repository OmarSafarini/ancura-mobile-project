import React, { useState } from 'react';
import { View } from 'react-native';
import BottomNavBar, { TabItem } from '../../../components/layout/BottomNavBar';
import HomeIcon from '../../../assets/icons/HomeIcon';
import ActivityLogIcon from '../../../assets/icons/ActivityLogIcon';
import NotificationsIcon from '../../../assets/icons/NotificationsIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import FabAddIcon from '../../../assets/icons/FabAddIcon';

const TABS: TabItem[] = [
    { name: 'Dashboard',     label: 'Dashboard',    icon: HomeIcon          },
    { name: 'ActivityLog',   label: 'Activity Log', icon: ActivityLogIcon   },
    { name: 'Notifications', label: 'Notifications',icon: NotificationsIcon },
    { name: 'Profile',       label: 'Profile',      icon: ProfileIcon       },
];

export default function DoctorBNB() {
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <View style={{ flex: 1 }}>
            <BottomNavBar
                tabs={TABS}
                activeTab={activeTab}
                onTabPress={setActiveTab}
                showFab={true}
                fabIcon={FabAddIcon}
            />
        </View>
    );
}
