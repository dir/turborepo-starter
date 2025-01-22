"use client";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";

export function ToastButtons() {
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={() => toast("This is a default toast.")}>Default Toast</Button>
      <Button variant="secondary" onClick={() => toast.info("This is an info toast.")}>
        Info Toast
      </Button>
      <Button onClick={() => toast.success("This is a success toast!")}>Success Toast</Button>
      <Button variant="destructive" onClick={() => toast.error("This is an error toast!")}>
        Error Toast
      </Button>
    </div>
  );
}
