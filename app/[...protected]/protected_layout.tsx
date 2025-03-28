import { ReactNode } from "react";

interface ProtectedLayoutProps { children: ReactNode };

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function ProtectedLayout({ children }: ProtectedLayoutProps){
	 const supabase = await createClient();
	 const { data, error } = await supabase.auth.getUser();
	 if(error || !data?.user)
	 	redirect('/login');
	return { children };
	
}
