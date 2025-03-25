// types.ts
export interface WordData {
    id: string;
    text: string; // Generalized for words, idioms, or substitutions
    eng: string;
    meaning: string;
  }
  
  export interface SynonymCard extends WordData {
    mnemonicEnglish: string;
    mnemonicHindi: string;
    room: string;
    remembered: boolean;
  }
  
  export interface WordGroup {
    title: string;
    words: WordData[];
  }