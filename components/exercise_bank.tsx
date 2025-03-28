'use server'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { create_template_exercises, get_exercise_bank } from "@/app/queries.actions"
import Item from "./item"
import CreateExercise from "./create_exercise"
import { test_action } from "@/app/server.actions"
import ExerciseBankForm from "./exercise_bank_form"

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
	<ExerciseBankForm exercise_bank={exercise_bank}/>
	<CreateExercise/>
      </DialogContent>
    </Dialog>
  );
}

