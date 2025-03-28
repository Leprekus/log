'use client'

import { Exercise } from "@/app/queries.actions";
import { useTemplateStore } from "@/hooks/useTemplateStore"

export default function TemplateClient() {
	const exercises: Exercise[] = useTemplateStore().exercises;

	if(exercises.length === 0)
		return null
	console.log(exercises);
	return (
		<>
		{exercises.map((e) => <div key={e.exerciseid}>{e.name}</div>)}	
		</>
	)
};
