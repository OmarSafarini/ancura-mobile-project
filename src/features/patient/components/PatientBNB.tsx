import React, { useState } from 'react';
import BottomNavBar, { TabItem } from '../../../components/base/BottomNavBar';
import HomeIcon from '../../../assets/icons/HomeIcon';
import DocumentIcon from '../../../assets/icons/DoucmentIcon';
import NotificationsIcon from '../../../assets/icons/NotificationsIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import FabAddIcon from '../../../assets/icons/FabAddIcon';

const TABS: TabItem[] = [
    { name: 'PatientHomeTab', label: 'Dashboard', icon: HomeIcon },
    { name: 'PatientKnowledgeTab', label: 'Resources', icon: DocumentIcon },
    { name: 'PatientNotifyTab', label: 'Notifications', icon: NotificationsIcon },
    { name: 'PatientProfileTab', label: 'Settings', icon: ProfileIcon },
];

export default function PatientBNB(props: any) {
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

        const handleAddPress = () => {
            props.navigation.navigate('CreateCaseScreen');
        };

        if (
            currentTab === 'PatientProfileTab' ||
            currentTab === 'PatientNotifyTab' ||
            currentTab === 'PatientKnowledgeTab'
        ) {
            return null;
        }

        return (
            <BottomNavBar
                tabs={TABS}
                activeTab={currentTab}
                onTabPress={handleTabPress}
                showFab={true}
                fabIcon={FabAddIcon}
                onAddPress={handleAddPress}
            />
        );
    }

    const [activeTab, setActiveTab] = useState('PatientHomeTab');

    return (
        <BottomNavBar
            tabs={TABS}
            activeTab={activeTab}
            onTabPress={setActiveTab}
            showFab={true}
            fabIcon={FabAddIcon}
        />
    );
}
