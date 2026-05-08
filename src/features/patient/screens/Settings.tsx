import AppBackground from "@/components/base/AppBackground";
import IconWrapper from "@/components/common/IconWrapper";
import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import { Colors as colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Family } from "@/utils/typography";
import LogoutButton from "@/components/common/LogoutButton";
import ArrowLeftIcon from "./../../../assets/icons/ArrowLeftIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as Clipboard from "expo-clipboard";
import { signOut } from "../../../services/authService";
import { getUserMeta } from "@/services/tokenService";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function PaitentSettings() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserMeta().then((meta) => {
      setEmail(meta?.email ?? null);
      setLoading(false);
    });
  }, []);

  const CopyId = async (copiedId: string) => {
    await Clipboard.setStringAsync(copiedId);
    showMessage({
      message: "Copied successfully",
      type: "success",
      duration: 3000,
      floating: true,
    });
  };

  const LogOut = async () => {
    await signOut();
  }

  if (loading) {
    return (
        <Loading/>
    );
  }

  return (
    <AppBackground variant="logo">
      <View style={styles.container}>
        <View>
          <SafeAreaView style={{ paddingTop: insets.top }}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile & Settings</Text>
              <View style={styles.iconWrapper}>
                <ArrowLeftIcon
                  color={colors.textDark2}
                  size={scale(18)}
                  onPress={() => navigation.navigate("PatientHomeTab" as never)}
                />
              </View>
            </View>
          </SafeAreaView>
          <View style={styles.Card}>
            <Text style={[styles.CardHeader, styles.CardText]}>
              Email
            </Text>
            <Text style={[styles.CardSubtitle, styles.CardText]}>
              {email}
            </Text>
            <View style={styles.icon}>
              <IconWrapper shape="circle" bgColor={palette.white} size={33}>
                <CopyIcon
                  size={16}
                  color={palette.black}
                  onPress={() => CopyId(email ?? "")}
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
    paddingHorizontal: scale(51),
    justifyContent: "space-between",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(56),
    marginTop: scale(10),
  },
  iconWrapper: {
    borderRadius: scale(6),
    backgroundColor: colors.formBackground,
    padding: scale(8),
  },
  title: {
    fontSize: scale(24),
    fontFamily: Family.FG_Medium,
    color: colors.textDark,
  },
  Card: {
    borderRadius: scale(11),
    padding: scale(25),
    backgroundColor: "#ffffff4b",
    gap: scale(5),
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