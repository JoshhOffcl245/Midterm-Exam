import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { INITIAL_INVENTORY, STORAGE_KEY } from '../constants/theme';
import { AppState } from '../constants/types';

const INITIAL_STATE: AppState = {
  inventory: INITIAL_INVENTORY,
  borrowed: [],
  totalIncome: 0,
  totalBorrowedEver: 0,
  nextId: 6,
  nextBorrowId: 1,
};

export function useStorage() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setState(JSON.parse(raw));
        } catch (_) {
          setState(INITIAL_STATE);
        }
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((newState: AppState) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const updateState = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setState((prev) => {
        const next = updater(prev);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  return { state, loaded, updateState };
}