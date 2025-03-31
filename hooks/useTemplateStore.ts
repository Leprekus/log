import { Exercise, TemplateType } from '@/app/queries.actions'
import { create } from 'zustand'

interface TemplateState {
  exercises: { [id: string]: Exercise }; 
  dirty: boolean
  set_dirty: (b: boolean) => void
  add_exercises: (e: Exercise[]) => void
  
}

export const useTemplateStore = create<TemplateState>()((set, get) => ({
  exercises: {},
  dirty: false,
  set_dirty: (b) => set((state) => ({ dirty: b })),
  add_exercises: (exercises) => set((state) => {
		exercises.forEach(e => {
			if(!state.exercises[ e.exerciseid ])
				state.exercises[ e.exerciseid ] = e;
		});	
		return state.exercises;
	}),
}))

export const save_exercises = (state:TemplateState) => (exercises: Exercise[]) => {
	state.set_dirty(true);
	state.add_exercises(exercises);
};
export const select_exercises = (state: TemplateState) => state.exercises;
export const select_is_template_store_dirty = (state:TemplateState) => state.dirty;
