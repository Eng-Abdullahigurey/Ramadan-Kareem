
import { DhikrType, Surah } from './types';

export const DHIKR_LIST: DhikrType[] = [
  { arabic: "سُبْحَانَ ٱللَّٰهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah" },
  { arabic: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah" },
  { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah" },
  { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
];

export const SURAH_LIST: Surah[] = [
  { id: 1, name: "الفاتحة", englishName: "Al-Fatihah", verses: 7, type: "Meccan" },
  { id: 2, name: "البقرة", englishName: "Al-Baqarah", verses: 286, type: "Medinan" },
  { id: 3, name: "آل عمران", englishName: "Ali 'Imran", verses: 200, type: "Medinan" },
  { id: 36, name: "يس", englishName: "Ya-Sin", verses: 83, type: "Meccan" },
  { id: 67, name: "الملك", englishName: "Al-Mulk", verses: 30, type: "Meccan" },
  { id: 114, name: "الناس", englishName: "An-Nas", verses: 6, type: "Meccan" },
];

export const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
