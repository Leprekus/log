import { get_workout } from "@/app/queries.actions";
import Exercise from "@/components/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";
interface WorkoutRouteParams { params: { id: string } };
export default async function WorkoutRoute({ params }: WorkoutRouteParams) {
  const { id } = await params;
  const  { data: workout, error } = await get_workout( id );
  console.log({ workout, error });
  if(error) //TODO: handle error
  	return <p>error</p>

  return (
	  <div className="lg:px-4">
 		<ScrollArea className=" lg:max-h-96 red-400 w-full overflow-x-hidden overflow-y-auto px-8 grid">
	  	{workout.map( e => <Exercise key={e.exerciseid} title={e.name} id={e.exerciseid} />)}
		</ScrollArea>
	  </div>
     );
}
