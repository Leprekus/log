import CreateExercise from "@/components/create_exercise";
import ExerciseBank from "@/components/exercise_bank";
import Template from "@/components/template";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function Home() {
	 const supabase = await createClient();
	 const { data, error } = await supabase.auth.getUser();
	 if(error || !data?.user)
	 	redirect('/login');

	return <div> 
		<CreateExercise/>
		<ExerciseBank/>
		<Template/>
	      </div>

}

