import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "@/utils/responsive";
import { CaseData } from "@/types/CaseData";
import UnderViewIcon from "@/assets/icons/UnderViewIcon";
import DoctorRepliedIcon from "@/assets/icons/DoctorRepliedIcon";
import ResolvedIcon from "@/assets/icons/ResolvedIcon";

type Props = {
  data: CaseData;
};

const STATUS_CONFIG = {
  "Under Review": { 
    containerColor: "rgba(232,112,0 , 0.24)",
    IconComponent: UnderViewIcon, 
    iconBackground: Colors.underReview, 
  },
    "Doctor Replied": { 
    containerColor: "rgba(8, 7, 14 , 0.13)", 
    IconComponent: DoctorRepliedIcon, 
    iconBackground: Colors.secondary, 
  },
  "Resolved": { 
    containerColor: Colors.secondaryLight, 
    IconComponent: ResolvedIcon, 
    iconBackground: Colors.secondary, 
  },
  "Empty": { 
    containerColor: "rgba(8, 7, 14 , 0.13)", 
  }
};

export default function CaseCard({ data }: Props) {
  const status = data.status || "Empty";
  const config = STATUS_CONFIG[status];

  return (
    <Pressable style={[styles.container,{ backgroundColor: config.containerColor },data.isEmergency && styles.emergencyShadow,]}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={scale(16)} />
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.time}>{data.created_at}</Text>
        {status !== "Empty" && config.IconComponent && (
          <View style={styles.reviewContainer}>
            <View style={[styles.iconCircle, { backgroundColor: config.iconBackground }]}>
              <config.IconComponent width={scale(10)} height={scale(10)} />
            </View>
            <Text style={[styles.reviewText, { color: config.iconBackground }]}>{status}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: scale(130),
    borderRadius: scale(15),
    padding: scale(12),
    justifyContent: "space-between",
  },
  emergencyShadow: {
    shadowColor: "rgba(255,0,0,0.85)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: scale(13),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
    maxWidth: "75%",
  },
  arrowContainer: {
    backgroundColor: Colors.formBackground,
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(5),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: scale(8),
    fontFamily: Family.HV_Regular,
    color: "rgba(0,0,0,0.36)",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: scale(10),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    gap: scale(4),
  },
  reviewText: {
    paddingTop: scale(2),
    fontSize: scale(7),
    fontFamily: Family.FG_Regular,
  },
  iconCircle: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },
});