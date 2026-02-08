import Purchases, { PurchasesOffering, CustomerInfo } from 'react-native-purchases';

// RevenueCat API key
const REVENUECAT_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || '';

export const initializeRevenueCat = async () => {
    if (!REVENUECAT_API_KEY) {
        console.warn('RevenueCat API key not set');
        return;
    }

    try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });
        console.log('RevenueCat initialized successfully');
    } catch (error) {
        console.error('RevenueCat initialization error:', error);
    }
};

export const getOfferings = async (): Promise<PurchasesOffering | null> => {
    try {
        const offerings = await Purchases.getOfferings();
        return offerings.current;
    } catch (error) {
        console.error('Error fetching offerings:', error);
        return null;
    }
};

export const purchasePackage = async (packageToPurchase: any): Promise<boolean> => {
    try {
        const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
        return customerInfo.entitlements.active['premium'] !== undefined;
    } catch (error: any) {
        if (!error.userCancelled) {
            console.error('Purchase error:', error);
        }
        return false;
    }
};

export const restorePurchases = async (): Promise<boolean> => {
    try {
        const customerInfo = await Purchases.restorePurchases();
        return customerInfo.entitlements.active['premium'] !== undefined;
    } catch (error) {
        console.error('Restore purchases error:', error);
        return false;
    }
};

export const checkPremiumStatus = async (): Promise<boolean> => {
    try {
        const customerInfo = await Purchases.getCustomerInfo();
        return customerInfo.entitlements.active['premium'] !== undefined;
    } catch (error) {
        console.error('Error checking premium status:', error);
        return false;
    }
};
