import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Download, X } from "lucide-react";

export function ResumePreview({ resumeUrl }: { resumeUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="px-10 py-7 text-lg font-medium rounded-2xl text-foreground hover:text-accent-primary transition-all group border border-transparent hover:border-accent-primary/20"
        >
          <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
          Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl"></DialogTitle>
          
        </DialogHeader>
        <div className="flex-1 rounded-xl border overflow-hidden">
          <iframe
            src={resumeUrl}
            className="w-full h-full"
            title="Resume Preview"
          />
        </div>
        <div className="flex justify-center pt-4">
          <a href={resumeUrl} download className="flex justify-center">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
