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

export default function DeleteProfileScreen() {
  const db = useSQLiteContext();   // SQLite DB
  const router = useRouter(); 

  const [username, setUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmText, setConfirmText] = useState<string>("");
  const [usernameErr, setUsernameErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [confirmErr, setConfirmErr] = useState<string>("");

  // Loading indicator flag
  const [loading, setLoading] = useState(false);

  /**
   * validate()
   * Runs basic checks before any DB queries:
   *  - Username length must be ≥ 2
   *  - Password length must be ≥ 3
   *  - Confirm box must contain "DELETE"
   */
  const validate = () => {
    let ok = true;

    if (username.trim().length < 2) {
      setUsernameErr("Username must be at least 2 characters.");
      ok = false;
    } else setUsernameErr("");

    if (currentPassword.length < 3) {
      setPasswordErr("Password must be at least 3 characters.");
      ok = false;
    } else setPasswordErr("");

    if (confirmText.trim().toUpperCase() !== "DELETE") {
      setConfirmErr('Type "DELETE" to confirm.');
      ok = false;
    } else setConfirmErr("");

    return ok;
  };

  /**
   * handleDeleteProfile()
   * Orchestrates the deletion flow:
   *  1. Validates inputs
   *  2. Verifies the username/password combination exists
   *  3. Deletes the user row inside a transaction
   *  4. Shows an Alert, then navigates back to login
   */
  const handleDeleteProfile = async () => {
    if (!validate()) return;  // stop early if validation fails

    setLoading(true);
    try {
      // Enable FK cascades 
      await db.execAsync("PRAGMA foreign_keys = ON;");

      // confirm that username/password is valid
      const user = await db.getFirstAsync<{ id: number; username: string }>(
        `SELECT id, username FROM users WHERE username = ? AND password = ?;`,
        [username.trim(), currentPassword]
      );

      if (!user) {
        setPasswordErr("Username or password is incorrect.");
        return;
      }

      // delete this user inside a transaction
      await db.withTransactionAsync(async () => {
        await db.execAsync("PRAGMA foreign_keys = ON;");
        await db.runAsync(`DELETE FROM users WHERE id = ?;`, [user.id]);
      });

      // success message then redirect
      Alert.alert("Deleted", "Your account has been permanently removed.", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (e) {
      console.error("Delete failed", e);
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
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Delete Profile</Text>

        {/* Warning box */}
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#fff5f5",
            borderColor: "#ffdddd",
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Danger zone</Text>
          <Text>
            This action is permanent and cannot be undone. Deleting your profile
            will remove your account and any related data.
          </Text>
        </View>

        {/* Username input + error */}
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

        {/* Password input + error */}
        <View style={{ width: "100%" }}>
          <Text>Password</Text>
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
          {!!passwordErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{passwordErr}</Text>
          )}
        </View>

        {/* Confirm DELETE input + error */}
        <View style={{ width: "100%" }}>
          <Text>Type DELETE to confirm</Text>
          <TextInput
            placeholder='Type "DELETE"'
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
            style={{
              borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
            }}
          />
          {!!confirmErr && (
            <Text style={{ color: "red", marginTop: 4 }}>{confirmErr}</Text>
          )}
        </View>

        {/* Action button or spinner */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Delete my account" onPress={handleDeleteProfile} />
        )}

        <Button title="Back to Login" onPress={() => router.replace("/")} />
      </View>
    </KeyboardAvoidingView>
  );
}
