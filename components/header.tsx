interface HeaderProps { title: string };
export default function Header({ title }: HeaderProps ){
	return <h2 className="text-foreground font-semibold">{ title }</h2>
}
