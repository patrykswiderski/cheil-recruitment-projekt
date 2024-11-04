interface HeaderProps {
	label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => {
	return (
		<h1 className="flex justify-center font-bold text-3xl xs:text-2.5xl pb-[10px] bg-white">
			{label}
		</h1>
	);
};

export default Header;
