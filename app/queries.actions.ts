'use server'

import { Database } from "@/database.types";
import { createClient } from "@/lib/supabase/server"
import { SupabaseClient, User } from "@supabase/supabase-js";

type SupabaseAndUserPromise = Promise<[ SupabaseClient<Database, 'public'>, User ]>
const get_client_and_user = async ():SupabaseAndUserPromise => {
	const supabase: SupabaseClient<Database, 'public'> = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser()
	if(error || !user) throw Error('No User Found'); //TODO: handle error
	return [ supabase, user ];
};


export interface ExerciseRecords {
	exerciseid: string,
	exercisename: string,
	numberofsets: number,
	units: boolean,
	deleted: boolean,
	};
export interface TemplateType {
	input_userid: string,
	exercises_r: ExerciseRecords[],
	input_templatename: string,
	input_frequency: number,
}
export const create_template = async (t: TemplateType) => {
	const [ supabase, user ] = await get_client_and_user();
	t.input_userid = user.id;
	const res = await supabase.rpc('create_template', t);
	if(res.error)
		console.log(res.error, res.statusText)
	else console.log(res.data);
}

export type Exercise = { name: string, exerciseid: string };
export const get_exercise_bank = async (): Promise<Exercise[]> => {
	//const supabase = await createClient();
	const [ supabase, user ] = await get_client_and_user();
	const { data, error } = await supabase.from('exercise').select('name, exerciseid').limit(20);
	if(error) throw Error('Failed to get exercises'); //TODO: handle error
	return data;
};

export const create_exercise = async (formData: FormData) => {
	const [ supabase, user ] = await get_client_and_user();
	const name = formData.get('name') as string;
	const res = await supabase.from('exercise').insert({ userid: user.id, name });
	console.log(res.status, res.statusText);
};


