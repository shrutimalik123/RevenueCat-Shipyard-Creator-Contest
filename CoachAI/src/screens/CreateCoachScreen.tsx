import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Coach } from '../types';
import { colors, spacing, typography, borderRadius } from '../theme';

interface CreateCoachScreenProps {
    onSave: (coach: Coach) => void;
    onCancel: () => void;
}

const CreateCoachScreen: React.FC<CreateCoachScreenProps> = ({ onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [personality, setPersonality] = useState('');
    const [avatar, setAvatar] = useState('🤖');

    const avatarOptions = ['🤖', '👨‍💼', '👩‍💼', '🧑‍🏫', '👨‍⚕️', '👩‍⚕️', '🧙', '🦸', '🎯', '💡'];

    const handleSave = () => {
        if (!name.trim() || !role.trim()) {
            Alert.alert('Missing Information', 'Please provide at least a name and role for your coach.');
            return;
        }

        const newCoach: Coach = {
            id: `custom-${Date.now()}`,
            name: name.trim(),
            role: role.trim(),
            specialty: specialty.trim() || 'General coaching',
            personality: personality.trim() || 'Supportive and helpful',
            avatar,
            isPremium: false,
            systemPrompt: `You are ${name}, a ${role}. ${specialty ? `You specialize in ${specialty}.` : ''} Your personality is ${personality || 'supportive and helpful'}. Provide practical, actionable advice.`,
            sampleQuestions: [
                'How can you help me?',
                'What is your approach?',
                'Can you give me some advice?',
            ],
        };

        onSave(newCoach);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Create Coach</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.label}>Avatar</Text>
                <View style={styles.avatarContainer}>
                    {avatarOptions.map((emoji) => (
                        <TouchableOpacity
                            key={emoji}
                            style={[styles.avatarOption, avatar === emoji && styles.avatarOptionSelected]}
                            onPress={() => setAvatar(emoji)}
                        >
                            <Text style={styles.avatarEmoji}>{emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Name *</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g., Startup Mentor"
                    placeholderTextColor={colors.textSecondary}
                />

                <Text style={styles.label}>Role *</Text>
                <TextInput
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                    placeholder="e.g., Entrepreneurship Coach"
                    placeholderTextColor={colors.textSecondary}
                />

                <Text style={styles.label}>Specialty</Text>
                <TextInput
                    style={styles.input}
                    value={specialty}
                    onChangeText={setSpecialty}
                    placeholder="e.g., Early-stage startups and fundraising"
                    placeholderTextColor={colors.textSecondary}
                />

                <Text style={styles.label}>Personality</Text>
                <TextInput
                    style={styles.input}
                    value={personality}
                    onChangeText={setPersonality}
                    placeholder="e.g., Direct, honest, and strategic"
                    placeholderTextColor={colors.textSecondary}
                />

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        💡 Your custom coach will use AI to provide personalized guidance based on the information you provide.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    cancelText: {
        ...typography.body,
        color: colors.textSecondary,
    },
    title: {
        ...typography.h3,
        color: colors.text,
    },
    saveText: {
        ...typography.body,
        color: colors.primary,
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.lg,
    },
    label: {
        ...typography.bodySmall,
        color: colors.text,
        fontWeight: '600',
        marginBottom: spacing.sm,
        marginTop: spacing.md,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        ...typography.body,
        color: colors.text,
    },
    avatarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: spacing.md,
    },
    avatarOption: {
        width: 56,
        height: 56,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    avatarOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '20',
    },
    avatarEmoji: {
        fontSize: 32,
    },
    infoBox: {
        backgroundColor: colors.primary + '10',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.lg,
    },
    infoText: {
        ...typography.bodySmall,
        color: colors.primary,
    },
});

export default CreateCoachScreen;
