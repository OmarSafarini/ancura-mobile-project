import { Colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type CaseStatus = "Under Review" | "Doctor Replied" | "Resolved";
type CaseData = {
  id: number;
  patient_id: number;
  title: string;
  description: string;
  created_at: string;
  file?: string;
  status: CaseStatus;
  isEmergency: boolean;
};
type Props = {
  data: CaseData;
};

const STATUS_CONFIG = {
  "Under Review": {
    containerColor: "rgba(232,112,0 , 0.24)",
    icon: "time-outline",
    iconBackground: Colors.underReview,
  },
  "Doctor Replied": {
    containerColor: "rgba(0, 0, 0, 0.13)",
    icon: "chatbubbles-outline",
    iconBackground: Colors.secondary,
  },
  "Resolved": {
    containerColor: Colors.secondaryLight,
    icon: "checkmark-outline",
    iconBackground: Colors.secondary,
  },
} as const;

export default function CaseCard({ data }: Props) {

  // const router = useRouter();
  const statusConfig = STATUS_CONFIG[data.status];

  return (
   <Pressable
    style={[
      styles.container,
      { backgroundColor: statusConfig.containerColor },
      data.isEmergency && {
        shadowColor: "rgba(255, 0, 0, 0.65)", 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8, // for the Android obicity
      }
    ]}
    // onPress={() => router.push(`/case/${data.id}`)}
  >
      
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={moderateScale(16)} />
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.time}>{data.created_at}</Text>
        <View style={styles.reviewContainer}>
          <View style={[styles.iconCircle, { backgroundColor: statusConfig.iconBackground }]}>
            <Ionicons name={statusConfig.icon} size={moderateScale(10)} color="white"/>
          </View>
          <Text style={[styles.reviewText,{ color: statusConfig.iconBackground },]}>
            {data.status}
          </Text>
        </View>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(140),
    height: verticalScale(120),
    borderRadius: scale(15),
    padding: scale(12),
    justifyContent: "space-between",
  },

  title: {
    fontSize: moderateScale(9),
    fontWeight: "700",
    color: Colors.textDark,
    maxWidth: "75%",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrowContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(2),
  },

  time: {
    fontSize: moderateScale(7),
    color: "rgba(0,0,0,0.36)",
  },

  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: scale(10),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    gap: scale(4),
  },

  reviewText: {
    fontSize: moderateScale(6),
  },

  iconCircle: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
});