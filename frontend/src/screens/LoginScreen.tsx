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

import { supabase } from '../lib/supabase';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your email and password.',
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      // 로그인 성공 후 화면 이동은 Auth 상태 관리에서 처리할 예정.
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
              <Text style={styles.title}>Welcome back</Text>

              <Text style={styles.subtitle}>
                Log in to continue your journey with morrow.
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

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#A3AAA2"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Forgot password */}
              <Pressable
                style={styles.forgotButton}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>

              {/* Login button */}
              <Pressable
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.pressed,
                  loading && styles.disabledButton,
                ]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Log In</Text>
                )}
              </Pressable>

              {/* Sign up link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupDescription}>
                  Don't have an account?
                </Text>

                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupLink}> Sign up</Text>
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
    paddingTop: 65,
    paddingBottom: 35,
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
    marginTop: 10,
    marginBottom: 38,
    lineHeight: 23,
  },

  // Inputs
  inputGroup: {
    marginBottom: 22,
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

  // Forgot password
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginBottom: 25,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#47785C',
  },

  // Login button
  loginButton: {
    height: 62,
    borderRadius: 35,
    backgroundColor: '#234D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
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

  // Sign up
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupDescription: {
    fontSize: 14,
    color: '#858D86',
  },
  signupLink: {
    fontSize: 14,
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
