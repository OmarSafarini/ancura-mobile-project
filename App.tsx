import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CaseCard from './src/components/common/CaseCard';
export default function App() {
  return (
    <View>
       <CaseCard
      data={{
        id: 1,
        patient_id: 22,
        title: "Severe headache for 3 days",
        description: "Pain in the left side of the head",
        created_at: "2h ago",
        file: "",
        status: 'Doctor Replied',
        isEmergency: true,
      }}
    />
     {/* <CaseCard
      data={{
        id: 1,
        patient_id: 22,
        title: "Severe headache for 3 days",
        description: "Pain in the left side of the head",
        created_at: "2h ago",
        file: "",
        status: 'Resolved',
        isEmergency: true,
      }}
    />
     <CaseCard
      data={{
        id: 1,
        patient_id: 22,
        title: "Severe headache for 3 days",
        description: "Pain in the left side of the head",
        created_at: "2h ago",
        file: "",
        status: 'Under Review',
        isEmergency: true,
      }}
    /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

