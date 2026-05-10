import AppBackground from "@/components/base/AppBackground";
import IconWrapper from "@/components/common/IconWrapper";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
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
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <View style={{ marginLeft: scale(5) }}>
            <DoctorGreeting
              name={doctor?.full_name}
              image={doctor?.profilePic}
            />
            {/* <Text style={styles.userName}>{doctor?.full_name}</Text> */}
          </View>
        </SafeAreaView>

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
    padding: scale(40),
    flex: 1,
  },
  greeting: {
    fontSize: scale(16),
    fontFamily: Family.FG_Regular,
    color: palette.darkGray,
  },
  userName: {
    fontSize: scale(18),
    fontFamily: Family.FG_Medium,
    fontWeight: "500",
    color: palette.dark,
  },
 
});
