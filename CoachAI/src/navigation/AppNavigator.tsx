import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Coach } from '../types';
import OnboardingScreen from '../screens/OnboardingScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ChatScreen from '../screens/ChatScreen';
import PaywallScreen from '../screens/PaywallScreen';

export type RootStackParamList = {
    Onboarding: undefined;
    Browse: undefined;
    Chat: { coach: Coach };
    Paywall: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
    hasCompletedOnboarding: boolean;
    isPremium: boolean;
    messageCount: number;
    onMessageSent: () => void;
    onUpgrade: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({
    hasCompletedOnboarding,
    isPremium,
    messageCount,
    onMessageSent,
    onUpgrade,
}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={hasCompletedOnboarding ? 'Browse' : 'Onboarding'}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Onboarding">
                    {(props) => (
                        <OnboardingScreen
                            {...props}
                            onComplete={() => props.navigation.navigate('Browse')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Browse">
                    {(props) => (
                        <BrowseScreen
                            {...props}
                            onSelectCoach={(coach) => props.navigation.navigate('Chat', { coach })}
                            isPremium={isPremium}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Chat">
                    {(props) => (
                        <ChatScreen
                            {...props}
                            coach={props.route.params.coach}
                            isPremium={isPremium}
                            messageCount={messageCount}
                            onMessageSent={onMessageSent}
                            onUpgradePress={() => props.navigation.navigate('Paywall')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Paywall"
                    options={{ presentation: 'modal' }}
                >
                    {(props) => (
                        <PaywallScreen
                            {...props}
                            onClose={() => props.navigation.goBack()}
                            onUpgrade={onUpgrade}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
