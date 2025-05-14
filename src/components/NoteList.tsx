
import React, { useState } from "react";
import { Note, CATEGORIES } from "../types/note";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onCreateClick: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onNoteClick, onCreateClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredNotes = selectedCategory === "all" 
    ? notes 
    : notes.filter(note => note.category === selectedCategory);
  
  // Sort notes by updatedAt (most recent first)
  const sortedNotes = [...filteredNotes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Button onClick={onCreateClick} className="flex items-center gap-2">
          <PlusCircle size={18} />
          <span>New Note</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger 
            value="all" 
            onClick={() => setSelectedCategory("all")}
          >
            All
          </TabsTrigger>
          {CATEGORIES.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory}>
          {sortedNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedNotes.map((note) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onClick={onNoteClick} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No notes found in this category</p>
              <Button onClick={onCreateClick} variant="outline">Create your first note</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoteList;
