import { useState, useCallback } from "react";

const STORAGE_KEY = "gs-read-news";
const PURGE_DAYS = 30; // この日数以上前の既読レコードは自動削除

type ReadRecord = Record<string, number>; // id -> 既読日時(timestamp)

function loadRecords(): ReadRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // 旧形式（配列）から新形式（オブジェクト）へ移行
    if (Array.isArray(parsed)) {
      const now = Date.now();
      return Object.fromEntries(parsed.map((id: string) => [id, now]));
    }
    return parsed as ReadRecord;
  } catch {
    return {};
  }
}

function purgeAndSave(records: ReadRecord): ReadRecord {
  const cutoff = Date.now() - PURGE_DAYS * 86400000;
  const purged: ReadRecord = {};
  for (const [id, ts] of Object.entries(records)) {
    if (ts > cutoff) purged[id] = ts;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(purged));
  return purged;
}

function getReadRecords(): ReadRecord {
  return purgeAndSave(loadRecords());
}

export function useReadNews() {
  const [records, setRecords] = useState<ReadRecord>(getReadRecords);

  const markAsRead = useCallback((id: string | number) => {
    const key = String(id);
    setRecords((prev) => {
      if (prev[key]) return prev;
      const next = { ...prev, [key]: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isRead = useCallback((id: string | number) => !!records[String(id)], [records]);

  return { isRead, markAsRead };
}
