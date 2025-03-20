export interface GlucoseReading {
  id?: number;
  value: number;
  timestamp: string;
  notes?: string;
}

export interface DatabaseConnection {
  transaction: (callback: (tx: any) => void) => void;
}
