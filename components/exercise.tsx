'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import { Button } from "./ui/button";
import { ReactNode } from 'react';
import { Input } from "./ui/input";
import Header from "./header";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ChevronDown } from "lucide-react";

interface ExerciseRecordProps { n: number };
function ExerciseRecord ({ n }: ExerciseRecordProps) {
	return(
	   <TableRow key={`${self.crypto.randomUUID()}`}>
	      <TableCell className="font-medium"><span className="rounded-md">{ n }</span></TableCell>
	      <TableCell className="text-center"><Input type="number" placeholder="0"/></TableCell>
	      <TableCell className="text-right"><Input type="number" placeholder="0"/></TableCell>
	    </TableRow>

	);
};

interface ExerciseProps { title: string };
export default function Exercise({ title }:ExerciseProps){
	const [ units, setUnits ] = useState<'lbs' | 'kg'>('kg');
	const [ exerciseRecords, setExerciseRecords ] = useState<ReactNode[]>([ <ExerciseRecord n={1} key={self.crypto.randomUUID()}/> ]);
	const [ isCollapsed, setIsCollapsed ] = useState(false);
	const add_record = () => {
		setExerciseRecords( prev => 
				   [ ...prev, <ExerciseRecord n={ prev.length + 1} key={self.crypto.randomUUID()} /> ]
				  );
	 };
	return (
	<div>
	    <div className="flex justify-between h-12 items-center transition-all hover:bg-accent rounded-md px-4" onClick={()=>setIsCollapsed(!isCollapsed)}>
	    <Header title={title}/>
	    <span ><ChevronDown className={`transition-all text-muted-foreground ${ isCollapsed ? "rotate-180" : ""}` }/></span> 
	    </div>	
	    <hr className="w-full"/>
		<div className={ `transition-all ${isCollapsed ? "h-0" : "size-fit"} overflow-hidden w-full` }>
			<Table>
			<TableHeader>
			    <TableRow>
			      <TableHead className="w-[100px]">Set Number</TableHead>
			      <TableHead className="text-center">{ units }</TableHead>
			      <TableHead className="text-right">Reps</TableHead>
			    </TableRow>
			  </TableHeader>
			  </Table>
			<div className="min-h-48 max-h-48 lg:max-h-64 lg:min-h-64 overflow-y-auto">
			<Table className="">
			  <TableCaption>A list of your recent invoices.</TableCaption>
			  <TableBody className="">
			      { exerciseRecords }
			  </TableBody>
			</Table>
			</div>
			<div className="w-fit mx-auto"><Button  onClick={add_record} size="sm">Add set +</Button></div>
		</div>
	</div>
	);
};
