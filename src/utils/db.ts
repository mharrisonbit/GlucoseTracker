import * as SQLite from "expo-sqlite";
import { GlucoseReading } from "../types";

const db = SQLite.openDatabase("glucose.db");

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS readings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          value REAL NOT NULL,
          timestamp TEXT NOT NULL,
          notes TEXT
        )`,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const addReading = (
  reading: Omit<GlucoseReading, "id">
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO readings (value, timestamp, notes) VALUES (?, ?, ?)",
        [reading.value, reading.timestamp, reading.notes || null],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getReadings = (): Promise<GlucoseReading[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM readings ORDER BY timestamp DESC",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
