import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import BottomNavBar, { TabItem } from '../../../components/layout/BottomNavBar';
import HomeIcon from '../../../assets/icons/HomeIcon';
import KnowledgeIcon from '../../../assets/icons/KnowledgeIcon';
import NotificationsIcon from '../../../assets/icons/NotificationsIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import FabAddIcon from '../../../assets/icons/FabAddIcon';

const TABS: TabItem[] = [
    { name: 'Home',          label: 'Home',          icon: HomeIcon          },
    { name: 'Knowledge',     label: 'Knowledge',     icon: KnowledgeIcon     },
    { name: 'Notifications', label: 'Notifications', icon: NotificationsIcon },
    { name: 'Profile',       label: 'Profile',       icon: ProfileIcon       },
];

export default function PatientBNB() {
    const [activeTab, setActiveTab] = useState('Home');

    // To-Do: Replace the (Alert) with (for example) navigation.navigate('CaseAdditionScreen') when screen is ready to use
    const handleFabPress = () => {
        Alert.alert('This screen is not ready yet');
    };

    return (
        <View style={{ flex: 1 }}>
            <BottomNavBar
                tabs={TABS}
                activeTab={activeTab}
                onTabPress={setActiveTab}
                showFab={true}
                fabIcon={FabAddIcon}
                onAddPress={handleFabPress}
            />
        </View>
    );
}

