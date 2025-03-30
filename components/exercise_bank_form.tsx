'use client'
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import Item from "./item";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Exercise } from "@/app/queries.actions";
import { FormEvent } from "react";
import { save_exercises, useTemplateStore } from "@/hooks/useTemplateStore";

interface ExerciseBankFormProps { exercise_bank: Exercise[] };
export default function ExerciseBankForm({ exercise_bank }: ExerciseBankFormProps) {
	const dispatch_save_exercise = save_exercises(useTemplateStore());
	const submit_handler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const exercises = [ ...formData.entries() ]
			.map(([k, v]) => ({ name: k, exerciseid: v }) ) as Exercise[];
		dispatch_save_exercise(exercises);
	}
	return (
	<form onSubmit={submit_handler}> 
	<div className="grid gap-4 py-4 max-h-[425px] overflow-auto mb-2">
		{ exercise_bank.length < 1 ?
			<DialogDescription> No exercises Found </DialogDescription> :
		  exercise_bank === null ? 
		  	<div> Could not load. <button> Retry </button></div> :
		  exercise_bank.map( e => <Item key={e.name+e.exerciseid} title={e.name} id={e.exerciseid}/>)
		}	
        </div>
        <DialogFooter>
	  <DialogClose asChild>
          <Button type="submit">Save changes</Button>
	  </DialogClose>
        </DialogFooter>
	</form>
	);
}

