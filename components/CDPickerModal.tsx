import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { sharedStyles } from '../constants/styles';
import { colors } from '../constants/theme';
import { CD } from '../constants/types';

interface CDPickerModalProps {
  visible: boolean;
  availableForBorrow: CD[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onClose: () => void;
}

export default function CDPickerModal({
  visible,
  availableForBorrow,
  selectedId,
  onSelect,
  onClose,
}: CDPickerModalProps) {
  const renderItem = ({ item }: { item: CD }) => (
    <TouchableOpacity
      style={[
        sharedStyles.pickerItem,
        selectedId === item.id && { backgroundColor: colors.accent + '20' },
      ]}
      onPress={() => {
        onSelect(item.id);
        onClose();
      }}
      activeOpacity={0.8}
    >
      <Text style={sharedStyles.pickerItemTitle}>{item.title}</Text>
      <Text style={sharedStyles.pickerItemSub}>{item.artist}</Text>
      <Text style={sharedStyles.pickerItemSub}>{item.available} available</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={sharedStyles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={sharedStyles.modalSheet} onStartShouldSetResponder={() => true}>
          <Text style={sharedStyles.modalTitle}>Select a CD</Text>
          <FlatList
            data={availableForBorrow}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 300 }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}