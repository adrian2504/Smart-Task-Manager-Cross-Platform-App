    import React from 'react';
    import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
    import { NativeStackScreenProps } from '@react-navigation/native-stack';
    import { RootStackParamList } from '../navigation/RootNavigator';
    import { palette } from '../theme/colors';
    const { width } = Dimensions.get('window');
    export default function OnboardingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
    return (
        <View style={styles.container}>
        <Image source={require('../../assets/illustrations/blue_onboarding.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>A Task Manager You Can Trust!</Text>
        <Text style={styles.subtitle}>Plan, track and accomplish with a sleek glass interface.</Text>
        <Pressable style={styles.button} onPress={() => navigation.replace('Login')}><Text style={styles.btnText}>Get Started</Text></Pressable>
        </View>
    );
    }
    const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 60, backgroundColor: palette.white },
    image: { width: width * 0.8, height: width * 0.5, maxHeight: 300,  marginBottom: 24,  },
    title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginTop: 32 },
    subtitle: { textAlign: 'center', color: palette.gray[500], marginTop: 10, marginBottom: 40 },
    button: { backgroundColor: palette.blue[500], paddingVertical: 16, paddingHorizontal: 40, borderRadius: 14 },
    btnText: { color: palette.white, fontWeight: '600' }
    });