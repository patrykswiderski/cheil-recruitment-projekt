interface HeaderProps {
	label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => {
	return (
		<h1 className="flex justify-center font-bold text-3xl xxs:text-4xl xs:text-4.5xl pb-[10px] bg-white">
			{label}
		</h1>
	);
};

export default Header;
