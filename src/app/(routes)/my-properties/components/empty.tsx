'use client'

import { createNewHomeButton } from "@/actions";
import { Button } from "@/components/ui";

export const Empty = ({ userId }: { userId: string }) => {
  const createHomeWithId = createNewHomeButton.bind(null, {
    userId: userId,
  });

  return (
    <div className="pt-2">
      <p>Lista vacía. Por favor, agregue una propiedad.</p>
      <Button variant="secondary" className="mt-2" onClick={() => createHomeWithId()}>
        Agregar propiedad
      </Button>
    </div>
  );
}
