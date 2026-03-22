import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
export default function App() {
    return (
        <>
        <SelectUserType title="I need help" userType="(Patient)" Icon={PersonIcon}></SelectUserType>
        <NormalButton title="Continue" bgColor="#6D7EB5" textColor="#FFFFFF"></NormalButton>
        <NormalButton title="Generate Random ID" bgColor="#DBE6ED" textColor="#000000"></NormalButton>
        <NormalButton></NormalButton>
    </>

    );
}

