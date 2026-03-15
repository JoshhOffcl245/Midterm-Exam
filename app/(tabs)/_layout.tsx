import React, { useState } from 'react';
import { Alert, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BorrowScreen from '../../components/BorrowScreen';
import HomeScreen from '../../components/HomeScreen';
import InventoryScreen from '../../components/InventoryScreen';
import ReturnScreen from '../../components/ReturnScreen';
import TabBar from '../../components/TabBar';
import { addDays } from '../../constants/helpers';
import { sharedStyles } from '../../constants/styles';
import { BORROW_DAYS, colors } from '../../constants/theme';
import { BorrowRecord, TabName } from '../../constants/types';
import { useStorage } from '../../hooks/useStorage';

export default function TabsLayout() {
  const { state, loaded, updateState } = useStorage();
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const handleBorrow = (cdId: number, borrower: string) => {
    const cd = state.inventory.find((c) => c.id === cdId);
    if (!cd || cd.available < 1) {
      Alert.alert('CD not available.', 'There are no copies left for this CD.');
      return;
    }
    const today = new Date();
    const due = addDays(today, BORROW_DAYS);
    updateState((prev) => {
      const newInventory = prev.inventory.map((c) =>
        c.id === cdId ? { ...c, available: c.available - 1 } : c
      );
      const newRecord: BorrowRecord = {
        id: prev.nextBorrowId,
        cdId: cd.id,
        cdTitle: cd.title,
        borrower,
        borrowDate: today.toISOString().split('T')[0],
        dueDate: due.toISOString().split('T')[0],
      };
      return {
        ...prev,
        inventory: newInventory,
        borrowed: [...prev.borrowed, newRecord],
        totalBorrowedEver: prev.totalBorrowedEver + 1,
        nextBorrowId: prev.nextBorrowId + 1,
      };
    });
    Alert.alert('Success', `"${cd.title}" borrowed by ${borrower}.`);
  };

  const handleReturn = (record: BorrowRecord, penalty: number) => {
    updateState((prev) => {
      const newInventory = prev.inventory.map((c) =>
        c.id === record.cdId ? { ...c, available: c.available + 1 } : c
      );
      return {
        ...prev,
        inventory: newInventory,
        borrowed: prev.borrowed.filter((b) => b.id !== record.id),
        totalIncome: prev.totalIncome + penalty,
      };
    });
    Alert.alert(
      'Returned',
      `"${record.cdTitle}" returned.${penalty > 0 ? ` Penalty: ₱${penalty}.` : ' No penalty.'}`
    );
  };

  const handleAddCD = (title: string, artist: string, copies: number) => {
    updateState((prev) => ({
      ...prev,
      inventory: [
        ...prev.inventory,
        { id: prev.nextId, title, artist, total: copies, available: copies },
      ],
      nextId: prev.nextId + 1,
    }));
    Alert.alert('Added', `"${title}" added to inventory.`);
  };

  const handleRemoveCD = (id: number) => {
    updateState((prev) => ({
      ...prev,
      inventory: prev.inventory.filter((c) => c.id !== id),
    }));
  };

  const handleResetStats = () => {
    updateState((prev) => ({
      ...prev,
      totalIncome: 0,
      totalBorrowedEver: 0,
    }));
  };

  if (!loaded) {
    return (
      <View style={sharedStyles.loadingContainer}>
        <Text style={sharedStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={sharedStyles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <View style={sharedStyles.container}>
        {activeTab === 'home' && <HomeScreen state={state} onResetStats={handleResetStats} />}
        {activeTab === 'borrow' && <BorrowScreen state={state} onBorrow={handleBorrow} />}
        {activeTab === 'return' && <ReturnScreen state={state} onReturn={handleReturn} />}
        {activeTab === 'inventory' && (
          <InventoryScreen state={state} onAddCD={handleAddCD} onRemoveCD={handleRemoveCD} />
        )}
        <TabBar activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}