import { Platform } from 'react-native';

export const colors = {
  bg: '#0f0f14',
  bg2: '#1a1a24',
  bg3: '#22222f',
  card: '#1e1e2a',
  border: 'rgba(255,255,255,0.08)',
  accent: '#00d9ff',
  accent2: '#0099ff',
  danger: '#ff5b5b',
  warn: '#ffb547',
  text: '#f0eefc',
  text2: '#9994bb',
  text3: '#5f5b7a',
  green: '#4ade80',
};

export const PENALTY_PER_DAY = 2;
export const BORROW_DAYS = 7;
export const STORAGE_KEY = 'cdlibrary_v1';
export const MONO_FONT = Platform.OS === 'ios' ? 'Courier New' : 'monospace';

export const INITIAL_INVENTORY = [
  { id: 1, title: 'Thriller', artist: 'Michael Jackson', total: 3, available: 3 },
  { id: 2, title: 'Dark Side of the Moon', artist: 'Pink Floyd', total: 2, available: 2 },
  { id: 3, title: 'Abbey Road', artist: 'The Beatles', total: 2, available: 2 },
  { id: 4, title: 'Rumours', artist: 'Fleetwood Mac', total: 1, available: 1 },
  { id: 5, title: 'Back in Black', artist: 'AC/DC', total: 2, available: 2 },
];