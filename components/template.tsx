'use server'
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
import TemplateClient from "./template_client";
import { test_action } from "@/app/server.actions";
import { create_template } from "@/app/queries.actions";

export default async function Template () {
	return (
		<Drawer direction="bottom">
		  	<DrawerTrigger asChild>
				<Button>Create template</Button>
			</DrawerTrigger>
		  <DrawerContent className="">
		    <DrawerHeader>
		      <DrawerTitle>Edit Template</DrawerTitle>
		      <DrawerDescription>Pick the exercises for this template.</DrawerDescription>
		    </DrawerHeader>
		        <TemplateClient/>
		    <DrawerFooter>
		      <Button form="template-form" type="submit">Create Template</Button>
		      <ExerciseBank/>
		      <DrawerClose asChild>	
			<Button variant="outline">Cancel</Button>
		      </DrawerClose>
		    </DrawerFooter>
		  </DrawerContent>
		</Drawer>
	);
}
