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
  // Grab the SQLite DB handle from the nearest <SQLiteProvider />
  const db = useSQLiteContext();
  // Expo Router instance for navigation
  const router = useRouter();

  // Controlled inputs for username and passwords
  const [username, setUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  // Each input can show its own error message below the field
  const [usernameErr, setUsernameErr] = useState<string>("");
  const [currentErr, setCurrentErr] = useState<string>("");
  const [newErr, setNewErr] = useState<string>("");
  const [confirmErr, setConfirmErr] = useState<string>("");

  // Shows a spinner while DB work is in-flight, and disables the submit button
  const [loading, setLoading] = useState(false);

  // Simple synchronous validation before any DB calls
  const validate = () => {
    let ok = true;

    // Username: min length
    if (username.trim().length < 2) {
      setUsernameErr("Username must be at least 2 characters.");
      ok = false;
    } else setUsernameErr("");

    // Current password: min length
    if (currentPassword.length < 3) {
      setCurrentErr("Current password must be at least 3 characters.");
      ok = false;
    } else setCurrentErr("");

    // New password: min length + must differ from current
    if (newPassword.length < 6) {
      setNewErr("New password must be at least 6 characters.");
      ok = false;
    } else if (newPassword === currentPassword) {
      setNewErr("New password must be different from current password.");
      ok = false;
    } else setNewErr("");

    // Confirm must match new
    if (confirmNewPassword !== newPassword) {
      setConfirmErr("Passwords do not match.");
      ok = false;
    } else setConfirmErr("");

    return ok;
  };

  // Main handler for "Change Password"
  const handleChangePassword = async () => {
    // Stop if validation fails; field-level errors are already set
    if (!validate()) return;

    setLoading(true);
    try {
      // 1) Verify the user exists with the provided current credentials.
      // getFirstAsync returns the first matching row or undefined.
      const user = await db.getFirstAsync(
        `SELECT username FROM users WHERE username = ? AND password = ?`,
        username.trim(),        // trim to avoid trailing-space mismatches
        currentPassword
      );

      // If no match, show an inline error and abort
      if (!user) {
        setCurrentErr("Username or current password is incorrect.");
        return;
      }

      // 2) Update to the new password for that username
      await db.runAsync(
        `UPDATE users SET password = ? WHERE username = ?`,
        [newPassword, username.trim()]
      );

      // 3) Success: navigate back to the index (main/login) screen
      // Using replace so the user can't go "back" into this screen
      router.replace("/");
    } catch (e) {
      // Any unexpected DB or runtime error lands here
      console.error("Password change failed", e);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      // Always stop the spinner
      setLoading(false);
    }
  };

  return (
    // On iOS, pushing content up when the keyboard is open
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
        {/* Screen title */}
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Change Password</Text>

        {/* Username field + inline error */}
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

        {/* Current password field + inline error */}
        <View style={{ width: "100%" }}>
          <Text>Current Password</Text>
          <TextInput
            placeholder="Current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry          // hides characters
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

        {/* New password field + inline error */}
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

        {/* Confirm new password field + inline error */}
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

        {/* While saving, show spinner; otherwise show the action button */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Change Password" onPress={handleChangePassword} />
        )}

        {/* Manual back action as a fallback/escape to index */}
        <Button title="Back to Login" onPress={() => router.replace("/")} />
      </View>
    </KeyboardAvoidingView>
  );
}

