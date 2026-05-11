import AppBackground from "@/components/base/AppBackground";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CaseCard from "@/components/common/CaseCard";
import { CaseData } from "@/types/ICaseData";
import { IDoctor } from "@/types/IDoctor";
import { useQuery } from "@tanstack/react-query";
import { getDoctorProfile } from "@/services/Doctor/DoctorService";
import { getAllCases } from "@/services/common_services/Case";
import { getUserMeta } from "@/services/tokenService";
import DoctorGreeting from "../components/DoctorGreeting";
import Loading from "@/components/common/Loading";

export default function DoctorHomeScreen({ navigation }: any) {


const insets = useSafeAreaInsets();

const {
  data: doctor,
   isLoading: doctorLoading,
    isError: doctorError,
  } = useQuery<IDoctor>({
    queryKey: ["doctor"],
    queryFn: async () => {
      const meta = await getUserMeta();
      return getDoctorProfile(meta!.id);
    },
  });

  const {
    data: cases,
    isLoading: casesLoading,
    isError: casesError,
  } = useQuery<CaseData[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  });

  if (doctorLoading || casesLoading) {
    return (
        <Loading/>
    );
  }

  if (casesError || doctorError) {
    return <Text>Error loading cases</Text>;
  }

  const doctorCases = cases.filter((c) => c.status !== "Resolved");

  return (
    <AppBackground variant="clean">
      <View style={styles.container}>
       <View style={{ marginBottom: scale(5) }}>
            <DoctorGreeting
              name={doctor?.full_name}
              image={doctor?.profilePic}
            />
        </View>

        <FlatList
          data={doctorCases}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: scale(12),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CaseCard
              data={{ ...item, status: undefined } as any}
              onPress={() =>
                navigation.navigate("CaseDetailsAndRepliesScreen", {
                  caseId: item.id,
                  caseData: item,
                  role: "doctor",
                })
              }
            />
          )}
          contentContainerStyle={{
             paddingBottom: scale(90),
    paddingTop: scale(10),
    paddingHorizontal: scale(16),
          }}
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(3),
  },
  img: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(50),
  },
  container: {
    flex: 1,
      paddingHorizontal: scale(16),
  },
});

