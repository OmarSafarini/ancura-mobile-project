// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import CaseCard from './src/components/common/CaseCard';
// export default function App() {
//   return (
//     <View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



import React from "react";
import PersonIcon from "src/assets/icons/PersonIcon"
import SelectUserType from "./src/components/common/SelectUserType";
import NormalButton from "./src/components/common/NormalButton";

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

