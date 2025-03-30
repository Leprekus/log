'use client'

import { select_exercises, select_is_template_store_dirty, useTemplateStore } from "@/hooks/useTemplateStore"
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { ExerciseTemplate } from "./exercise";
import Header from "./header";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function TemplateClient() {
	const is_template_store_dirty = useTemplateStore(select_is_template_store_dirty);
	const exercises = useTemplateStore(select_exercises);
	useEffect(() =>{
		const unload_handler = () => '';
		if(is_template_store_dirty)
			window.onbeforeunload = unload_handler 		
			return () => window.removeEventListener('beforeunload', unload_handler);
	}, [ is_template_store_dirty ])
	return (
		<div className="grid gap-4 p-4">
			  <div className="grid grid-rows-2 items-center gap-3">
			    <Label htmlFor="templatename" className="text-right justify-self-start">
			      Template Name
			    </Label>
			    <Input name="templatename" type="text" placeholder="Push" className="col-span-3"/>
			    </div>
			    <Header title="Exercises"/>
		<ScrollArea className="max-h-80 lg:max-h-96 overflow-auto px-10 lg:px-40">
		{ exercises.length === 0 ? null : 
		  exercises.map((e) => 
				<ExerciseTemplate key={e.exerciseid} title={e.name}/>
			       )
		}	
		</ScrollArea>
		</div>
	)
};
