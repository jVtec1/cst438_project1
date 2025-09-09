// app/changPassword.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

// Optional: uncomment if you want local mock persistence
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [currentErr, setCurrentErr] = useState("");
  const [newErr, setNewErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Small helper: quick client-side checks (no backend yet)
  const validate = async () => {
    let ok = true;

    // If you mock a saved password in AsyncStorage, you could check it here.
    // const saved = await AsyncStorage.getItem("user");
    // const savedUser = saved ? JSON.parse(saved) : null;
    // const savedPassword = savedUser?.password;

    if (!currentPassword.trim()) {
      setCurrentErr("Please enter your current password.");
      ok = false;
    } else {
      // If you mock persistence, enforce the real current password:
      // if (savedPassword && currentPassword !== savedPassword) {
      //   setCurrentErr("Current password is incorrect.");
      //   ok = false;
      // } else {
      setCurrentErr("");
      // }
    }

    if (newPassword.length < 6) {
      setNewErr("New password must be at least 6 characters.");
      ok = false;
    } else if (newPassword === currentPassword) {
      setNewErr("New password must be different from current password.");
      ok = false;
    } else {
      setNewErr("");
    }

    if (confirmNewPassword !== newPassword) {
      setConfirmErr("Passwords do not match.");
      ok = false;
    } else {
      setConfirmErr("");
    }

    return ok;
  };

  const handleChangePassword = async () => {
    setShowSuccess(false);
    if (!(await validate())) return;

    setLoading(true);
    try {
      // Simulate an API call for now
      await new Promise((r) => setTimeout(r, 1000));


      setShowSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (e) {
      Alert.alert("Error", "Something went wrong while changing password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
          Change Password
        </Text>

        {/* Current Password */}
        <View>
          <Text>Current Password</Text>
          <TextInput
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            returnKeyType="next"
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginTop: 6,
            }}
          />
          {!!currentErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{currentErr}</Text>
          )}
        </View>

        {/* New Password */}
        <View>
          <Text>New Password</Text>
          <TextInput
            placeholder="Create a new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            returnKeyType="next"
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginTop: 6,
            }}
          />
          {!!newErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{newErr}</Text>
          )}
        </View>

        {/* Confirm New Password */}
        <View>
          <Text>Confirm New Password</Text>
          <TextInput
            placeholder="Re-enter new password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleChangePassword}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              marginTop: 6,
            }}
          />
          {!!confirmErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{confirmErr}</Text>
          )}
        </View>

        <Button
          title={loading ? "Updating..." : "Update Password"}
          onPress={handleChangePassword}
          disabled={loading}
        />

        {showSuccess && (
          <View
            style={{
              backgroundColor: "#e7f6ec",
              borderColor: "#2ecc71",
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#2d7a46", textAlign: "center" }}>
              CONNECTBACKENDFORTHISTOWORKKKK
            </Text>
          </View>
        )}

        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 8,
            alignSelf: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text>Go Back</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}