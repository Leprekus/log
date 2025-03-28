import { Exercise } from '@/app/queries.actions'
import { create } from 'zustand'

interface TemplateState {
  exercises: Exercise[]; 
  add_exercises: (e: Exercise[]) => void
}

export const useTemplateStore = create<TemplateState>()((set) => ({
  exercises: [],
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
