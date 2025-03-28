import { Exercise } from '@/app/queries.actions'
import { create } from 'zustand'

interface TemplateState {
  exercises: Exercise[]; 
  dirty: boolean
  set_dirty: (b: boolean) => void
  add_exercises: (e: Exercise[]) => void
}

export const useTemplateStore = create<TemplateState>()((set) => ({
  exercises: [],
  dirty: false,
  set_dirty: (b) => set((state) => ({ dirty: b })),
  add_exercises: (e) => set((state) => {
		const M: { [id: string]: Exercise } = {};
		for(const k of state.exercises){
			if(!M[k.exerciseid])
				M[k.exerciseid] = k;
		}
		for(const  k of e){
			if(!M[k.exerciseid])
				M[k.exerciseid] = k;
		}
		return { exercises: Object.values(M) }
	})
}))

export const save_exercises = (state:TemplateState) => (exercises: Exercise[]) => {
	state.set_dirty(true);
	state.add_exercises(exercises);
};
export const select_exercises = (state:TemplateState) => state.exercises;
export const select_is_template_store_dirty = (state:TemplateState) => state.dirty;
