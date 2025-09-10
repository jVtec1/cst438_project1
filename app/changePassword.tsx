import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function ChangePasswordScreen() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [usernameErr, setUsernameErr] = useState<string>("");
  const [currentErr, setCurrentErr] = useState<string>("");
  const [newErr, setNewErr] = useState<string>("");
  const [confirmErr, setConfirmErr] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let ok = true;

    if (username.trim().length < 2) {
      setUsernameErr("Username must be at least 2 characters.");
      ok = false;
    } else setUsernameErr("");

    if (currentPassword.length < 3) {
      setCurrentErr("Current password must be at least 3 characters.");
      ok = false;
    } else setCurrentErr("");

    if (newPassword.length < 6) {
      setNewErr("New password must be at least 6 characters.");
      ok = false;
    } else if (newPassword === currentPassword) {
      setNewErr("New password must be different from current password.");
      ok = false;
    } else setNewErr("");

    if (confirmNewPassword !== newPassword) {
      setConfirmErr("Passwords do not match.");
      ok = false;
    } else setConfirmErr("");

    return ok;
  };

  const handleChangePassword = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      // 1) Verify the user & current password
      const user = await db.getFirstAsync(
        `SELECT username FROM users WHERE username = ? AND password = ?`,
        username.trim(),
        currentPassword
      );

      if (!user) {
        setCurrentErr("Username or current password is incorrect.");
        return;
      }

      // 2) Update to the new password
      await db.runAsync(
        `UPDATE users SET password = ? WHERE username = ?`,
        [newPassword, username.trim()]
      );

      // ✅ Immediately go back to index screen
      router.replace("/");
    } catch (e) {
      console.error("Password change failed", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
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
          alignItems: "center",
          gap: 14,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Change Password</Text>

        {/* Username */}
        <View style={{ width: "100%" }}>
          <Text>Username</Text>
          <TextInput
            placeholder="Your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={{
              borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
            }}
          />
          {!!usernameErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{usernameErr}</Text>
          )}
        </View>

        {/* Current Password */}
        <View style={{ width: "100%" }}>
          <Text>Current Password</Text>
          <TextInput
            placeholder="Current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            style={{
              borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
            }}
          />
          {!!currentErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{currentErr}</Text>
          )}
        </View>

        {/* New Password */}
        <View style={{ width: "100%" }}>
          <Text>New Password</Text>
          <TextInput
            placeholder="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            style={{
              borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
            }}
          />
          {!!newErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{newErr}</Text>
          )}
        </View>

        {/* Confirm New Password */}
        <View style={{ width: "100%" }}>
          <Text>Confirm New Password</Text>
          <TextInput
            placeholder="Re-enter new password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            style={{
              borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
            }}
          />
          {!!confirmErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{confirmErr}</Text>
          )}
        </View>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Change Password" onPress={handleChangePassword} />
        )}

        <Button title="Back to Login" onPress={() => router.replace("/")} />
      </View>
    </KeyboardAvoidingView>
  );
}
