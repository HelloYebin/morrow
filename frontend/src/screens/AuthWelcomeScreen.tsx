import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthWelcome'>;

export default function AuthWelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Background decorations */}
        <View style={styles.topBlob} />
        <View style={styles.bottomBlob} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>morrow.</Text>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <View style={styles.walletArea}>
            <View style={styles.walletShadow} />

            <View style={styles.wallet}>
              <View style={styles.walletTop} />
              <View style={styles.walletFlap}>
                <View style={styles.walletButton} />
              </View>
            </View>

            <Text style={styles.sparkle}>✦</Text>
          </View>

          <Text style={styles.title}>Your money,{'\n'}your tomorrow.</Text>

          <Text style={styles.subtitle}>
            Manage your personal and shared finances in one simple space.
          </Text>

          {/* Create Account button */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.createText}>Create Account</Text>
          </Pressable>

          {/* Login button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Already have an account? Log in
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            Your money. Your people. Your future.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F1',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F1',
    overflow: 'hidden',
  },

  // Background
  topBlob: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 160,
    backgroundColor: '#EDF4E7',
    top: -190,
    left: -130,
  },
  bottomBlob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 160,
    backgroundColor: '#EEF4E7',
    bottom: -220,
    right: -140,
  },

  // Header
  header: {
    height: 65,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -1.5,
    color: '#234D3C',
  },

  // Main content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 35,
  },
  walletArea: {
    width: 190,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
  },
  walletShadow: {
    position: 'absolute',
    width: 180,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#F0EEDD',
    bottom: 18,
  },
  wallet: {
    width: 145,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#8DB69A',
    transform: [{ rotate: '-5deg' }],
    justifyContent: 'center',
    shadowColor: '#234D3C',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  walletTop: {
    position: 'absolute',
    top: 8,
    left: 15,
    width: 115,
    height: 20,
    borderRadius: 15,
    backgroundColor: '#47785C',
  },
  walletFlap: {
    position: 'absolute',
    right: -5,
    top: 40,
    width: 75,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#6F9D7E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletButton: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#F9F9F1',
  },
  sparkle: {
    position: 'absolute',
    right: 4,
    top: 10,
    fontSize: 27,
    color: '#8DB69A',
  },

  title: {
    fontSize: 36,
    lineHeight: 45,
    fontWeight: '800',
    color: '#234D3C',
    textAlign: 'center',
    letterSpacing: -1.2,
  },
  subtitle: {
    fontSize: 15,
    color: '#858D86',
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 23,
  },

  // Create Account button
  createButton: {
    marginTop: 50,
    width: '100%',
    maxWidth: 310,
    height: 65,
    borderRadius: 45,
    backgroundColor: '#234D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Login button
  loginButton: {
    marginTop: 12,
    width: '100%',
    maxWidth: 310,
    height: 55,
    borderRadius: 45,
    backgroundColor: '#EAF2E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#234D3C',
  },

  footerText: {
    marginTop: 30,
    fontSize: 13,
    color: '#9A9E96',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});
