import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function PaidTo({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Paid To Moksodul Islam Laskar</Text>

          <Text style={styles.helpText}>NEED HELP?</Text>

          <Icon
            name="ellipsis-vertical"
            size={20}
            color="#333"
            style={{ marginLeft: 10 }}
          />
        </View>

        {/* ---------- BENEFICIARY CARD ---------- */}
        <View style={styles.beneficiaryCard}>
          <View style={styles.beneficiaryLeft}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitials}>MI</Text>
            </View>

            <View style={{ marginLeft: 12 }}>
              <Text style={styles.toName}>To MOKSODUL ISLAM LASKAR</Text>
              <Text style={styles.email}>
                9101479776@naviaxis
              </Text>
              <Text style={styles.time}>Today, 12:41 PM</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amount}>₹500</Text>
            <View style={styles.successTag}>
              <Text style={styles.successText}>Success</Text>
            </View>
          </View>
        </View>

        {/* ---------- PAID FROM ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paid From</Text>
          <Text style={styles.sectionSubtitle}>Freecharge UPI</Text>
          <Text style={styles.sectionAmount}>₹500</Text>
        </View>

        <View style={styles.line} />

        {/* ---------- PAYMENT INFORMATION ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>

          {/* Bank */}
          <Text style={styles.infoLabel}>Bank Account</Text>
          <View style={styles.infoRow}>
            <Image
              source={require("../../assets/icons/upi.png")}
              style={{ width: 22, height: 12, marginRight: 6 }}
            />
            <Text style={styles.infoValue}>xxxx 3222</Text>
          </View>

          {/* UPI Transaction ID */}
          <View style={styles.copyRow}>
            <View>
              <Text style={styles.infoLabel}>UPI Transaction ID</Text>
              <Text style={styles.infoHighlight}>326069183305</Text>
            </View>
            <CopyButton />
          </View>

          {/* Comments */}
          <Text style={styles.infoLabel}>Comments</Text>
          <Text style={styles.infoValue}>UPI</Text>

          {/* FC Transaction ID */}
          <View style={styles.copyRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>FC Transaction ID</Text>
              <Text style={styles.infoHighlight}>
                AXIFRC4ABBF5B5A429CA5A295916890E797
              </Text>
            </View>
            <CopyButton />
          </View>
        </View>

        {/* ---------- TRANSACTION STATUS ---------- */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Transaction Status</Text>

          {statusRow("Payment Initiated", true)}
          {statusRow("Money Debited From Account", true)}
          {statusRow("Money Sent To Receivers Account", true)}
          {statusRow("Payment Completed", true)}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

/* ---------- REUSABLE COPY BUTTON ---------- */
const CopyButton = () => (
  <TouchableOpacity style={styles.copyBtn}>
    <MaterialCommunityIcons name="content-copy" size={18} color="#FF5A36" />
    <Text style={styles.copyText}>COPY</Text>
  </TouchableOpacity>
);

/* ---------- STATUS ROW ---------- */
const statusRow = (label, done) => (
  <View style={styles.statusRow}>
    <View style={styles.statusLeft}>
      <View style={[styles.statusDot, done && { backgroundColor: "#00C853" }]} />
      <View style={styles.statusLine} />
    </View>

    <Text style={styles.statusText}>{label}</Text>
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "700",
  },
  helpText: {
    color: "#FF5A36",
    fontWeight: "700",
    marginRight: 10,
  },

  /* BENEFICIARY CARD */
  beneficiaryCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  beneficiaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitials: {
    fontSize: 18,
    fontWeight: "700",
  },
  toName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  email: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  successTag: {
    backgroundColor: "#00C853",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  successText: {
    color: "#fff",
    fontSize: 12,
  },

  /* SECTIONS */
  section: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#444",
  },
  sectionAmount: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 18,
  },

  /* PAYMENT INFORMATION */
  infoLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 16,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  infoHighlight: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  copyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyText: {
    color: "#FF5A36",
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 12,
  },

  /* STATUS */
  statusSection: {
    paddingHorizontal: 18,
    paddingVertical: 25,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  statusLeft: {
    alignItems: "center",
    marginRight: 14,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ccc",
  },
  statusLine: {
    width: 2,
    height: 26,
    backgroundColor: "#ccc",
    marginTop: 2,
  },
  statusText: {
    fontSize: 14,
    color: "#111",
  },
});
