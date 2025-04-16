import { get_workout } from "@/app/queries.actions";
import Exercise from "@/components/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";
import WorkoutClient from "./components/workout_client";
interface WorkoutRouteParams { params: { id: string } };
export default async function WorkoutRoute({ params }: WorkoutRouteParams) {
  const { id } = await params;
  const  { data: workout, error } = await get_workout( id );
  console.log({ workout, error });
  if(error) //TODO: handle error
  	return <p>error</p>

  return <WorkoutClient workout={workout}/>;

}
