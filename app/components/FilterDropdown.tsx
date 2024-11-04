import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
	value: string;
	label: string;
}

interface FilterDropdownProps {
	title: string;
	options: Option[];
	selectedValues: string[] | string | null;
	onSelect: (value: string) => void;
	isMulti?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
	title,
	options,
	selectedValues,
	onSelect,
	isMulti = false,
}) => {
	const [open, setOpen] = useState(false);

	const displayText = () => {
		if (
			!selectedValues ||
			(Array.isArray(selectedValues) && selectedValues.length === 0)
		) {
			return "Pokaż wszystkie";
		} else if (Array.isArray(selectedValues)) {
			return `${selectedValues.length} wybranych`;
		} else {
			const selectedOption = options.find(
				(opt) => opt.value === selectedValues
			);
			return selectedOption ? selectedOption.label : "Pokaż wszystkie";
		}
	};

	const handleSelect = (value: string) => {
		onSelect(value);
		if (!isMulti) {
			setOpen(false);
		}
	};

	return (
		<div className="flex flex-col justify-start w-full max-w-[249px] mx-8 sm:mx-auto md:mx-0">
			<h3 className="font-bold text-lg leading-[22px] h-full max-h-[20px] mb-[7px]">
				{title}
			</h3>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="flex justify-between items-bottom border-none rounded-none h-full max-h-[36px] pl-3 text-sm+ "
					>
						{displayText()}
						<Image
							src="/assets/icons/chevronDown.svg"
							width={13}
							height={13}
							alt="arrow down icon"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-48 xs:max-w-[249px] md:max-w-52 lg:max-w-[249px] border-none rounded-none p-0 shadow-xs mt-1">
					<Command className="rounded-none">
						<CommandList className="rounded-none">
							<CommandEmpty>Brak danych</CommandEmpty>
							<CommandGroup className="p-0">
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={() => handleSelect(option.value)}
										className={`text-xs leading-[18px] hover:bg-hoverGray w-full h-full max-h-[40px] border-none pl-4 ${
											isMulti &&
											Array.isArray(selectedValues) &&
											selectedValues.includes(option.value)
												? "bg-hoverGray"
												: ""
										}`}
									>
										{option.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FilterDropdown;
