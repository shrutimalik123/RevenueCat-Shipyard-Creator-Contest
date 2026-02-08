import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';

interface PaywallScreenProps {
    onClose: () => void;
    onUpgrade: () => void;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ onClose, onUpgrade }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.emoji}>🚀</Text>
                <Text style={styles.title}>Upgrade to Premium</Text>
                <Text style={styles.subtitle}>Unlock your full coaching potential</Text>

                <View style={styles.featuresContainer}>
                    <FeatureItem
                        icon="💬"
                        title="Unlimited Messages"
                        description="Chat as much as you need, no daily limits"
                    />
                    <FeatureItem
                        icon="🎨"
                        title="Custom Coaches"
                        description="Create and save unlimited personalized coaches"
                    />
                    <FeatureItem
                        icon="⭐"
                        title="Premium Coaches"
                        description="Access to Creativity Catalyst and Finance Advisor"
                    />
                    <FeatureItem
                        icon="📚"
                        title="Full Chat History"
                        description="Never lose a conversation, searchable archive"
                    />
                    <FeatureItem
                        icon="⚡"
                        title="Priority AI"
                        description="Faster responses with GPT-4"
                    />
                </View>

                <View style={styles.pricingContainer}>
                    <TouchableOpacity style={styles.pricingCard} onPress={onUpgrade}>
                        <View style={styles.pricingHeader}>
                            <Text style={styles.pricingTitle}>Annual</Text>
                            <View style={styles.savingsBadge}>
                                <Text style={styles.savingsText}>Save 20%</Text>
                            </View>
                        </View>
                        <Text style={styles.price}>$79.99/year</Text>
                        <Text style={styles.priceDetail}>$6.67 per month</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.pricingCard, styles.pricingCardSecondary]} onPress={onUpgrade}>
                        <Text style={styles.pricingTitle}>Monthly</Text>
                        <Text style={styles.price}>$9.99/month</Text>
                        <Text style={styles.priceDetail}>Billed monthly</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.upgradeButton} onPress={onUpgrade}>
                    <Text style={styles.upgradeButtonText}>Start 7-Day Free Trial</Text>
                </TouchableOpacity>

                <Text style={styles.disclaimer}>
                    Cancel anytime. No commitment. {'\n'}
                    (Sandbox mode - purchase simulation only)
                </Text>
            </ScrollView>
        </View>
    );
};

const FeatureItem: React.FC<{ icon: string; title: string; description: string }> = ({
    icon,
    title,
    description,
}) => (
    <View style={styles.featureItem}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <View style={styles.featureText}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDescription}>{description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    closeButton: {
        position: 'absolute',
        top: spacing.xl,
        right: spacing.lg,
        zIndex: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 20,
        color: colors.textSecondary,
    },
    content: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 64,
        marginTop: spacing.xxl,
        marginBottom: spacing.md,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.xl,
    },
    featuresContainer: {
        width: '100%',
        marginBottom: spacing.xl,
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: spacing.md,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    featureDescription: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    pricingContainer: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    pricingCard: {
        backgroundColor: colors.primary,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
    },
    pricingCardSecondary: {
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    pricingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    pricingTitle: {
        ...typography.h3,
        color: '#FFFFFF',
    },
    savingsBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    savingsText: {
        ...typography.caption,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    price: {
        ...typography.h1,
        color: '#FFFFFF',
        marginBottom: spacing.xs,
    },
    priceDetail: {
        ...typography.bodySmall,
        color: '#FFFFFF',
        opacity: 0.8,
    },
    upgradeButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.md,
        width: '100%',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    upgradeButtonText: {
        ...typography.h3,
        color: '#FFFFFF',
    },
    disclaimer: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});

export default PaywallScreen;
