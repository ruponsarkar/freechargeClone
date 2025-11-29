import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function QRcode({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ----------- HEADER ----------- */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My QR</Text>

          <Image
            source={require('../../assets/icons/upi_small.png')}
            style={{ width: 55, height: 20 }}
            resizeMode="contain"
          />
        </View>

        {/* -------- USER INFORMATION -------- */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={styles.userCircle}>
            <Text style={styles.userInitials}>MM</Text>
          </View>

          <Text style={styles.userName}>Mujaddid Md Akbar</Text>
          <Text style={styles.userUpi}>6000892709@freecharge</Text>

          {/* Bank Dropdown */}
          <TouchableOpacity style={styles.bankBox}>
            <Image
              source={require("../../assets/icons/upi.png")}
              style={{ width: 18, height: 10, marginRight: 6 }}
            />
            <Text style={styles.bankText}>CANARA B…xxxx 3222</Text>
            <Icon name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>

          {/* QR Code */}
          <Image
            source={require('../../assets/icons/qr.png')}
            style={styles.qrImage}
          />

          <Text style={styles.scanText}>Scan this QR Code to pay me</Text>

          {/* Download & Share */}
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.roundBtn}>
              <MaterialCommunityIcons
                name="download-outline"
                size={22}
                color="#FF7443"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundBtn}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={22}
                color="#FF7443"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* --------- BOTTOM BUTTON --------- */}
      <TouchableOpacity style={styles.bottomBtn}>
        <Text style={styles.bottomBtnText}>Generate QR with Amount</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ----------- STYLES ----------- */

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    marginLeft: 10,
  },

  userCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFE1D5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  userInitials: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  userUpi: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },

  bankBox: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bankText: {
    fontSize: 13,
    marginRight: 4,
    color: "#222",
  },

  qrImage: {
    width: 240,
    height: 240,
    marginTop: 20,
  },

  scanText: {
    marginTop: 10,
    color: "#444",
    fontSize: 13,
  },

  iconRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  roundBtn: {
    width: 45,
    height: 45,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },

  bottomBtn: {
    backgroundColor: "#FF7A49",
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  bottomBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
});
