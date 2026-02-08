import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: 'Your AI Coaching Team',
            subtitle: 'Always in your pocket',
            description: 'Get personalized guidance from expert AI coaches whenever you need it.',
            emoji: '🎯',
        },
        {
            title: 'Browse & Chat',
            subtitle: 'Find your perfect coach',
            description: 'Choose from productivity, career, health, creativity, and finance coaches.',
            emoji: '💬',
        },
        {
            title: 'Personalize & Grow',
            subtitle: 'Make it yours',
            description: 'Add your context, values, and goals for truly personalized coaching.',
            emoji: '✨',
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const step = steps[currentStep];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{step.emoji}</Text>
                <Text style={styles.title}>{step.title}</Text>
                <Text style={styles.subtitle}>{step.subtitle}</Text>
                <Text style={styles.description}>{step.description}</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {steps.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentStep && styles.dotActive,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    emoji: {
        fontSize: 80,
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.h3,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxl,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.border,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: colors.primary,
        width: 24,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    buttonText: {
        ...typography.h3,
        color: '#FFFFFF',
    },
});

export default OnboardingScreen;
