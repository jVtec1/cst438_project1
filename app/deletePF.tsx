import React from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function deleteFP() {
  const router = useRouter();

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
          gap: 20,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "700" }}>Delete Profile</Text>

        <Text style={{ textAlign: "center" }}>
          Press the button below to delete your profile. This action is irreversible.
        </Text>

        <Pressable
          onPress={() => alert("Profile deleted (placeholder)")}
          style={{
            width: "100%",
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: "#2196f3",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Delete Profile</Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center" }}>Cancel</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
