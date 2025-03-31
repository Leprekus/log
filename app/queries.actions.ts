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


export const create_template = async (formData: FormData) => {
	console.log(...formData.entries());
	const data = [ ...formData.values() ];
	console.log(data);
	const [ supabase, user ] = await get_client_and_user();
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


