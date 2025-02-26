import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    Pressable,
    Image,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from "react-native-reanimated";
import globalStyles from "../styles/globalStyles";

export default function SplashScreen() {
    const router = useRouter();

    // Shared values for animations
    const titleOpacity = useSharedValue(0);
    const subtitleOpacity = useSharedValue(0);
    const buttonOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(50);
    const subtitleTranslateY = useSharedValue(50);
    const buttonTranslateY = useSharedValue(50);

    // Start animations when the component mounts
    useEffect(() => {
        titleOpacity.value = withTiming(1, {
            duration: 800,
            easing: Easing.out(Easing.exp),
        });
        titleTranslateY.value = withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.exp),
        });

        subtitleOpacity.value = withDelay(
            300,
            withTiming(1, { duration: 800 })
        );
        subtitleTranslateY.value = withDelay(
            300,
            withTiming(0, { duration: 800 })
        );

        buttonOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
        buttonTranslateY.value = withDelay(
            600,
            withTiming(0, { duration: 800 })
        );
    }, []);

    // Animated styles
    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const animatedSubtitleStyle = useAnimatedStyle(() => ({
        opacity: subtitleOpacity.value,
        transform: [{ translateY: subtitleTranslateY.value }],
    }));

    const animatedButtonStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value,
        transform: [{ translateY: buttonTranslateY.value }],
    }));

    // Navigate to the dashboard
    const goToDashboard = () => {
        router.push("/dashboard");
    };

    return (
        <>
            {/* Hide the status bar */}
            <StatusBar hidden={true} />

            <View style={styles.container}>
                {/* Background image */}
                <Image
                    source={require("../assets/images/background.png")}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />

                {/* Title and Quote */}
                <Animated.View
                    style={[styles.textContainer, animatedTitleStyle]}
                >
                    <Text style={[globalStyles.text, styles.title]}>
                        Kwoatle
                    </Text>
                </Animated.View>

                <Animated.View
                    style={[styles.textContainer, animatedSubtitleStyle]}
                >
                    <Text style={[globalStyles.text, styles.subtitle]}>
                        "Your daily dose of inspiration„
                    </Text>
                </Animated.View>

                {/* Start Button */}
                <Animated.View
                    style={[styles.startButton, animatedButtonStyle]}
                >
                    <Pressable onPress={goToDashboard}>
                        <Text style={[globalStyles.text, styles.buttonText]}>
                            Start
                        </Text>
                    </Pressable>
                </Animated.View>
            </View>
        </>
    );
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#07263B",
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    textContainer: {
        alignItems: "center",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 65,
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
    },
    startButton: {
        position: "absolute",
        width: "80%",
        bottom: 0,
        height: 70,
        backgroundColor: "#218690",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 90,
    },
    buttonText: {
        fontSize: 40,
        color: "#fff",
    },
});
