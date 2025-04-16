'use client'
import { ExerciseRecords } from "@/app/queries.actions";
import Exercise from "@/components/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";
import { database } from "@/database.types";
import { select_is_workout_store_dirty, start_workout, useWorkoutStore } from "@/hooks/useWorkoutStore";
import { useEffect } from "react";

type Exercise = database['public']['tables']['exercise']['row'];
interface WorkoutClientInterface { workout: Exercise[] };
export default function WorkoutClient({ workout }: WorkoutClientInterface)  {
	const dispatch_start_workout = start_workout(useWorkoutStore());
	const is_workout_dirty = useWorkoutStore(select_is_workout_store_dirty);
	useEffect(() => {
		const unload_handler = () => '';
		if(is_workout_dirty)
			window.onbeforeunload = unload_handler 		
			return () => window.removeEventListener('beforeunload', unload_handler);

	
	}, [ is_workout_dirty ]);
	return <div className="lg:px-4">
 		<ScrollArea className=" lg:max-h-96 red-400 w-full overflow-x-hidden overflow-y-auto px-8 grid">
	  	{workout.map( e => <Exercise key={e.exerciseid} title={e.name} id={e.exerciseid} />)}
		</ScrollArea>
	
	  </div>
;
}
