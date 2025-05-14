
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import StepIndicator from "./StepIndicator";
import { CATEGORIES, Note, NoteCategory } from "../types/note";
import { generateId } from "../utils/noteStorage";

interface CreateNoteProps {
  onSave: (note: Note) => void;
  onCancel: () => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Personal");
  const [content, setContent] = useState<string[]>(["", "", ""]);
  
  // Step titles and descriptions
  const steps = [
    {
      title: "Note Details",
      description: "Give your note a title and choose a category"
    },
    {
      title: "Main Content",
      description: "What's the most important thing to remember?"
    },
    {
      title: "Additional Details",
      description: "Add more context or details to your note"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSave();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSave = () => {
    const newNote: Note = {
      id: generateId(),
      title,
      category,
      content: content.filter(c => c.trim() !== ""),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onSave(newNote);
  };
  
  const handleContentChange = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };
  
  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return title.trim().length > 0;
      case 2:
        return content[0].trim().length > 0;
      case 3:
        return true; // Additional details can be empty
      default:
        return false;
    }
  };
  
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{steps[currentStep - 1].title}</h1>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <p className="text-gray-500 mb-6">{steps[currentStep - 1].description}</p>
      
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select value={category} onValueChange={(value) => setCategory(value as NoteCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-2">
            <label htmlFor="mainContent" className="text-sm font-medium">
              Main Content
            </label>
            <Textarea
              id="mainContent"
              placeholder="What's the most important information?"
              className="min-h-[150px]"
              value={content[0]}
              onChange={(e) => handleContentChange(0, e.target.value)}
            />
          </div>
        )}
        
        {currentStep === 3 && (
          <>
            <div className="space-y-2">
              <label htmlFor="additionalContent1" className="text-sm font-medium">
                Additional Detail 1
              </label>
              <Textarea
                id="additionalContent1"
                placeholder="Add more context or details (optional)"
                value={content[1]}
                onChange={(e) => handleContentChange(1, e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="additionalContent2" className="text-sm font-medium">
                Additional Detail 2
              </label>
              <Textarea
                id="additionalContent2"
                placeholder="Add more context or details (optional)"
                value={content[2]}
                onChange={(e) => handleContentChange(2, e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!isStepValid()}
          className="flex items-center gap-2"
        >
          {currentStep < totalSteps ? (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Save Note
              <Check className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateNote;
