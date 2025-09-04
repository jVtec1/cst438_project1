import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [usernameErr, setUsernameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>("");

    const validate = () => {
        let ok = true;

        // Username must be of length 2+
        if (username.trim().length < 2) {
            setUsernameErr("Username must be at least 2 characters.");
            ok = false;
        } else setUsernameErr("");

        // Email: simple regex check
        const emailRe = /^\S+@\S+\.\S+$/;
        if (!emailRe.test(email.trim())) {
            setEmailErr("Please enter a valid email.");
            ok = false;
        } else setEmailErr("");

        // Password: 6+ chars // we can change this later
        if (password.length < 6) {
            setPasswordErr("Password must be at least 6 characters.");
            ok = false;
        } else setPasswordErr("");

        // Confirm Password matches
        if (confirmPassword !== password) {
            setConfirmPasswordErr("Passwords do not match.");
            ok = false;
        } else setConfirmPasswordErr("");

        return ok;
    };

    const handleSignUp = async () => {
        if (!validate()) return;

        // TODO: Replace with your real sign-up call:
        // await api.post('/signup', { username, email, password });

        console.log("Signing up:", { username, email });

        // On success, maybe landing page or back to login:
        router.replace("/");
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
                    gap: 15,
                    paddingHorizontal: 20,
                }}
            >
                <Text style={{ fontSize: 25, fontWeight: "600" }}>Sign Up</Text>

                {/* Username */}
                <View style={{ width: "100%" }}>
                    <Text>Username</Text>
                    <TextInput
                        placeholder="Choose a username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 5,
                        }}
                    />
                    {!!usernameErr && (
                        <Text style={{ color: "red", marginTop: 4 }}>{usernameErr}</Text>
                    )}
                </View>

                {/* Email */}
                <View style={{ width: "100%" }}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 5,
                        }}
                    />
                    {!!emailErr && (
                        <Text style={{ color: "red", marginTop: 4 }}>{emailErr}</Text>
                    )}
                </View>

                {/* Password */}
                <View style={{ width: "100%" }}>
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        textContentType="password"
                        autoCapitalize="none"
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 5,
                        }}
                    />
                    {!!passwordErr && (
                        <Text style={{ color: "red", marginTop: 4 }}>{passwordErr}</Text>
                    )}
                </View>

                {/* Confirm Password */}
                <View style={{ width: "100%" }}>
                    <Text>Confirm Password</Text>
                    <TextInput
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        textContentType="password"
                        autoCapitalize="none"
                        style={{
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 5,
                        }}
                    />
                    {!!confirmPasswordErr && (
                        <Text style={{ color: "red", marginTop: 4 }}>
                            {confirmPasswordErr}
                        </Text>
                    )}
                </View>

                <Button title="Create Account" onPress={handleSignUp} />

                <Pressable
                    onPress={() => router.replace("/")}
                    style={{
                        marginTop: 15,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderWidth: 1,
                        borderColor: "#000000ff",
                        borderRadius: 8
                    }}
                >
                    <Text style={{ textAlign: "center"}}>
                        Already have an account? Click to to Login
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}
