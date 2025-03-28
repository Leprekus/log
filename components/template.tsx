import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import ExerciseBank from "./exercise_bank"
import { Input } from "./ui/input"
import { Label } from "@radix-ui/react-label";

export default function Template () {
	return (
		<Drawer>
		  	<DrawerTrigger asChild>
				<Button>Create template</Button>
			</DrawerTrigger>
		  <DrawerContent>
		    <DrawerHeader>
		      <DrawerTitle>Edit Template</DrawerTitle>
		      <DrawerDescription>Pick the exercises for this template.</DrawerDescription>
		    </DrawerHeader>
			<div className="grid gap-4 p-4">
			  <div className="grid grid-rows-4 items-center gap-3">
			    <Label htmlFor="templatename" className="text-right justify-self-start">
			      Template Name
			    </Label>
			    <Input name="templatename" type="text" placeholder="Push" className="col-span-3"/>
			    </div>
			</div>

		    <DrawerFooter>
		      <ExerciseBank/>
		      <Button>Create</Button>
		      <DrawerClose asChild>
			<Button variant="outline">Cancel</Button>
		      </DrawerClose>
		    </DrawerFooter>
		  </DrawerContent>
		</Drawer>
	);
}
