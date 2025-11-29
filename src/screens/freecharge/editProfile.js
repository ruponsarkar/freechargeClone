import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function EditProfile({navigation}) {
  const [firstName, setFirstName] = useState("Mujaddid");
  const [lastName, setLastName] = useState("Md Akbar");
  const [mobile, setMobile] = useState("6000892709");
  const [email, setEmail] = useState("chief.akbar01@gmail.com");
  const [pin, setPin] = useState("782445");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView
        style={{ paddingHorizontal: 18 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --------- HEADER --------- */}
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('FreechargeProfile')}>
          <Icon name="chevron-back" size={26} color="#000" />
          <Text style={styles.headerTitle}>Update Personal Details</Text>
        </TouchableOpacity>

        {/* --------- AVATAR --------- */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>MA</Text>
          </View>

          {/* camera badge */}
          <TouchableOpacity style={styles.cameraBadge}>
            <Icon name="camera-outline" size={18} color="#FF5A36" />
          </TouchableOpacity>
        </View>

        {/* --------- FIRST NAME --------- */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.smallAction}>ADD MIDDLE NAME</Text>
        </View>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* --------- LAST NAME --------- */}
        <Text style={styles.label}>Last Name (Optional)</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        {/* --------- MOBILE NUMBER --------- */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.smallAction}>CHANGE</Text>
        </View>

        <TextInput
          style={styles.input}
          value={mobile}
          editable={false}
        />

        {/* --------- EMAIL --------- */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.smallAction}>UPDATE</Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Verified Row */}
        <View style={styles.verifiedRow}>
          <Text style={styles.verifiedText}>Verified</Text>
          <Icon name="checkmark" size={16} color="#007BFF" />
        </View>

        {/* --------- PIN CODE --------- */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>Pin Code (Optional)</Text>
          <Icon
            name="information-circle-outline"
            size={16}
            color="#666"
            style={{ marginLeft: 4 }}
          />
        </View>

        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
        />

        <Text style={styles.stateInfo}>
          Your State as per entered pin code is{" "}
          <Text style={{ fontWeight: "700" }}>ASSAM</Text>
        </Text>

        {/* --------- SAVE BUTTON --------- */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* -----------------------------------
                 STYLES
------------------------------------ */

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    backgroundColor: "#FF7A4D",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 4,
    elevation: 2,
  },

  label: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  smallAction: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5A36",
  },

  input: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  verifiedText: {
    color: "#007BFF",
    fontSize: 13,
    marginRight: 4,
  },

  stateInfo: {
    marginTop: 8,
    fontSize: 13,
    color: "#333",
  },

  saveBtn: {
    backgroundColor: "#FF7A4D",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 26,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
