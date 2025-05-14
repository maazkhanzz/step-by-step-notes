
export interface Note {
  id: string;
  title: string;
  content: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteCategory = "Personal" | "Work" | "Study" | "Other";

export const CATEGORIES: NoteCategory[] = ["Personal", "Work", "Study", "Other"];
