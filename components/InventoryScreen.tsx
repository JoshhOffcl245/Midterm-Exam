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
import { sharedStyles } from '../constants/styles';
import { colors } from '../constants/theme';
import { AppState } from '../constants/types';

interface InventoryScreenProps {
  state: AppState;
  onAddCD: (title: string, artist: string, copies: number) => void;
  onRemoveCD: (id: number) => void;
}

export default function InventoryScreen({ state, onAddCD, onRemoveCD }: InventoryScreenProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newCopies, setNewCopies] = useState('1');
  const [editMode, setEditMode] = useState(false);

  const handleAdd = () => {
    if (!newTitle.trim() || !newArtist.trim()) {
      Alert.alert('Missing Info', 'Please enter both title and artist.');
      return;
    }
    const copies = parseInt(newCopies) || 1;
    onAddCD(newTitle.trim(), newArtist.trim(), copies);
    setNewTitle('');
    setNewArtist('');
    setNewCopies('1');
  };

  const handleRemove = (id: number, title: string) => {
    const isBorrowed = state.borrowed.some((b) => b.cdId === id);
    if (isBorrowed) {
      Alert.alert(
        'Cannot Remove',
        `"${title}" has active borrows. Return all copies before removing.`
      );
      return;
    }
    Alert.alert(
      'Remove CD',
      `Remove "${title}" from inventory?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveCD(id) },
      ]
    );
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
          <Text style={sharedStyles.pageTitle}>Inventory</Text>
          <Text style={sharedStyles.pageSub}>add & manage cd collection</Text>

          <View style={sharedStyles.formCard}>
            <Text style={sharedStyles.formLabel}>CD Title</Text>
            <TextInput
              style={sharedStyles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="e.g. Thriller"
              placeholderTextColor={colors.text3}
            />
            <Text style={[sharedStyles.formLabel, { marginTop: 12 }]}>Artist</Text>
            <TextInput
              style={sharedStyles.input}
              value={newArtist}
              onChangeText={setNewArtist}
              placeholder="e.g. Michael Jackson"
              placeholderTextColor={colors.text3}
            />
            <Text style={[sharedStyles.formLabel, { marginTop: 12 }]}>Copies</Text>
            <TextInput
              style={sharedStyles.input}
              value={newCopies}
              onChangeText={setNewCopies}
              placeholder="e.g. 3"
              placeholderTextColor={colors.text3}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[sharedStyles.btn, sharedStyles.btnPrimary, { marginBottom: 24 }]}
            onPress={handleAdd}
            activeOpacity={0.85}
          >
            <Text style={sharedStyles.btnPrimaryText}>Add to Inventory</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={sharedStyles.sectionLabel}>All CDs</Text>
            <TouchableOpacity onPress={() => setEditMode((prev) => !prev)} activeOpacity={0.7}>
              <Text style={{
                fontSize: 10,
                fontWeight: '600',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: editMode ? colors.accent : colors.text3,
              }}>
                {editMode ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          {state.inventory.map((cd) => (
            <View key={cd.id} style={[sharedStyles.card, sharedStyles.cardAvail]}>
              <View style={sharedStyles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.cardTitle}>{cd.title}</Text>
                  <Text style={sharedStyles.cardSub}>{cd.artist}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  <Text style={sharedStyles.copiesBadge}>
                    {cd.available}/{cd.total}
                  </Text>
                  <Text style={sharedStyles.copiesLabel}>avail/total</Text>
                </View>
              </View>
              {editMode && (
                <TouchableOpacity
                  style={[sharedStyles.btn, sharedStyles.btnDanger, { marginTop: 12 }]}
                  onPress={() => handleRemove(cd.id, cd.title)}
                  activeOpacity={0.85}
                >
                  <Text style={sharedStyles.btnDangerText}>Remove from Inventory</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}