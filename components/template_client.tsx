'use client'

import { select_exercises, select_is_template_store_dirty, useTemplateStore } from "@/hooks/useTemplateStore"
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { FormEvent, useEffect } from "react";
import Exercise, { ExerciseTemplate } from "./exercise";
import Header from "./header";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { validate_frequency, validate_number, validate_units } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ExerciseRecords, TemplateType } from "@/app/queries.actions";
import { Checkbox } from "./ui/checkbox";
import { DrawerDescription } from "./ui/drawer";

export default function TemplateClient() {
	const is_template_store_dirty = useTemplateStore(select_is_template_store_dirty);
	const exercise_map = useTemplateStore(select_exercises);
	const exercises = Object.values( exercise_map );
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
	const create_template = async (event: FormEvent<HTMLFormElement>) =>  {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const templatename = formData.get('templatename') as string;
		const frequency = validate_frequency(formData.getAll("frequency") as string[]);
		const exerciseid = formData.getAll('exerciseid');
		const units = formData.getAll('units');
		const numberofsets = formData.getAll('numberofsets');

		if(!(exerciseid.length === units.length && units.length === numberofsets.length))
			throw Error('Number of entries does not match'); //TODO: handle this

		const exercises_r = exerciseid.map((id, i):ExerciseRecords => ({ 
			exerciseid: id as string,  
			exercisename: exercise_map[id as string].name,
			deleted: false,
			units:  validate_units(units[i] as string),
			numberofsets: validate_number(numberofsets[i] as string), //returns 0 if NaN or value is less than 0 otherwise returns an int
		}));
		const template:TemplateType = {
			input_userid: '',
			input_templatename: templatename,
			input_frequency: frequency,
			exercises_r: exercises_r
		};
		
		const body = JSON.stringify(template);
		console.log(body);
		const res = await fetch('/api/template', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body
			});
		const data = await res.json();	
		console.log(data);
	};
		
	return (
		<ScrollArea className="h-full overflow-x-hidden overflow-y-auto">
		<form onSubmit={create_template} id="template-form" className="min-h-[375px] max-h[375px] lg:min-h[672px] lg:max-h[672px] grid gap-4 p-4">
			  <div className="grid grid-rows-2 items-center gap-3">
			    <Label htmlFor="templatename" className="text-right justify-self-start">
			      Template Name
			    </Label>
			    <Input required name="templatename" type="text" placeholder="Push" className="col-span-3"/>
			    </div>
			    <Header title="Exercises"/>
			    <div className="grid grid-cols-3 justify-center lg:px-40">
			    	<Label>Title</Label>
				<Label>Number of sets</Label>
				<Label>Units</Label>
			    </div>
		<ScrollArea className="h-56 lg:max-h-96 red-400 w-full overflow-x-hidden overflow-y-auto lg:px-40">
		{ exercises.length === 0 ? <DrawerDescription>Add or Create an exercise to get started</DrawerDescription> : 
		  exercises.map((e) => 
				<ExerciseTemplate key={e.exerciseid} title={e.name} id={e.exerciseid}/>
			       )
		}	
		</ScrollArea>
			<Header title="Frequency"/>
			<div className="lg:px-40">
			<ToggleGroup type="multiple">
				<ToggleGroupItem className="size-12 relative" value="MON">
				         M
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="M" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="TUE">
					T
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="T" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="WED">
					W
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="W" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="THU">
					R
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="R" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="FRI">
					F
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="F" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="SAT">
					S
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="S" /> 
				</ToggleGroupItem>
				<ToggleGroupItem className="size-12 relative" value="SUN">
					U
					<input type="checkbox" className="absolute inset-0 opacity-0"  name="frequency" value="U" /> 
				</ToggleGroupItem>
			</ToggleGroup>
			</div>

		</form>
		</ScrollArea>
	)
};
