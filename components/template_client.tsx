'use client'

import { useTemplateStore } from "@/hooks/useTemplateStore"

export default function TemplateClient() {
	const exercise_ids: string[] = useTemplateStore().exercise_ids;

	if(exercise_ids.length === 0)
		return null
	return (
		<>
		{exercise_ids.map((e:string) => <div key={e}>{e}</div>)}	
		</>
	)
};
