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
import DeviceList from "./DeviceList";

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
		<div className="w-full bg-lightGray">
			<div className="flex flex-col justify-center items-center max-w-[1046px] mx-auto">
				<div className="-ml-12 my-[23px] pb-[9px]">
					<input
						type="text"
						placeholder="Search..."
						className="text-black bg-white outline-none px-3 py-2 placeholder:text-black h-[36px]"
						onChange={handleInputChange}
						value={searchInput}
						aria-label="Search input"
					/>
				</div>

				<div className="flex justify-end gap-[12px] w-full">
					<div className="flex flex-col w-[249px] py-[2px]">
						<h3 className="font-bold text-lg leading-[22px] h-[20px] mb-[7px]">
							Sortuj po:
						</h3>
						<Popover open={openSort} onOpenChange={setOpenSort}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={openSort}
									className="flex justify-between items-bottom border-none h-[36px] pl-3 text-sm+"
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

					<div className="flex flex-col w-[249px] py-[2px]">
						<h3 className="font-bold text-lg leading-[22px] h-[20px] mb-[7px]">
							Funkcje:
						</h3>
						<Popover open={openFunctions} onOpenChange={setOpenFunctions}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={openFunctions}
									className="flex justify-between items-bottom border-none h-[36px] pl-3 text-sm+"
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
													className={`text-xs+ leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
														selectedFunctions.includes(func)
															? "bg-hoverGray"
															: ""
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

					<div className="flex flex-col w-[249px] py-[2px]">
						<h3 className="font-bold text-lg leading-[22px] h-[20px] mb-[7px]">
							Klasa energetyczna:
						</h3>
						<Popover open={openEco} onOpenChange={setOpenEco}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={openEco}
									className="flex justify-between items-bottom border-none h-[36px] pl-3 text-sm+"
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
													className={`text-xs+ leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
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

					<div className="flex flex-col w-[249px] py-[2px]">
						<h3 className="font-bold text-lg leading-[22px] h-[20px] mb-[7px]">
							Pojemność:
						</h3>
						<Popover open={openCapacity} onOpenChange={setOpenCapacity}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={openCapacity}
									className="flex justify-between items-bottom border-none h-[36px] pl-3 text-sm+"
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
												className="text-xs+ leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4"
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
													className={`text-xs+ leading-[18px] hover:bg-hoverGray w-full h-[40px] border-none pl-4 ${
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

				<div className="flex justify-start w-[1032px] pl-1 py-2 mb-1">
					<h4 className="text-sm+">
						Liczba wyników:{" "}
						<span className="font-semibold">
							{sortedAndFilteredWashingMachines.length}
						</span>
					</h4>
				</div>

				<DeviceList
					devices={sortedAndFilteredWashingMachines}
					itemsToShow={itemsToShow}
					handleShowMore={handleShowMore}
				/>
			</div>
		</div>
	);
};
export default SearchDevice;
