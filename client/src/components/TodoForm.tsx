import { useState } from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TodoFormProps {
  onAddTodo: (body: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const characterLimit = 100;
  const characterCount = body.length;
  const progress = (characterCount / characterLimit) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBody = body.trim();
    
    if (!trimmedBody) {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      onAddTodo(trimmedBody);
      setBody("");
      toast({
        title: "✨ Task added successfully",
        description: "Your new task has been added to the list",
        className: "bg-green-500 dark:bg-green-700 text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white/5 backdrop-blur-lg border-none shadow-xl dark:shadow-black/10">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow group">
              <Input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What needs to be done?"
                className="bg-transparent border-2 h-12 px-4 transition-all duration-200 
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         hover:border-blue-400 dark:hover:border-blue-400
                         dark:bg-gray-800/50 dark:text-white"
                autoComplete="off"
                disabled={isSubmitting}
                aria-label="New task input"
                maxLength={characterLimit}
              />
              <AnimatePresence>
                {body && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => setBody("")}
                    aria-label="Clear input"
                  >
                    ×
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 
                       dark:hover:bg-blue-600 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <PlusCircle className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Adding..." : "Add Task"}
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-1" />
            <div className="flex justify-between text-sm">
              <span className={`transition-colors duration-200 
                ${progress > 90 ? 'text-amber-500 dark:text-amber-400' : 
                  progress > 75 ? 'text-blue-500 dark:text-blue-400' : 
                  'text-gray-500 dark:text-gray-400'}`}>
                {characterCount} / {characterLimit} characters
              </span>
              {progress > 75 && (
                <span className="text-amber-500 dark:text-amber-400">
                  {characterLimit - characterCount} characters remaining
                </span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;