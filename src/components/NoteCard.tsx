
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Note } from "../types/note";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  // Format the date to a relative time (e.g., "3 hours ago")
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true });
  
  // Get a short preview of the content
  const contentPreview = note.content.join(" ").substring(0, 100) + (note.content.join(" ").length > 100 ? "..." : "");
  
  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col"
      onClick={() => onClick(note)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            {note.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{contentPreview}</p>
      </CardContent>
      
      <CardFooter className="pt-2 text-xs text-gray-500">
        Updated {formattedDate}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
