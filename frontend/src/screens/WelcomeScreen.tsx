import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
type SpaceType = 'personal' | 'shared';

export default function WelcomeScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateSpace = (type: SpaceType) => {
    setModalVisible(false);

    // 다음 단계에서 공간 생성 화면으로 연결할 예정
    if (type === 'personal') {
      navigation.navigate('PersonalSetup');
    } else {
      navigation.navigate('SharedSetup');
    }
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            Alert.alert('Logout failed', error.message);
          }
        },
      },
    ]);
  };

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
          <Pressable onPress={handleLogout}>
            <Text style={styles.settings}>Log out</Text>
          </Pressable>
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

          <Text style={styles.title}>Create your{'\n'}first space</Text>

          <Text style={styles.subtitle}>Choose a space to get started</Text>

          {/* Create button */}
          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.plusCircle}>
              <Text style={styles.plus}>＋</Text>
            </View>
            <Text style={styles.createText}>Create new space</Text>
          </Pressable>

          <Text style={styles.footerText}>
            Your money. Your people. Your future.
          </Text>
        </View>

        {/* Space selection modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={styles.modalBackdrop}
              onPress={() => setModalVisible(false)}
            />

            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />

              <Text style={styles.modalTitle}>What kind of space?</Text>
              <Text style={styles.modalSubtitle}>
                Choose how you want to manage your money.
              </Text>

              <Pressable
                style={({ pressed }) => [
                  styles.choice,
                  pressed && styles.pressed,
                ]}
                onPress={() => handleCreateSpace('personal')}
              >
                <View style={styles.personalIcon}>
                  <Text style={styles.choiceEmoji}>👤</Text>
                </View>
                <View style={styles.choiceInfo}>
                  <Text style={styles.choiceTitle}>Personal</Text>
                  <Text style={styles.choiceDescription}>
                    Manage your own money
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.choice,
                  pressed && styles.pressed,
                ]}
                onPress={() => handleCreateSpace('shared')}
              >
                <View style={styles.sharedIcon}>
                  <Text style={styles.choiceEmoji}>⌂</Text>
                </View>
                <View style={styles.choiceInfo}>
                  <Text style={styles.choiceTitle}>Shared</Text>
                  <Text style={styles.choiceDescription}>
                    Manage money together
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Maybe later</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  settings: {
    fontSize: 25,
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
    fontSize: 39,
    lineHeight: 48,
    fontWeight: '800',
    color: '#234D3C',
    textAlign: 'center',
    letterSpacing: -1.2,
  },
  subtitle: {
    fontSize: 16,
    color: '#858D86',
    marginTop: 16,
    textAlign: 'center',
  },

  // Create button
  createButton: {
    marginTop: 65,
    width: '100%',
    maxWidth: 310,
    height: 76,
    borderRadius: 45,
    backgroundColor: '#EAF2E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  plus: {
    fontSize: 33,
    lineHeight: 38,
    color: '#234D3C',
  },
  createText: {
    fontSize: 17,
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

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(25, 45, 34, 0.25)',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    backgroundColor: '#F9F9F1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#D8DDD4',
    alignSelf: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#234D3C',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#858D86',
    marginTop: 8,
    marginBottom: 25,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
  },
  personalIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#E5EFE9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharedIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F4EBDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceEmoji: {
    fontSize: 25,
  },
  choiceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  choiceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#234D3C',
  },
  choiceDescription: {
    fontSize: 13,
    color: '#858D86',
    marginTop: 4,
  },
  chevron: {
    fontSize: 27,
    color: '#A0A89F',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 5,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#858D86',
  },
});
