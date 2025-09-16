import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

export default function DeleteAccountScreen() {
    
  const db = useSQLiteContext();
  const router = useRouter();
  const { userId: userIdParam } = useLocalSearchParams<{ userId?: string }>();

  // If you store the logged-in user in context, you can pull it here instead:
  // const { user } = useAuth();
  // const userId = user?.id;

  const userId = userIdParam ? Number(userIdParam) : undefined;

  const [username, setUsername] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [confirmText, setConfirmText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        if (!userId || Number.isNaN(userId)) {
          setError("Missing user id.");
          setLoading(false);
          return;
        }

        // Ensure foreign key enforcement for this connection
        await db.execAsync("PRAGMA foreign_keys = ON;");

        const row = await db.getFirstAsync<{
          id: number;
          username: string;
          email: string;
        }>("SELECT id, username, email FROM users WHERE id = ?;", [userId]);

        if (!row) {
          setError("User not found.");
        } else {
          setUsername(row.username);
          setMaskedEmail(maskEmail(row.email));
        }
      } catch (e: any) {
        setError(e?.message ?? "Failed to load user.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [db, userId]);

  const maskEmail = (email: string) => {
    // simple mask: j***@example.com
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;
    const visible = name.slice(0, 1);
    return `${visible}${"*".repeat(Math.max(name.length - 1, 1))}@${domain}`;
    // You can customize the masking strategy as you like
  };

  const verifyPassword = async (): Promise<boolean> => {
    // compare plaintext; in real apps, store a salted hash instead
    if (userId === undefined) return false;
    const row = await db.getFirstAsync<{ password: string }>(
      "SELECT password FROM users WHERE id = ?;",
      [userId]
    );
    if (!row) return false;
    return row.password === password;
  };

  const handleDelete = async () => {
    setError("");

    if (!userId || Number.isNaN(userId)) {
      setError("Missing user id.");
      return;
    }

    if (confirmText.trim().toUpperCase() !== "DELETE") {
      setError('Please type "DELETE" in the box to confirm.');
      return;
    }

    if (password.length < 1) {
      setError("Please enter your password to confirm.");
      return;
    }

    setSubmitting(true);
    try {
      const ok = await verifyPassword();
      if (!ok) {
        setError("Incorrect password.");
        setSubmitting(false);
        return;
      }

      // Do it with an explicit transaction
      await db.withTransactionAsync(async () => {
        await db.execAsync("PRAGMA foreign_keys = ON;"); // re-assert inside tx
        await db.runAsync("DELETE FROM users WHERE id = ?;", [userId]);
      });

      // (Optional) clear any in-memory auth/session here

      Alert.alert(
        "Account deleted",
        "Your profile and related data have been removed.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/"); // back to login
            },
          },
        ]
      );
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete account.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading account…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20, gap: 16, justifyContent: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>Delete Account</Text>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            padding: 14,
            backgroundColor: "#fff5f5",
            borderColor: "#ffdddd",
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>Danger zone</Text>
          <Text style={{ lineHeight: 20 }}>
            This action is permanent and cannot be undone. Your account
            <Text style={{ fontWeight: "700" }}> @{username}</Text> (
            {maskedEmail}) and any associated data will be deleted.
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: "600" }}>Type DELETE to confirm</Text>
          <TextInput
            placeholder='Type "DELETE"'
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 6,
            }}
          />
        </View>

        <View>
          <Text style={{ fontWeight: "600" }}>Enter your password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 6,
            }}
          />
        </View>

        {!!error && <Text style={{ color: "red" }}>{error}</Text>}

        <Button
          title={submitting ? "Deleting…" : "Delete my account"}
          color={Platform.OS === "ios" ? undefined : "#b00020"}
          onPress={handleDelete}
          disabled={submitting}
        />
      </View>
    </KeyboardAvoidingView>

    
  );

}
