"use client";

import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps {
  isSubmitting: boolean;
}

export const ButtonSubmit = ({ isSubmitting }: ButtonProps) => {
  return (
    <div className='flex justify-end w-full mt-4'>
      {isSubmitting ? (
        <Button disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Guardando
        </Button>
      ) : (
        <Button type="submit">Guardar</Button>
      )}
    </div>
  );
};
