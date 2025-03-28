'use server'

import { createClient } from "@/lib/supabase/server"

export const create_template = async () => {
}

export const get_exercise_bank = async () => {
	const supabase = await createClient();
	return await supabase.from('exercise').select('name').limit(20);
}

export const create_exercise = async (formData: FormData) => {
	const name = formData.get('name') as string;
	const supabase = await createClient();
	const res = await supabase.from('exercise').insert({ name });
	console.log(res.status, res.statusText);
}
