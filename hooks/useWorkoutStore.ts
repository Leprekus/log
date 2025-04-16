import { Exercise, TemplateType } from '@/app/queries.actions'
import { create } from 'zustand'

interface WorkoutState {
  exercises: { [id: string]: Exercise }; 
  dirty: boolean
  set_dirty: (b: boolean) => void
  add_exercises: (e: Exercise[]) => void
  
}

export const useWorkoutStore = create<WorkoutState>()((set, get) => ({
  exercises: {},
  dirty: true,
  set_dirty: (b) => set((state) => ({ dirty: b })),
  add_exercises: (exercises) => set((state) => {
		exercises.forEach(e => {
			if(!state.exercises[ e.exerciseid ])
				state.exercises[ e.exerciseid ] = e;
		});	
		return state.exercises;
	}),
}))

export const start_workout = (state:WorkoutState) => () => {
	state.set_dirty(true);
};

export const select_exercises = (state: WorkoutState) => state.exercises;
export const select_is_workout_store_dirty = (state:WorkoutState) => state.dirty;
