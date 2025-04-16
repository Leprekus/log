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
import { ChevronDown } from "lucide-react";
import Item from "./item";
import { Select, SelectContent, SelectTrigger, SelectGroup, SelectLabel, SelectItem, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface ExerciseRecordProps { n: number };
function ExerciseRecord ({ n }: ExerciseRecordProps) {
	return(
	   <TableRow key={`${ Date.now() }`} className="grid grid-cols-4 justify-between">
	      <TableCell className="flex items-center justify-center font-medium"><span className="rounded-md">{ n }</span></TableCell>
	      <TableCell className="flex items-center justify-center text-center"><Input className="w-40" type="number" placeholder="0"/></TableCell>
	      <TableCell className="flex items-center justify-center text-right"><Input  className="w-40"type="number" placeholder="0"/></TableCell>
	      <TableCell className="flex items-center justify-center text-right"><Checkbox/></TableCell>
	    </TableRow>

	);
};

interface ExerciseProps { title: string, id: string };
export default function Exercise({ title, id }:ExerciseProps){
	const [ units, setUnits ] = useState<'lbs' | 'kg'>('kg');
	const [ exerciseRecords, setExerciseRecords ] = useState<ReactNode[]>([ <ExerciseRecord n={1} key={ Date.now() }/> ]);
	const [ isCollapsed, setIsCollapsed ] = useState(false);
	const add_record = () => {
		setExerciseRecords( prev => 
				   [ ...prev, <ExerciseRecord n={ prev.length + 1} key={Date.now()} /> ]
				  );
	 };
	return (
	<div>
	    <div className="flex justify-between h-14 items-center transition-all hover:bg-accent rounded-md px-4" onClick={()=>setIsCollapsed(!isCollapsed)}>
	    <Header title={title}/>
	    <span ><ChevronDown className={`transition-all ${ isCollapsed ? "rotate-180 text-muted-foreground" : "text-muted-accent"}` }/></span> 
	    </div>	
	    <hr className="w-full"/>
		<div className={ `transition-all ${isCollapsed ? "h-0" : "size-fit"} overflow-hidden w-full` }>
			<Table>
			<TableHeader>
			    <TableRow className="grid grid-cols-4">
			      <TableHead className="flex items-center justify-center">Set Number</TableHead>
			      <TableHead className="flex items-center justify-center text-center">{ units }</TableHead>
			      <TableHead className="flex items-center justify-center text-center">Reps</TableHead>
			      <TableHead className="flex items-center justify-center text-right">Completed</TableHead>
			    </TableRow>
			  </TableHeader>
			  </Table>
			<div className="min-h-48 /*max--h--48*/ h-[90vh] lg:max-h-64 lg:min-h-64 overflow-y-auto">
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

export function ExerciseTemplate ({ title, id }:ExerciseProps){
	return <Item title={title} id={title}>	
		<input type="text" name="exerciseid" value={id} className="hidden" readOnly/>
		<Input type="number" className="w-20 lg:min-w-48" name="numberofsets" placeholder="0"/>
		<Select name="units">
	              <SelectTrigger className="min-w-[100px] lg:min-w-48">
			<SelectValue placeholder="kg/lbs" />
		      </SelectTrigger>
		      <SelectContent>
			<SelectGroup>
			  <SelectLabel>Units</SelectLabel>
			  <SelectItem value="kg">kg</SelectItem>
			  <SelectItem value="lbs">lbs</SelectItem>
			</SelectGroup>
		      </SelectContent>		
		</Select>
	</Item>
};


