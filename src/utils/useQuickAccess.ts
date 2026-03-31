import { useState, useCallback } from "react";
import { externalLinks } from "../data/links";

const STORAGE_KEY = "gs-intra-quick-access-v1";
export const MAX_QUICK_ITEMS = 5;

export interface QuickItem {
  id: string;
  label: string;
  sub: string;
  url: string;
  iconKey: string;
}

export const DEFAULT_QUICK_ITEMS: QuickItem[] = [
  { id: "__attendance__",  label: "勤怠・日報",  sub: "Attendance",  iconKey: "activity",  url: externalLinks.homeQuickAccess.attendance },
  { id: "__reservation__", label: "会議室予約",  sub: "Reservation", iconKey: "calendar",  url: externalLinks.homeQuickAccess.roomReservation },
  { id: "__telework__",    label: "TW申請",      sub: "Telework",    iconKey: "clipboard", url: externalLinks.homeQuickAccess.telework },
  { id: "__wiki__",        label: "GSうぃき",    sub: "Wiki",        iconKey: "zap",       url: externalLinks.homeQuickAccess.wiki },
  { id: "__training__",    label: "E-ラン",      sub: "Training",    iconKey: "study",     url: externalLinks.homeQuickAccess.training },
];

export function useQuickAccess() {
  const [items, setItems] = useState<QuickItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_QUICK_ITEMS;
  });

  const addItem = useCallback((item: QuickItem) => {
    setItems(prev => {
      if (prev.length >= MAX_QUICK_ITEMS || prev.some(i => i.id === item.id)) return prev;
      const next = [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const moveItem = useCallback((id: string, dir: -1 | 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx < 0 || idx + dir < 0 || idx + dir >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(DEFAULT_QUICK_ITEMS);
  }, []);

  return { items, addItem, removeItem, moveItem, reset };
}