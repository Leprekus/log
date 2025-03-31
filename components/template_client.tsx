'use client'

import { select_exercises, select_is_template_store_dirty, useTemplateStore } from "@/hooks/useTemplateStore"
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { FormEvent, useEffect } from "react";
import { ExerciseTemplate } from "./exercise";
import Header from "./header";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import { validate_number } from "@/lib/utils";

export default function TemplateClient() {
	const is_template_store_dirty = useTemplateStore(select_is_template_store_dirty);
	const exercises = useTemplateStore(select_exercises);
	useEffect(() =>{
		const unload_handler = () => '';
		if(is_template_store_dirty)
			window.onbeforeunload = unload_handler 		
			return () => window.removeEventListener('beforeunload', unload_handler);
	}, [ is_template_store_dirty ])

	//inserts to 3 different tables: templates, exercises, and workouts
	//templates creates name and frequency
	//exercises are updated with the new values
	//workouts maps templateid -> exerciseid
	const create_template = (event: FormEvent<HTMLFormElement>) =>  {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const [ templatename ] = formData.getAll('templatename');
		const exerciseid = formData.getAll('exerciseid');
		const units = formData.getAll('units');
		const numberofsets = formData.getAll('numberofsets');

		if(!(exerciseid.length === units.length && units.length === numberofsets.length))
			throw Error('Number of entries does not match'); //TODO: handle this

		const entries = exerciseid.map((id, i) => ({ 
			templateid: '',
			exerciseid: id,  
			units: (units[i] === "kg" || units[i] === "lbs") ? units[i]: "kg",
			numberofsets: validate_number(numberofsets[i] as string), //returns 0 if NaN or value is less than 0 otherwise returns an int
		}));

		console.log(entries);
		
	};
		
	return (
		<form onSubmit={create_template} name="template-form" className="grid gap-4 p-4">
			  <div className="grid grid-rows-2 items-center gap-3">
			    <Label htmlFor="templatename" className="text-right justify-self-start">
			      Template Name
			    </Label>
			    <Input required name="templatename" type="text" placeholder="Push" className="col-span-3"/>
			    </div>
			    <Header title="Exercises"/>
		<ScrollArea className="max-h-80 lg:max-h-96 overflow-auto px-10 lg:px-40">
		{ exercises.length === 0 ? null : 
		  exercises.map((e) => 
				<ExerciseTemplate key={e.exerciseid} title={e.name} id={e.exerciseid}/>
			       )
		}	
		</ScrollArea>
		<Button type="submit">Create Template</Button>
		</form>
	)
};
