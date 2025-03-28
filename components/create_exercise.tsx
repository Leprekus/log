import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog";
import { create_exercise } from "@/app/queries.actions";

export default async function CreateExercise() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Exercise</DialogTitle>
          <DialogDescription>
            Make changes to your exercise here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
	<form action={create_exercise}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input name="name" type="text" placeholder="Chest Press" className="col-span-3"/>
	    </div>
        </div>
        <DialogFooter>
		<DialogClose asChild>
          		<Button type="submit" size='sm'>Save</Button>
	  	</DialogClose>
	</DialogFooter>
	</form>
      </DialogContent>
    </Dialog>
  );
}

