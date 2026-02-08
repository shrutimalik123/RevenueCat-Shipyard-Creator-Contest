import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Coach, Message } from '../types';
import { sendChatMessage } from '../services/openai';
import { colors, spacing, typography, borderRadius } from '../theme';

interface ChatScreenProps {
    coach: Coach;
    isPremium: boolean;
    messageCount: number;
    onMessageSent: () => void;
    onUpgradePress: () => void;
}

const FREE_MESSAGE_LIMIT = 10;

const ChatScreen: React.FC<ChatScreenProps> = ({
    coach,
    isPremium,
    messageCount,
    onMessageSent,
    onUpgradePress,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const canSendMessage = isPremium || messageCount < FREE_MESSAGE_LIMIT;

    const handleSend = async () => {
        if (!inputText.trim() || !canSendMessage || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            coachId: coach.id,
            role: 'user',
            content: inputText.trim(),
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);
        onMessageSent();

        try {
            const response = await sendChatMessage({
                systemPrompt: coach.systemPrompt,
                messages: [...messages, userMessage],
            });

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                coachId: coach.id,
                role: 'assistant',
                content: response,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                coachId: coach.id,
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.role === 'user';
        return (
            <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
                <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
                    {item.content}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
        >
            <View style={styles.header}>
                <Text style={styles.coachAvatar}>{coach.avatar}</Text>
                <View style={styles.headerText}>
                    <Text style={styles.coachName}>{coach.name}</Text>
                    <Text style={styles.coachRole}>{coach.role}</Text>
                </View>
            </View>

            {messages.length === 0 && (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>Start a conversation</Text>
                    <Text style={styles.emptySubtitle}>Try asking:</Text>
                    {coach.sampleQuestions.map((question, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionButton}
                            onPress={() => setInputText(question)}
                        >
                            <Text style={styles.suggestionText}>{question}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={styles.loadingText}>Thinking...</Text>
                </View>
            )}

            {!canSendMessage && (
                <TouchableOpacity style={styles.limitBanner} onPress={onUpgradePress}>
                    <Text style={styles.limitText}>
                        Daily message limit reached. Upgrade to Premium for unlimited messages! 🚀
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder={canSendMessage ? "Type your message..." : "Upgrade for unlimited messages"}
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    editable={canSendMessage && !isLoading}
                />
                <TouchableOpacity
                    style={[styles.sendButton, (!canSendMessage || !inputText.trim() || isLoading) && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!canSendMessage || !inputText.trim() || isLoading}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surface,
    },
    coachAvatar: {
        fontSize: 40,
        marginRight: spacing.md,
    },
    headerText: {
        flex: 1,
    },
    coachName: {
        ...typography.h3,
        color: colors.text,
    },
    coachRole: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    emptyState: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    emptyTitle: {
        ...typography.h2,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    suggestionButton: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
    },
    suggestionText: {
        ...typography.bodySmall,
        color: colors.primary,
        textAlign: 'center',
    },
    messageList: {
        padding: spacing.lg,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
    },
    assistantBubble: {
        alignSelf: 'flex-start',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    messageText: {
        ...typography.body,
    },
    userText: {
        color: '#FFFFFF',
    },
    assistantText: {
        color: colors.text,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        paddingLeft: spacing.lg,
    },
    loadingText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    limitBanner: {
        backgroundColor: colors.warning,
        padding: spacing.md,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.sm,
        borderRadius: borderRadius.md,
    },
    limitText: {
        ...typography.bodySmall,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
    },
    input: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.sm,
        ...typography.body,
        color: colors.text,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: colors.border,
    },
    sendButtonText: {
        ...typography.body,
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default ChatScreen;
