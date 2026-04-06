import AppBackground from "@/components/layout/AppBackground";
import IconWrapper from "@/features/doctor/components/Icons/IconWrapper";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
import LogoutButton from "@/components/common/LogoutButton";
import ArrowLeftIcon from "./../../../assets/icons/ArrowLeftIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const id = "USR-XXXXX";
  const CopyId = () => {
    showMessage({
      message: "Copied successfully",
      type: "success",
      duration: 3000,
      floating: true,
    });
  };
  return (
    <AppBackground variant="logo">
      <View style={styles.container}>
        <View>
          <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
            <Text style={styles.Text}>Profile & Settings</Text>
          </SafeAreaView>
          <View style={styles.Card}>
            <Text style={[styles.CardHeader, styles.CardText]}>
              Your Anonymous ID
            </Text>
            <Text style={[styles.CardSubtitle, styles.CardText]}>{id}</Text>

            <View style={styles.icon}>
              <IconWrapper shape="circle" bgColor={palette.white} size={33}>
                <CopyIcon size={16} color={palette.black} onPress={CopyId} />
              </IconWrapper>
            </View>
          </View>
        </View>

        <SafeAreaView
          style={[styles.BottomBar, { paddingBottom: insets.bottom }]}
        >
          <FlashMessage position="bottom" style={{ marginBottom: scale(40) }} />
          <LogoutButton />
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
});
