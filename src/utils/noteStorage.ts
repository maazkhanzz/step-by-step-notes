
import { Note } from "../types/note";

// Local storage key
const STORAGE_KEY = "step-notes-app";

// Get all notes from local storage
export const getNotes = (): Note[] => {
  const notes = localStorage.getItem(STORAGE_KEY);
  return notes ? JSON.parse(notes) : [];
};

// Save a new note
export const saveNote = (note: Note): void => {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

// Update an existing note
export const updateNote = (updatedNote: Note): void => {
  const notes = getNotes();
  const index = notes.findIndex((note) => note.id === updatedNote.id);
  
  if (index !== -1) {
    notes[index] = updatedNote;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
};

// Delete a note
export const deleteNote = (id: string): void => {
  const notes = getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
