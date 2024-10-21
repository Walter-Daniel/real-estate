"use client";

import { useState, useRef, useEffect } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Button } from "@/components/ui";
import { ChevronsUpDown } from "lucide-react";

export const DescriptionHouse = ({ description }: { description: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setShowToggle(contentRef.current.scrollHeight > contentRef.current.clientHeight)
    }
  }, [description])

  return (
    <Collapsible
    open={isOpen}
    onOpenChange={setIsOpen}
    className="space-y-2"
  >
    <div className="flex items-center justify-between space-x-4">
      <h4 className="text-xl font-semibold">
        Descripción
      </h4>
      {showToggle && (
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle description</span>
          </Button>
        </CollapsibleTrigger>
      )}
    </div>
    <div 
      ref={contentRef}
      className={`rounded-md border px-4 py-3 text-sm ${isOpen ? '' : 'max-h-24 overflow-hidden'}`}
    >
      <p>{description}</p>
    </div>
  </Collapsible>
  );
};
