import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PRE_BUILT_COACHES } from '../services/coaches';
import { Coach } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';

interface BrowseScreenProps {
    onSelectCoach: (coach: Coach) => void;
    isPremium: boolean;
}

const BrowseScreen: React.FC<BrowseScreenProps> = ({ onSelectCoach, isPremium }) => {
    const renderCoachCard = ({ item: coach }: { item: Coach }) => {
        const isLocked = coach.isPremium && !isPremium;

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => onSelectCoach(coach)}
                disabled={isLocked}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.avatar}>{coach.avatar}</Text>
                    {isLocked && (
                        <View style={styles.premiumBadge}>
                            <Text style={styles.premiumText}>🔒 Premium</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.coachName}>{coach.name}</Text>
                <Text style={styles.coachRole}>{coach.role}</Text>
                <Text style={styles.coachSpecialty}>{coach.specialty}</Text>

                <View style={styles.questionsContainer}>
                    <Text style={styles.questionsTitle}>Sample questions:</Text>
                    {coach.sampleQuestions.slice(0, 2).map((question, index) => (
                        <Text key={index} style={styles.question}>• {question}</Text>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Coaches</Text>
                <Text style={styles.subtitle}>Choose a coach to start chatting</Text>
            </View>

            <FlatList
                data={PRE_BUILT_COACHES}
                renderItem={renderCoachCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.textSecondary,
    },
    list: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    avatar: {
        fontSize: 48,
    },
    premiumBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    premiumText: {
        ...typography.caption,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    coachName: {
        ...typography.h2,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    coachRole: {
        ...typography.bodySmall,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    coachSpecialty: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    questionsContainer: {
        marginTop: spacing.sm,
    },
    questionsTitle: {
        ...typography.bodySmall,
        color: colors.text,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    question: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
});

export default BrowseScreen;
