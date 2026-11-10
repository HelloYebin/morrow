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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Invalid password',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: 'morrow://auth/callback',
          data: {
            nickname: nickname.trim() || null,
          },
        },
      });

      if (error) {
        Alert.alert('Sign up failed', error.message);
        return;
      }

      if (!data.session) {
        Alert.alert(
          'Check your email',
          'We sent you a confirmation link. Please verify your email to continue.',
        );
      } else {
        Alert.alert('Welcome to morrow.', 'Your account has been created!');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
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

            {/* Back button */}
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
              <Text style={styles.title}>Create your account</Text>

              <Text style={styles.subtitle}>
                Start building a better tomorrow.
              </Text>

              {/* Nickname */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nickname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What should we call you?"
                  placeholderTextColor="#A3AAA2"
                  value={nickname}
                  onChangeText={setNickname}
                  autoCapitalize="words"
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email address *</Text>
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

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#A3AAA2"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm password *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password again"
                  placeholderTextColor="#A3AAA2"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Sign up button */}
              <Pressable
                style={({ pressed }) => [
                  styles.createButton,
                  pressed && styles.pressed,
                  loading && styles.disabledButton,
                ]}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </Pressable>

              {/* Login link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginDescription}>
                  Already have an account?
                </Text>

                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}> Log in</Text>
                </Pressable>
              </View>

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
    paddingTop: 35,
    paddingBottom: 35,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    color: '#234D3C',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: '#858D86',
    marginTop: 10,
    marginBottom: 32,
  },

  // Inputs
  inputGroup: {
    marginBottom: 19,
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

  // Create button
  createButton: {
    marginTop: 15,
    height: 62,
    borderRadius: 35,
    backgroundColor: '#234D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
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

  // Login
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  loginDescription: {
    fontSize: 14,
    color: '#858D86',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#234D3C',
  },

  footerText: {
    marginTop: 35,
    fontSize: 12,
    color: '#9A9E96',
    textAlign: 'center',
  },
});
