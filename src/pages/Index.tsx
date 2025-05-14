
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import NoteList from "@/components/NoteList";
import CreateNote from "@/components/CreateNote";
import { Note } from "@/types/note";
import { getNotes, saveNote, deleteNote, updateNote } from "@/utils/noteStorage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  // Load notes from local storage
  useEffect(() => {
    setNotes(getNotes());
  }, []);
  
  const handleCreateNote = () => {
    setIsCreating(true);
  };
  
  const handleSaveNote = (note: Note) => {
    saveNote(note);
    setNotes(getNotes());
    setIsCreating(false);
    toast({
      title: "Note created",
      description: "Your note has been successfully created."
    });
  };
  
  const handleCancelCreate = () => {
    setIsCreating(false);
  };
  
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };
  
  const handleCloseDetails = () => {
    setSelectedNote(null);
  };
  
  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
    setSelectedNote(null);
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted."
    });
  };
  
  // This renders the appropriate view based on the state
  const renderContent = () => {
    if (isCreating) {
      return (
        <CreateNote
          onSave={handleSaveNote}
          onCancel={handleCancelCreate}
        />
      );
    }
    
    return (
      <NoteList
        notes={notes}
        onNoteClick={handleNoteClick}
        onCreateClick={handleCreateNote}
      />
    );
  };
  
  // Renders the note detail dialog
  const renderNoteDetail = () => {
    if (!selectedNote) return null;
    
    return (
      <Dialog open={!!selectedNote} onOpenChange={handleCloseDetails}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
              <p className="text-sm text-gray-500">
                Category: {selectedNote.category} | Last Updated: {new Date(selectedNote.updatedAt).toLocaleString()}
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => handleDeleteNote(selectedNote.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {selectedNote.content.map((paragraph, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p>{paragraph}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
      {renderNoteDetail()}
    </div>
  );
};

export default Index;
