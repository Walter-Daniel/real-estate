"use client";

import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps {
  onClick: () => void;
  isSubmitting: boolean;
}

export const ButtonSubmit = ({ onClick, isSubmitting }: ButtonProps) => {
  return (
    <div className="flex justify-between">
      <Button variant="secondary" type="button" onClick={onClick}>
        Salir
      </Button>
      {isSubmitting ? (
        <Button disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Guardando
        </Button>
      ) : (
        <Button type="submit">Siguiente</Button>
      )}
    </div>
  );
};
