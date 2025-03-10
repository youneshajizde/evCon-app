import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateEventForm from "@/components/forms/CreateEventForm";

function CreateEvent({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogTitle>Create Your Event</DialogTitle>
        <div>
          <CreateEventForm open={open} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEvent;
