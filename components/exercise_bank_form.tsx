'use client'
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import Item from "./item";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Exercise } from "@/app/queries.actions";
import { FormEvent, FormEventHandler } from "react";
import { useTemplateStore } from "@/hooks/useTemplateStore";

interface ExerciseBankFormProps { exercise_bank: Exercise[] };
export default function ExerciseBankForm({ exercise_bank }: ExerciseBankFormProps) {
	const templateStore = useTemplateStore();
	const submit_handler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const ids: string[] = [ ...formData.values() ] as string[];
		templateStore.add_exercise_ids(ids);
	}
	return (
	<form onSubmit={submit_handler}> <div className="grid gap-4 py-4">
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

