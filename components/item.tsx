import { test_action } from "@/app/server.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

// value, name = key, value
// the id in checkbox is used to propagate a click on label to select the checkbox
interface ItemProps { title : string, id: string, children?: ReactNode };
export default function Item({ title, id, children }: ItemProps) {
	return <label htmlFor={id} className="w-full hover:bg-accent transition-all py-3 px-2 rounded-md  gap-4 grid grid-cols-3 items-center">
			<input type="text" className="
			font-semibold focus:outline-none focus:ring-0
			hover:outline-none hover:ring-0 cursor-default
			pointer-events-none" readOnly value={ title }/>
			{ children }
		</label>
}
