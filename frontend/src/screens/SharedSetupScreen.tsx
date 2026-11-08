import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SharedSetup'>;

const CURRENCIES = [
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
];

export default function SharedSetupScreen({ navigation }: Props) {
  const [spaceName, setSpaceName] = useState('');
  const [currency, setCurrency] = useState('CAD');
  const [description, setDescription] = useState('');
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const selectedCurrency = CURRENCIES.find(item => item.code === currency);

  const handleCreateSpace = () => {
    if (!spaceName.trim()) return;

    // 다음 단계에서 실제 공간 저장 및 초대 코드 발급을 연결할 예정
    console.log({
      spaceName,
      currency,
      description,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>morrow.</Text>

        <Text style={styles.title}>Your shared space</Text>
        <Text style={styles.description}>
          Create a space to manage money together.
        </Text>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>＋</Text>
        </TouchableOpacity>
        <Text style={styles.profileLabel}>Add profile photo</Text>
        <Text style={styles.optionalText}>Optional</Text>

        <Text style={styles.inputLabel}>Space name</Text>
        <TextInput
          style={styles.input}
          value={spaceName}
          onChangeText={setSpaceName}
          placeholder="Our Home"
          placeholderTextColor="#A0A69F"
          maxLength={30}
        />

        <Text style={styles.inputLabel}>Base currency</Text>
        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => setCurrencyModalVisible(true)}
        >
          <Text style={styles.currencyText}>
            {selectedCurrency?.flag} {currency} · {selectedCurrency?.name}
          </Text>
          <Text style={styles.currencyArrow}>⌄</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About this space</Text>
        <Text style={styles.sectionDescription}>
          Add a short description. You can always change this later.
        </Text>

        <Text style={styles.inputLabel}>Description (Optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="A little description about this space..."
          placeholderTextColor="#A0A69F"
          multiline
          textAlignVertical="top"
          maxLength={200}
        />

        <TouchableOpacity
          style={[
            styles.createButton,
            !spaceName.trim() && styles.disabledButton,
          ]}
          onPress={handleCreateSpace}
          disabled={!spaceName.trim()}
        >
          <Text style={styles.createButtonText}>Create Shared Space</Text>
        </TouchableOpacity>

        <Text style={styles.bottomNote}>
          You can change these details anytime.
        </Text>
      </ScrollView>

      <Modal
        visible={currencyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose currency</Text>

            {CURRENCIES.map(item => (
              <TouchableOpacity
                key={item.code}
                style={styles.currencyOption}
                onPress={() => {
                  setCurrency(item.code);
                  setCurrencyModalVisible(false);
                }}
              >
                <Text style={styles.currencyText}>
                  {item.flag} {item.code} · {item.name}
                </Text>

                {currency === item.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F1',
  },
  container: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backButton: {
    color: '#234D3C',
    fontSize: 16,
    marginBottom: 20,
  },
  logo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#234D3C',
    letterSpacing: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202B25',
    marginTop: 35,
  },
  description: {
    fontSize: 14,
    color: '#858D86',
    marginTop: 8,
    marginBottom: 25,
  },
  profileButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E5EFE9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 30,
    color: '#234D3C',
  },
  profileLabel: {
    textAlign: 'center',
    color: '#234D3C',
    marginTop: 10,
    fontWeight: '600',
  },
  optionalText: {
    textAlign: 'center',
    color: '#858D86',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202B25',
    marginTop: 17,
    marginBottom: 8,
  },
  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#202B25',
  },
  currencyButton: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  currencyText: {
    color: '#202B25',
    fontSize: 15,
  },
  currencyArrow: {
    position: 'absolute',
    right: 17,
    fontSize: 20,
    color: '#858D86',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E9E1',
    marginVertical: 28,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#202B25',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#858D86',
    marginTop: 6,
  },
  descriptionInput: {
    minHeight: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#202B25',
  },
  createButton: {
    height: 56,
    borderRadius: 17,
    backgroundColor: '#234D3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.45,
  },
  bottomNote: {
    color: '#858D86',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20,30,24,0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#F9F9F1',
    borderRadius: 22,
    padding: 22,
    maxHeight: '75%',
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#202B25',
    marginBottom: 12,
  },
  currencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECE7',
  },
  checkmark: {
    color: '#234D3C',
    fontWeight: '700',
    fontSize: 18,
  },
});
