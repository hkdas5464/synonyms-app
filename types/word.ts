// types/word.ts
export interface Word {
    id: string;
    text: string;
    eng: string;
    meaning: string;
  }
  
  export interface WordGroup {
    title: string;
    words: Word[];
  }