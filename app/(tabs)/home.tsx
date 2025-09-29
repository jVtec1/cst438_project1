import React, { useRef, useEffect } from "react";
import { Text, Image, StyleSheet, Animated } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // 1 second fade-in
        useNativeDriver: true,
      }).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>
        Welcome to Monte's Auto Dealership!
      </Text>

      <Image
        source={require("../../assets/images/lilguy.png")}
        style={styles.image}
      />

      <Text style={styles.subText}>
        The only place you will find the best deals!
      </Text>

      <Text style={styles.sponsorText}>
        Proudly Sponsored by Auto.Dev. The all-in-one place for your API dealership needs.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#005EB8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    color: "gold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  subText: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
    color: "gold",
    textAlign: "center",
    marginBottom: 10,
  },
  sponsorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "gold",
    textAlign: "center",
  },
});
