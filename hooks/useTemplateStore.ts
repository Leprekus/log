import { Exercise } from '@/app/queries.actions'
import { create } from 'zustand'

interface TemplateState {
  exercise_ids: string[]; 
  add_exercise_ids: (e: string[]) => void
}

export const useTemplateStore = create<TemplateState>()((set) => ({
  exercise_ids: [],
  add_exercise_ids: (e) => set((state) => ({ exercise_ids: [ ...new Set([ ...state.exercise_ids, ...e ]) ]})),
}))
