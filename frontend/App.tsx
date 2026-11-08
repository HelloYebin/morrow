import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

type SpaceType = 'personal' | 'shared';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateSpace = (type: SpaceType) => {
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
