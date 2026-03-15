import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calcPenalty, daysOverdue, formatDate } from '../constants/helpers';
import { sharedStyles } from '../constants/styles';
import { colors, PENALTY_PER_DAY } from '../constants/theme';
import { AppState, BorrowRecord } from '../constants/types';
import ReturnModal from './ReturnModal';

interface ReturnScreenProps {
  state: AppState;
  onReturn: (record: BorrowRecord, penalty: number) => void;
}

export default function ReturnScreen({ state, onReturn }: ReturnScreenProps) {
  const [modalData, setModalData] = useState<{ record: BorrowRecord; penalty: number } | null>(
    null
  );

  const handlePressReturn = (record: BorrowRecord) => {
    const penalty = calcPenalty(record.dueDate);
    setModalData({ record, penalty });
  };

  const handleConfirm = () => {
    if (!modalData) return;
    onReturn(modalData.record, modalData.penalty);
    setModalData(null);
  };

  return (
    <>
      <ScrollView
        style={sharedStyles.screen}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={sharedStyles.page}>
          <Text style={sharedStyles.pageTitle}>Return a CD</Text>
          <Text style={sharedStyles.pageSub}>calculate & settle dues</Text>

          {state.borrowed.length === 0 ? (
            <View style={sharedStyles.emptyBox}>
              <Text style={sharedStyles.emptyText}>No CDs to return</Text>
            </View>
          ) : (
            state.borrowed.map((b) => {
              const pen = calcPenalty(b.dueDate);
              const over = daysOverdue(b.dueDate);
              return (
                <View
                  key={b.id}
                  style={[
                    sharedStyles.card,
                    pen > 0 ? sharedStyles.cardOverdue : sharedStyles.cardBorrowed,
                  ]}
                >
                  <View style={sharedStyles.cardRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={sharedStyles.cardTitle}>{b.cdTitle}</Text>
                      <Text style={sharedStyles.cardSub}>{b.borrower}</Text>
                    </View>
                    {pen > 0 ? (
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[sharedStyles.penaltyVal, { color: colors.danger }]}>
                          ₱{pen}
                        </Text>
                        <Text style={[sharedStyles.copiesLabel, { color: colors.text3 }]}>
                          {over}d × ₱{PENALTY_PER_DAY}
                        </Text>
                      </View>
                    ) : (
                      <View style={[sharedStyles.chip, sharedStyles.chipGreen]}>
                        <Text style={[sharedStyles.chipText, { color: colors.green }]}>
                          No penalty
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={sharedStyles.cardMeta}>
                    <View style={[sharedStyles.chip, sharedStyles.chipGray]}>
                      <Text style={[sharedStyles.chipText, { color: colors.text2 }]}>
                        Due {formatDate(b.dueDate)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[sharedStyles.btn, sharedStyles.btnDanger, { marginTop: 12 }]}
                    onPress={() => handlePressReturn(b)}
                    activeOpacity={0.85}
                  >
                    <Text style={sharedStyles.btnDangerText}>Return CD</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <ReturnModal
        visible={modalData !== null}
        record={modalData?.record ?? null}
        penalty={modalData?.penalty ?? 0}
        onConfirm={handleConfirm}
        onClose={() => setModalData(null)}
      />
    </>
  );
}