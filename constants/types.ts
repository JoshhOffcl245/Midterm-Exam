export interface CD {
  id: number;
  title: string;
  artist: string;
  total: number;
  available: number;
}

export interface BorrowRecord {
  id: number;
  cdId: number;
  cdTitle: string;
  borrower: string;
  borrowDate: string;
  dueDate: string;
}

export interface AppState {
  inventory: CD[];
  borrowed: BorrowRecord[];
  totalIncome: number;
  totalBorrowedEver: number;
  nextId: number;
  nextBorrowId: number;
}

export type TabName = 'home' | 'borrow' | 'return' | 'inventory';