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
import TemplateClient from "./template_client";

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
		        <TemplateClient/>
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
