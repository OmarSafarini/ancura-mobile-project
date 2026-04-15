import AppBackground from "@/components/base/AppBackground";
import IconWrapper from "@/components/common/IconWrapper";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
import LogoutButton from "@/components/common/LogoutButton";
import ArrowLeftIcon from "./../../../assets/icons/ArrowLeftIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useQuery } from "@tanstack/react-query";
import { getPatintProfile } from "@/services/Patient/PatinetService";
import AnimatedLogoScreen from "@/components/base/AnimatedLogoScreen";
import * as Clipboard from "expo-clipboard";
export default function PaitentSettings() {

import { signOut } from "../../../services/authService";

export default function PaitentSettings({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const id = "11111111-1111-1111-1111-111111111111";
  const CopyId = async (copiedId: string) => {
    await Clipboard.setStringAsync(copiedId);
    showMessage({
      message: "Copied successfully",
      type: "success",
      duration: 3000,
      floating: true,
    });
  };

  const {
    data: patient,
    isLoading: patientLoading,
    isError: patientError,
  } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatintProfile(id),
  });

  if (patientLoading) {
    return (
      <View style={styles.overlay}>
        <AnimatedLogoScreen size={scale(432)} />
      </View>
    );
  }

  if (patientError) {
    return <Text>Error loading cases</Text>;
  }

  const goBack = () => {
    navigation.goBack();
  }

  const LogOut = async () => {
    await signOut();
  }

  return (
    <AppBackground variant="logo">
      <View style={styles.container}>
        <View>
          <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
            <Text style={styles.Text}>Profile & Settings</Text>
            <IconWrapper
              size={scale(33)}
              bgColor={palette.white}
              shape="square"
            >
              <ArrowLeftIcon
                size={scale(18)}
                color={palette.dark}
                onPress={goBack}
              />
            </IconWrapper>
          </SafeAreaView>
          <View style={styles.Card}>
            <Text style={[styles.CardHeader, styles.CardText]}>
              Your Anonymous ID
            </Text>
            <Text style={[styles.CardSubtitle, styles.CardText]}>
              {patient?.id}
            </Text>

            <View style={styles.icon}>
              <IconWrapper shape="circle" bgColor={palette.white} size={33}>
                <CopyIcon
                  size={16}
                  color={palette.black}
                  onPress={() => CopyId(patient?.id ?? "")}
                />
              </IconWrapper>
            </View>
          </View>
        </View>

        <SafeAreaView
          style={[styles.BottomBar, { paddingBottom: insets.bottom }]}
        >
          <FlashMessage position="bottom" style={{ marginBottom: scale(40) }} />
          <LogoutButton onPress={LogOut} />
        </SafeAreaView>
      </View>
    </AppBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: scale(40),
    justifyContent: "space-between",
    flex: 1,
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(10),
  },
  Text: {
    fontFamily: Family.FG_Medium,
    fontWeight: "500",
    fontSize: scale(24),
  },
  Card: {
    borderRadius: scale(11),
    padding: scale(25),
    backgroundColor: "#ffffff4b",
    gap: scale(5),
    marginTop: scale(30),
  },
  CardHeader: {
    color: colors.primary,
  },
  CardSubtitle: {
    color: palette.dark,
    fontWeight: "bold",
  },
  CardText: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(20),
  },
  icon: {
    alignItems: "flex-end",
  },
  BottomBar: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
