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
import { get_exercise_bank } from "@/app/queries.actions"
import Item from "./item"
import CreateExercise from "./create_exercise"

export default async function ExerciseBank() {
	const exercise_bank = await get_exercise_bank();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Exercises</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exercise Bank</DialogTitle>
          <DialogDescription>
            Choose your exercise here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
		{ exercise_bank.data?.length === 0 ?
			<DialogDescription> No exercises Found </DialogDescription>
			:
		  exercise_bank.data.map( exercise => <Item { ... exercise }/>)
		}	
        </div>
        <DialogFooter>
	  <CreateExercise/>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

