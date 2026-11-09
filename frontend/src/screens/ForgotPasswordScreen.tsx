import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Missing information', 'Please enter your email address.');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());

      if (error) {
        Alert.alert('Request Failed', error.message);
        return;
      }

      Alert.alert(
        'Check your email',
        'If an account exists for this email, you will receive a password reset link.',
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Background decorations */}
            <View style={styles.topBlob} />
            <View style={styles.bottomBlob} />

            {/* Header */}
            <View style={styles.header}>
              <Pressable
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>‹</Text>
              </Pressable>

              <Text style={styles.logo}>morrow.</Text>
            </View>

            {/* Main content */}
            <View style={styles.content}>
              <View style={styles.iconArea}>
                <Text style={styles.mailIcon}>✉</Text>
              </View>

              <Text style={styles.title}>Forgot password?</Text>

              <Text style={styles.subtitle}>
                Don't worry. It happens to everyone. Enter your email address
                and we'll send you a link to reset your password.
              </Text>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email address</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#A3AAA2"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Reset button */}
              <Pressable
                style={({ pressed }) => [
                  styles.resetButton,
                  pressed && styles.pressed,
                  loading && styles.disabledButton,
                ]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.resetButtonText}>Send Reset Link</Text>
                )}
              </Pressable>

              {/* Back to login */}
              <Pressable
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginText}>Back to Log In</Text>
              </Pressable>

              <Text style={styles.footerText}>
                Your money. Your people. Your future.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F1',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    height: 70,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF2E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 34,
    lineHeight: 38,
    marginTop: -4,
    color: '#234D3C',
  },
  logo: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -1.2,
    color: '#234D3C',
  },

  // Main content
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 65,
    paddingBottom: 35,
  },
  iconArea: {
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: '#EAF2E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  mailIcon: {
    fontSize: 36,
    color: '#47785C',
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
    color: '#234D3C',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: '#858D86',
    marginTop: 12,
    marginBottom: 38,
    lineHeight: 24,
  },

  // Input
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#234D3C',
    marginBottom: 9,
  },
  input: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EBDD',
    paddingHorizontal: 17,
    fontSize: 15,
    color: '#234D3C',
  },

  // Reset button
  resetButton: {
    height: 62,
    borderRadius: 35,
    backgroundColor: '#234D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.65,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  // Back to login
  loginButton: {
    marginTop: 18,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#EAF2E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#234D3C',
  },

  // Footer
  footerText: {
    marginTop: 40,
    fontSize: 12,
    color: '#9A9E96',
    textAlign: 'center',
  },
});
