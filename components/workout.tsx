import { get_templates, get_todays_template } from "@/app/queries.actions";
import Template, { TemplateSelect } from "./template";
import Link from "next/link";

export default async function Workout() {
	const { data: todays_templates, error } = await get_todays_template();
	if (error) //TODO: handle error
		return null
	if(todays_templates.length < 1)
		return <div>
			<p className="text-muted-foreground">No template scheduled today.</p>
			<TemplateSelect/>	
			<Template/>
		</div>
	
	console.log(todays_templates);
	return  <div>
		<h1 className="font-bold">Workouts</h1>
		{
		todays_templates.map( t => 
			<Link href={ 'workout/' + t.templateid } key={t.templateid}>
			{Object.values(t).map(v => <p key={v}>{v}</p>)}
			</Link>
			)
		}
		<TemplateSelect/>
	</div>;
};
