import AppBackground from "@/components/base/AppBackground";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "@/utils/responsive";
import CaseCard from "@/components/common/CaseCard";
import { CaseData } from "@/types/ICaseData";
import { IDoctor } from "@/types/IDoctor";
import { useQuery } from "@tanstack/react-query";
import { getDoctorProfile } from "@/services/Doctor/DoctorService";
import { getAllCases } from "@/services/common_services/Case";
import { getUserMeta } from "@/services/tokenService";
import DoctorGreeting from "../components/DoctorGreeting";
import Loading from "@/components/common/Loading";
import FadeInView from "@/utils/FadeInView";
import { LinearGradient } from "expo-linear-gradient";

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
    refetchOnMount: true,
  });

  if (casesError || doctorError) {
    return <Text>Error loading cases</Text>;
  }

  const doctorCases = cases ? cases.filter((c) => c.status !== "Resolved") : [];

  return (
    <AppBackground variant="clean">
      <View style={styles.container}>
        <SafeAreaView style={styles.NavBar}>
          <View style={styles.ImgContainer}>
            <DoctorGreeting
              name={doctor?.full_name}
              image={doctor?.profilePic ? { uri: doctor.profilePic } : undefined} 
            />
          </View>
        </SafeAreaView>

        <View style={styles.listContainer}>
          <FlatList
            data={doctorCases}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: scale(12),
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FadeInView
                delay={index * 80}
                duration={450}
                translateYStart={15}
                style={{ width: scale(160) }}
              >
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
              </FadeInView>
            )}
            contentContainerStyle={{
              paddingBottom: scale(110),
              paddingTop: scale(10),
              paddingHorizontal: scale(2),
            }}
          />
          <LinearGradient
            colors={[
              "rgba(195, 227, 199, 0)",
              "rgba(195, 227, 199, 0.8)",
              "rgba(195, 227, 199, 1)",
            ]}
            style={styles.bottomBlur}
            pointerEvents="none"
          />
        </View>
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
  ImgContainer:{
    marginBottom:scale(10)
  },
  listContainer: {
    flex: 1,
    position: "relative",
  },
  bottomBlur: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(80),
  },
});
