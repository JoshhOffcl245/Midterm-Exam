import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { daysOverdue, formatDate } from '../constants/helpers';
import { sharedStyles } from '../constants/styles';
import { colors, PENALTY_PER_DAY } from '../constants/theme';
import { BorrowRecord } from '../constants/types';

interface ReturnModalProps {
  visible: boolean;
  record: BorrowRecord | null;
  penalty: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ReturnModal({
  visible,
  record,
  penalty,
  onConfirm,
  onClose,
}: ReturnModalProps) {
  if (!record) return null;

  const overdueDays = daysOverdue(record.dueDate);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={sharedStyles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={sharedStyles.modalSheet} onStartShouldSetResponder={() => true}>
          <Text style={sharedStyles.modalTitle}>Confirm Return</Text>
          <Text style={sharedStyles.modalSub}>
            {record.cdTitle} · {record.borrower}
          </Text>
          <View style={sharedStyles.divider} />

          <View style={sharedStyles.returnRow}>
            <Text style={sharedStyles.returnRowLabel}>Borrow date</Text>
            <Text style={sharedStyles.returnRowVal}>{formatDate(record.borrowDate)}</Text>
          </View>
          <View style={sharedStyles.returnRow}>
            <Text style={sharedStyles.returnRowLabel}>Due date</Text>
            <Text style={sharedStyles.returnRowVal}>{formatDate(record.dueDate)}</Text>
          </View>

          <View style={sharedStyles.divider} />

          <View style={[sharedStyles.returnRow, { marginTop: 4 }]}>
            <Text style={sharedStyles.returnRowLabel}>Penalty fee</Text>
            <Text
              style={[
                sharedStyles.penaltyBig,
                { color: penalty > 0 ? colors.danger : colors.green },
              ]}
            >
              ₱{penalty}
            </Text>
          </View>

          {penalty > 0 ? (
            <View style={sharedStyles.penaltyNote}>
              <Text style={[sharedStyles.penaltyNoteText, { color: colors.danger }]}>
                {overdueDays} days overdue × ₱{PENALTY_PER_DAY}/day
              </Text>
            </View>
          ) : (
            <View style={[sharedStyles.penaltyNote, sharedStyles.penaltyNoteGood]}>
              <Text style={[sharedStyles.penaltyNoteText, { color: colors.green }]}>
                Returned on time — no penalty!
              </Text>
            </View>
          )}

          <View style={sharedStyles.confirmRow}>
            <TouchableOpacity
              style={[sharedStyles.btn, sharedStyles.btnCancel, { flex: 1, marginRight: 8 }]}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={sharedStyles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[sharedStyles.btn, sharedStyles.btnPrimary, { flex: 1 }]}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text style={sharedStyles.btnPrimaryText}>Confirm (₱{penalty})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}