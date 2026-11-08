import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { supabase } from './src/lib/supabase';

export default function App() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);

        if (error) {
          console.log('Supabase response:', error.message);
          return;
        }

        console.log('Supabase connection successful!', data);
      } catch (error) {
        console.log('Supabase connection failed:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
