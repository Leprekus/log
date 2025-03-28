import Template from "@/components/template";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function Home() {
	 const supabase = await createClient();
	 const { data, error } = await supabase.auth.getUser();
	 if(error || !data?.user)
	 	redirect('/login');

	const templates = await supabase.from('templates').select('name, frequency');
	if(templates.data?.length === 0)
		return <Template/>
	return <div> home </div>

}

