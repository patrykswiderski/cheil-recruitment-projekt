"use client";
import { useState, ChangeEvent, useMemo, useEffect } from "react";
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
import { washingMachines } from "../data/devices";

interface SortOption {
	value: string;
	label: string;
}

const sortOptions: SortOption[] = [
	{ value: "all", label: "Wszystkie" },
	{ value: "price", label: "Cena" },
	{ value: "popularity", label: "Popularność" },
	{ value: "capacity", label: "Pojemność" },
];

const SearchDevice: React.FC = () => {
	const [searchInput, setSearchInput] = useState<string>("");
	const [itemsToShow, setItemsToShow] = useState<number>(6);
	const [openSort, setOpenSort] = useState(false);
	const [openFunctions, setOpenFunctions] = useState(false);
	const [openEco, setOpenEco] = useState(false);
	const [openCapacity, setOpenCapacity] = useState(false);
	const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
	const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
	const [selectedEnergyClass, setSelectedEnergyClass] = useState<string[]>([]);
	const [selectedCapacity, setSelectedCapacity] = useState<string[]>([]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	const handleSortSelect = (value: string) => {
		const sortOption =
			sortOptions.find((option) => option.value === value) || null;
		setSelectedSort(sortOption);
		setOpenSort(false);
	};

	const uniqueFunctions = useMemo(() => {
		const functionsSet = new Set<string>();
		washingMachines.forEach((machine) => {
			machine.functions.forEach((func) => functionsSet.add(func));
		});
		return Array.from(functionsSet);
	}, []);

	const handleFunctionSelect = (value: string) => {
		if (value === "all") {
			setSelectedFunctions([]);
		} else {
			setSelectedFunctions((prev) =>
				prev.includes(value)
					? prev.filter((func) => func !== value)
					: [...prev, value]
			);
		}
		setOpenFunctions(false);
	};

	const uniqueEnergyClasses = useMemo(() => {
		const energySet = new Set<string>();
		washingMachines.forEach((machine) => {
			energySet.add(machine.energyClass);
		});
		return Array.from(energySet);
	}, []);

	const handleEnergyClassSelect = (value: string) => {
		if (value === "all") {
			setSelectedEnergyClass([]);
		} else {
			setSelectedEnergyClass((prev) =>
				prev.includes(value)
					? prev.filter((eco) => eco !== value)
					: [...prev, value]
			);
		}
		setOpenEco(false);
	};

	const uniqueCapacities = useMemo(() => {
		const capacitySet = new Set<string>();
		washingMachines.forEach((machine) => {
			capacitySet.add(machine.capacity);
		});
		return Array.from(capacitySet).sort(
			(a, b) => parseFloat(b) - parseFloat(a)
		);
	}, []);

	const handleCapacitySelect = (value: string) => {
		if (value === "all") {
			setSelectedCapacity([]);
		} else {
			setSelectedCapacity((prev) =>
				prev.includes(value)
					? prev.filter((capacity) => capacity !== value)
					: [...prev, value]
			);
		}
		setOpenCapacity(false);
	};

	const sortedAndFilteredWashingMachines = useMemo(() => {
		let filtered = washingMachines;

		if (searchInput.trim() !== "") {
			filtered = filtered.filter((machine) =>
				machine.name.toLowerCase().includes(searchInput.toLowerCase())
			);
		}

		if (selectedFunctions.length > 0) {
			filtered = filtered.filter((machine) =>
				selectedFunctions.every((func) => machine.functions.includes(func))
			);
		}

		if (selectedEnergyClass.length > 0) {
			filtered = filtered.filter((machine) =>
				selectedEnergyClass.includes(machine.energyClass)
			);
		}

		if (selectedCapacity.length > 0) {
			filtered = filtered.filter((machine) =>
				selectedCapacity.includes(machine.capacity)
			);
		}

		if (!selectedSort || selectedSort.value === "all") return filtered;

		const sorted = [...filtered];
		switch (selectedSort.value) {
			case "price":
				return sorted.sort((a, b) => a.price - b.price);
			case "popularity":
				return sorted.sort((a, b) => b.popularity - a.popularity);
			case "capacity":
				return sorted.sort((a, b) => {
					const capacityA = parseFloat(a.capacity);
					const capacityB = parseFloat(b.capacity);
					return capacityB - capacityA;
				});
			default:
				return sorted;
		}
	}, [
		searchInput,
		selectedSort,
		selectedFunctions,
		selectedEnergyClass,
		selectedCapacity,
	]);

	useEffect(() => {
		setItemsToShow(6);
	}, [sortedAndFilteredWashingMachines]);

	const handleShowMore = () => {
		setItemsToShow((prev) => prev + 6);
	};

	return (
		<div className="flex flex-col justify-center items-center max-w-[1046px] bg-lightGray min-w-full">
			<input
				type="text"
				placeholder="Search..."
				className="text-black bg-white outline-none px-3 py-2 placeholder:text-black"
				onChange={handleInputChange}
				value={searchInput}
				aria-label="Search input"
			/>
			<div className="flex justify-end gap-[18px] w-[1032px]">
				<div className="flex flex-col w-[249px] h-[36px]">
					<h3 className="font-bold text-lg leading-[22px]">Sortuj po:</h3>
					<Popover open={openSort} onOpenChange={setOpenSort}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openSort}
								className="flex justify-between items-bottom border-none pl-3"
							>
								{selectedSort ? selectedSort.label : "Pokaż wszystkie"}
								<Image
									src="/assets/icons/chevronDown.svg"
									width={13}
									height={13}
									alt="arrow down icon"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[249px] border-none rounded-none p-0 shadow-xs mt-1">
							<Command>
								<CommandList>
									<CommandEmpty>Brak danych</CommandEmpty>
									<CommandGroup className="p-0">
										{sortOptions.map((option) => (
											<CommandItem
												key={option.value}
												value={option.value}
												onSelect={(currentValue) =>
													handleSortSelect(currentValue)
												}
												className="text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4"
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

				<div className="flex flex-col w-[249px] h-[36px]">
					<h3 className="font-bold text-lg leading-[22px]">Funkcje:</h3>
					<Popover open={openFunctions} onOpenChange={setOpenFunctions}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openFunctions}
								className="flex justify-between items-bottom border-none pl-3"
							>
								{selectedFunctions.length > 0
									? `${selectedFunctions.length} wybranych`
									: "Pokaż wszystkie"}
								<Image
									src="/assets/icons/chevronDown.svg"
									width={13}
									height={13}
									alt="arrow down icon"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[249px] border-none rounded-none p-0 shadow-xs mt-1">
							<Command>
								<CommandList>
									<CommandEmpty>Brak danych</CommandEmpty>
									<CommandGroup className="p-0">
										<CommandItem
											key="all"
											value="all"
											onSelect={(currentValue) =>
												handleFunctionSelect(currentValue)
											}
											className="text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4"
										>
											Wszystkie
										</CommandItem>
										{uniqueFunctions.map((func) => (
											<CommandItem
												key={func}
												value={func}
												onSelect={(currentValue) =>
													handleFunctionSelect(currentValue)
												}
												className={`text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
													selectedFunctions.includes(func) ? "bg-hoverGray" : ""
												}`}
											>
												{func}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>

				<div className="flex flex-col w-[249px] h-[36px]">
					<h3 className="font-bold text-lg leading-[22px]">
						Klasa energetyczna:
					</h3>
					<Popover open={openEco} onOpenChange={setOpenEco}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openEco}
								className="flex justify-between items-bottom border-none pl-3"
							>
								{selectedEnergyClass.length > 0
									? `${selectedEnergyClass.length} wybranych`
									: "Pokaż wszystkie"}
								<Image
									src="/assets/icons/chevronDown.svg"
									width={13}
									height={13}
									alt="arrow down icon"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[249px] border-none rounded-none p-0 shadow-xs mt-1">
							<Command>
								<CommandList>
									<CommandEmpty>Brak danych</CommandEmpty>
									<CommandGroup className="p-0">
										<CommandItem
											key="all"
											value="all"
											onSelect={(currentValue) =>
												handleEnergyClassSelect(currentValue)
											}
											className="text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4"
										>
											Wszystkie
										</CommandItem>
										{uniqueEnergyClasses.map((energyClass) => (
											<CommandItem
												key={energyClass}
												value={energyClass}
												onSelect={(currentValue) =>
													handleEnergyClassSelect(currentValue)
												}
												className={`text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
													selectedEnergyClass.includes(energyClass)
														? "bg-hoverGray"
														: ""
												}`}
											>
												{energyClass}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>

				<div className="flex flex-col w-[249px] h-[36px]">
					<h3 className="font-bold text-lg leading-[22px]">Pojemność:</h3>
					<Popover open={openCapacity} onOpenChange={setOpenCapacity}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openCapacity}
								className="flex justify-between items-bottom border-none pl-3"
							>
								{selectedCapacity.length > 0
									? `${selectedCapacity.length} wybranych`
									: "Pokaż wszystkie"}
								<Image
									src="/assets/icons/chevronDown.svg"
									width={13}
									height={13}
									alt="arrow down icon"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="max-w-[249px] border-none rounded-none p-0 shadow-xs mt-1">
							<Command>
								<CommandList>
									<CommandEmpty>Brak danych</CommandEmpty>
									<CommandGroup className="p-0">
										<CommandItem
											key="all"
											value="all"
											onSelect={(currentValue) =>
												handleCapacitySelect(currentValue)
											}
											className="text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4"
										>
											Wszystkie
										</CommandItem>
										{uniqueCapacities.map((capacity) => (
											<CommandItem
												key={capacity}
												value={capacity}
												onSelect={(currentValue) =>
													handleCapacitySelect(currentValue)
												}
												className={`text-xs leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
													selectedCapacity.includes(capacity)
														? "bg-hoverGray"
														: ""
												}`}
											>
												{capacity}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<h4 className="text-right text-sm my-5">
				<span className="font-semibold">
					{sortedAndFilteredWashingMachines.length}
				</span>
				wyników
			</h4>
			<div className="w-full mt-8">
				<h2 className="text-2xl font-bold mb-4">Lista Pralek</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedAndFilteredWashingMachines
						.slice(0, itemsToShow)
						.map((machine) => (
							<li key={machine.id} className="border p-4 rounded-md shadow">
								<Image
									src={`/${machine.src}`}
									alt={machine.name}
									width={200}
									height={200}
									className="object-cover rounded-md mb-4"
								/>
								<h3 className="text-lg font-semibold">{machine.name}</h3>
								<p>
									<strong>Model:</strong> {machine.model}
								</p>
								<p>
									<strong>Pojemność:</strong> {machine.capacity}
								</p>
								<p>
									<strong>Cena:</strong> {machine.price} {machine.currency}
								</p>
								<p>
									<strong>Popularność:</strong> {machine.popularity}
								</p>
								<p>
									<strong>Klasa Energetyczna:</strong> {machine.energyClass}
								</p>
								<p>
									<strong>Kolor:</strong> {machine.color}
								</p>
							</li>
						))}
				</ul>
			</div>
			{itemsToShow < sortedAndFilteredWashingMachines.length && (
				<div className="flex justify-center mt-4">
					<Button onClick={handleShowMore}>Pokaż więcej</Button>
				</div>
			)}
		</div>
	);
};
export default SearchDevice;
