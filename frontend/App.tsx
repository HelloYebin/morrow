import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import { Session } from '@supabase/supabase-js';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 이메일 인증 링크 처리
    const handleDeepLink = async (url: string) => {
      try {
        const parsedUrl = new URL(url);
        const code = parsedUrl.searchParams.get('code');

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.log('Authentication error:', error.message);
          }
        } else {
          const errorDescription =
            parsedUrl.searchParams.get('error_description');

          if (errorDescription) {
            console.log('Authentication link error:', errorDescription);
          }
        }
      } catch (error) {
        console.log('Deep link error:', error);
      }
    };

    // 앱이 이미 실행 중일 때 링크 수신
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // 이메일 링크로 앱이 처음 실행되는 경우
    const initializeAuth = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl) {
          await handleDeepLink(initialUrl);
        }

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.log('Session error:', error.message);
        }

        if (isMounted) {
          setSession(data.session);
        }
      } catch (error) {
        console.log('Auth initialization error:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // 로그인 / 로그아웃 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    initializeAuth();

    return () => {
      isMounted = false;
      linkingSubscription.remove();
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#234D3C" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={!!session} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9F9F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
