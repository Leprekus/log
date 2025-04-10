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
import { create_template, get_templates } from "@/app/queries.actions";
import { Dialog, DialogClose, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "./ui/dialog";
import Item from "./item";
import Link from "next/link";

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

export async function TemplateSelect() {
	const { data: templates, error } = await get_templates();

	if(error) // TODO: handle error
		return null;

	if(templates.length < 1)
		return null;
		return (
	<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Templates</DialogTitle>
          <DialogDescription>
            Choose your template here.
          </DialogDescription>
	 <div className="grid gap-3 py-4 max-h-[50vh] overflow-auto mb-2">
		  {
		  templates.map( t =>	<DialogClose key={t.templateid} asChild> 
		  			<Link href={ 'workout/' + t.templateid }>
		  			<Item  title={t.name} id={t.templateid}>
					  	{/*TODO: add check icon <Check className="text-muted-foreground"/>*/}
		 			  </Item>
					  </Link>
					  </DialogClose>
					  )
		}	
        </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
	);
	
}
