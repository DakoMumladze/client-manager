"use client";

import * as React from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  pending?: boolean;
};

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  pending = false,
}: ConfirmDialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-auto px-4" disabled={pending}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            variant="primary"
            className="w-auto border-red-600 bg-red-500 px-4 hover:bg-red-600"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
