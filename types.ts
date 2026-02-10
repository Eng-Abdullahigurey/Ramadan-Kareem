
export enum AppTab {
  DASHBOARD = 'dashboard',
  TRACKER = 'tracker',
  QURAN = 'quran',
  TASBEEH = 'tasbeeh',
  INSIGHTS = 'insights'
}

export interface PrayerTime {
  name: string;
  time: string;
  completed: boolean;
  icon: string;
}

export interface WorshipStats {
  salahCount: number;
  quranPages: number;
  dhikrCount: number;
  streak: number;
  lastUpdated: string;
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  verses: number;
  type: 'Meccan' | 'Medinan';
}

export interface DhikrType {
  arabic: string;
  transliteration: string;
  meaning: string;
}
