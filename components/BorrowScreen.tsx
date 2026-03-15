import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addDays, formatDate } from '../constants/helpers';
import { sharedStyles } from '../constants/styles';
import { BORROW_DAYS, colors } from '../constants/theme';
import { AppState } from '../constants/types';
import CDPickerModal from './CDPickerModal';

interface BorrowScreenProps {
  state: AppState;
  onBorrow: (cdId: number, borrower: string) => void;
}

export default function BorrowScreen({ state, onBorrow }: BorrowScreenProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [borrowerName, setBorrowerName] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const availableForBorrow = state.inventory.filter((c) => c.available > 0);
  const selectedCD = state.inventory.find((c) => c.id === selectedId);
  const duePreview = addDays(new Date(), BORROW_DAYS).toISOString().split('T')[0];

  const handleConfirm = () => {
    if (!selectedId) {
      Alert.alert('Select a CD', 'Please choose a CD to borrow.');
      return;
    }
    if (!borrowerName.trim()) {
      Alert.alert('Missing Name', 'Please enter the borrower name.');
      return;
    }
    const cd = state.inventory.find((c) => c.id === selectedId);
    if (!cd || cd.available < 1) {
      Alert.alert('CD not available.', 'There are no copies left for this CD.');
      return;
    }
    onBorrow(selectedId, borrowerName.trim());
    setSelectedId(null);
    setBorrowerName('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={sharedStyles.screen}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={sharedStyles.page}>
          <Text style={sharedStyles.pageTitle}>Borrow a CD</Text>
          <Text style={sharedStyles.pageSub}>7-day lending period · ₱2/day overdue</Text>

          <Text style={sharedStyles.formLabel}>Select CD</Text>
          <TouchableOpacity
            style={sharedStyles.selectBox}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.8}
          >
            <Text style={selectedCD ? sharedStyles.selectText : sharedStyles.selectPlaceholder}>
              {selectedCD
                ? `${selectedCD.title} — ${selectedCD.artist} (${selectedCD.available} left)`
                : 'Choose a CD…'}
            </Text>
            <Text style={sharedStyles.selectArrow}>▾</Text>
          </TouchableOpacity>

          <Text style={[sharedStyles.formLabel, { marginTop: 16 }]}>Borrower Name</Text>
          <TextInput
            style={sharedStyles.input}
            value={borrowerName}
            onChangeText={setBorrowerName}
            placeholder="Enter name..."
            placeholderTextColor={colors.text3}
          />

          {selectedCD && borrowerName.trim() ? (
            <View style={[sharedStyles.card, sharedStyles.cardBorrowed, { marginTop: 16 }]}>
              <Text style={sharedStyles.cardTitle}>{selectedCD.title}</Text>
              <View style={sharedStyles.cardMeta}>
                <View style={[sharedStyles.chip, sharedStyles.chipGray]}>
                  <Text style={[sharedStyles.chipText, { color: colors.text2 }]}>
                    {borrowerName.trim()}
                  </Text>
                </View>
                <View style={[sharedStyles.chip, sharedStyles.chipPurple]}>
                  <Text style={[sharedStyles.chipText, { color: '#a78bfa' }]}>
                    Due {formatDate(duePreview)}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={[sharedStyles.btn, sharedStyles.btnPrimary, { marginTop: 20 }]}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text style={sharedStyles.btnPrimaryText}>Confirm Borrow</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CDPickerModal
        visible={showPicker}
        availableForBorrow={availableForBorrow}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onClose={() => setShowPicker(false)}
      />
    </KeyboardAvoidingView>
  );
}