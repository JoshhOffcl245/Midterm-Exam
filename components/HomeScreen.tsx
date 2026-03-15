import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calcPenalty, daysOverdue, formatDate } from '../constants/helpers';
import { sharedStyles } from '../constants/styles';
import { colors } from '../constants/theme';
import { AppState } from '../constants/types';

interface HomeScreenProps {
  state: AppState;
  onResetStats: () => void;
}

export default function HomeScreen({ state, onResetStats }: HomeScreenProps) {
  const availableCDs = state.inventory.filter((c) => c.available > 0);

  const handleReset = () => {
    Alert.alert(
      'Reset Stats',
      'This will reset total income and total borrowed count to zero. Active borrows and inventory will not be affected.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: onResetStats },
      ]
    );
  };

  return (
    <ScrollView
      style={sharedStyles.screen}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={sharedStyles.page}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
          <Text style={sharedStyles.pageTitle}>CD Library</Text>
          <TouchableOpacity onPress={handleReset} activeOpacity={0.7} style={{ paddingBottom: 6 }}>
            <Text style={{ fontSize: 10, fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase', color: colors.text3 }}>Reset Stats</Text>
          </TouchableOpacity>
        </View>
        <Text style={sharedStyles.pageSub}>inventory & lending tracker</Text>

        <View style={sharedStyles.statsRow}>
          <View style={sharedStyles.statBox}>
            <Text style={[sharedStyles.statVal, { color: colors.accent }]}>
              ₱{state.totalIncome}
            </Text>
            <Text style={sharedStyles.statKey}>total income</Text>
          </View>
          <View style={sharedStyles.statBox}>
            <Text style={sharedStyles.statVal}>{state.totalBorrowedEver}</Text>
            <Text style={sharedStyles.statKey}>total borrowed ever</Text>
          </View>
        </View>

        <Text style={sharedStyles.sectionLabel}>Available CDs</Text>
        {availableCDs.length === 0 ? (
          <View style={sharedStyles.emptyBox}>
            <Text style={sharedStyles.emptyText}>No CDs currently available</Text>
          </View>
        ) : (
          availableCDs.map((cd) => (
            <View key={cd.id} style={[sharedStyles.card, sharedStyles.cardAvail]}>
              <View style={sharedStyles.cardRow}>
                <View style={{ flex: 1 }}>
                  <Text style={sharedStyles.cardTitle}>{cd.title}</Text>
                  <Text style={sharedStyles.cardSub}>{cd.artist}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={sharedStyles.copiesBadge}>{cd.available}</Text>
                  <Text style={sharedStyles.copiesLabel}>copies left</Text>
                </View>
              </View>
            </View>
          ))
        )}

        <Text style={sharedStyles.sectionLabel}>Borrowed CDs</Text>
        {state.borrowed.length === 0 ? (
          <View style={sharedStyles.emptyBox}>
            <Text style={sharedStyles.emptyText}>No active borrows</Text>
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
                      <Text style={[sharedStyles.copiesLabel, { color: colors.danger }]}>
                        {over}d overdue
                      </Text>
                    </View>
                  ) : (
                    <View style={[sharedStyles.chip, sharedStyles.chipGreen]}>
                      <Text style={[sharedStyles.chipText, { color: colors.green }]}>
                        on time
                      </Text>
                    </View>
                  )}
                </View>
                <View style={sharedStyles.cardMeta}>
                  <View style={[sharedStyles.chip, sharedStyles.chipGray]}>
                    <Text style={[sharedStyles.chipText, { color: colors.text2 }]}>
                      Borrowed {formatDate(b.borrowDate)}
                    </Text>
                  </View>
                  <View style={[sharedStyles.chip, sharedStyles.chipPurple]}>
                    <Text style={[sharedStyles.chipText, { color: '#a78bfa' }]}>
                      Due {formatDate(b.dueDate)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}