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

interface ExerciseRecordProps { n: number };
function ExerciseRecord ({ n }: ExerciseRecordProps) {
	return(
	   <TableRow key={`${self.crypto.randomUUID()}`}>
	      <TableCell className="font-medium"><span className="rounded-md shadow-red-500">{ n }</span></TableCell>
	      <TableCell className="text-center"><Input type="number" placeholder="0"/></TableCell>
	      <TableCell className="text-right"><Input type="number" placeholder="0"/></TableCell>
	    </TableRow>

	);
};

interface ExerciseProps { title: string };
export default function Exercise({ title }:ExerciseProps){
	const [ units, setUnits ] = useState<'lbs' | 'kg'>('kg');
	const [ exerciseRecords, setExerciseRecords ] = useState<ReactNode[]>([ <ExerciseRecord n={1} key={self.crypto.randomUUID()}/> ]);
	const add_record = () => {
		setExerciseRecords( prev => 
				   [ ...prev, <ExerciseRecord n={ prev.length + 1} key={self.crypto.randomUUID()} /> ]
				  );
	 };
	return (
	<div>
	<Header title={title}/>
	<Table>
	  <TableCaption>A list of your recent invoices.</TableCaption>
	  <TableHeader>
	    <TableRow>
	      <TableHead className="w-[100px]">Set Number</TableHead>
	      <TableHead className="text-center">{ units }</TableHead>
	      <TableHead className="text-right">Reps</TableHead>
	    </TableRow>
	  </TableHeader>
	  <TableBody>
	  { exerciseRecords }
	  </TableBody>
	</Table>
	  <Button  onClick={add_record}>Add set +</Button>
	</div>
	);
};
