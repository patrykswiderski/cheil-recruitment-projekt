"use client";
import { useState, ChangeEvent, useMemo, useEffect, useCallback } from "react";
import { washingMachines } from "@/app/data/devices";
import DevicesList from "@/components/DevicesList";
import FilterDropdown, { Option } from "@/components/FilterDropdown";

const SearchDevice: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [itemsToShow, setItemsToShow] = useState<number>(6);
  const [selectedSort, setSelectedSort] = useState<Option | null>(null);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [selectedEnergyClass, setSelectedEnergyClass] = useState<string[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>([]);

  const sortOptions: Option[] = [
    { value: "all", label: "Wszystkie" },
    { value: "price", label: "Cena" },
    { value: "popularity", label: "Popularność" },
    { value: "capacity", label: "Pojemność" },
  ];

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, []);

  const handleSortSelect = useCallback(
    (value: string) => {
      const sortOption =
        sortOptions.find((option) => option.value === value) || null;
      setSelectedSort(sortOption);
    },
    [sortOptions]
  );

  const uniqueFunctions = useMemo(() => {
    const functionsSet = new Set<string>();
    washingMachines.forEach((machine) => {
      machine.functions?.forEach((func) => functionsSet.add(func));
    });
    return Array.from(functionsSet);
  }, []);

  const functionOptions: Option[] = useMemo(
    () => [
      { value: "all", label: "Wszystkie" },
      ...uniqueFunctions.map((func) => ({ value: func, label: func })),
    ],
    [uniqueFunctions]
  );

  const handleFunctionSelect = useCallback((value: string) => {
    if (value === "all") {
      setSelectedFunctions([]);
    } else {
      setSelectedFunctions((prev) =>
        prev.includes(value)
          ? prev.filter((func) => func !== value)
          : [...prev, value]
      );
    }
  }, []);

  const uniqueEnergyClasses = useMemo(() => {
    const energySet = new Set<string>();
    washingMachines.forEach((device) => {
      energySet.add(device.energyClass);
    });
    return Array.from(energySet);
  }, []);

  const energyClassOptions: Option[] = useMemo(
    () => [
      { value: "all", label: "Wszystkie" },
      ...uniqueEnergyClasses.map((eco) => ({ value: eco, label: eco })),
    ],
    [uniqueEnergyClasses]
  );

  const handleEnergyClassSelect = useCallback((value: string) => {
    if (value === "all") {
      setSelectedEnergyClass([]);
    } else {
      setSelectedEnergyClass((prev) =>
        prev.includes(value)
          ? prev.filter((eco) => eco !== value)
          : [...prev, value]
      );
    }
  }, []);

  const uniqueCapacities = useMemo(() => {
    const capacitySet = new Set<string>();
    washingMachines.forEach((device) => {
      if (device.capacity) {
        capacitySet.add(device.capacity);
      }
    });
    return Array.from(capacitySet).sort(
      (a, b) => parseFloat(b) - parseFloat(a)
    );
  }, []);

  const capacityOptions: Option[] = useMemo(
    () => [
      { value: "all", label: "Wszystkie" },
      ...uniqueCapacities.map((capacity) => ({
        value: capacity,
        label: capacity,
      })),
    ],
    [uniqueCapacities]
  );

  const handleCapacitySelect = useCallback((value: string) => {
    if (value === "all") {
      setSelectedCapacity([]);
    } else {
      setSelectedCapacity((prev) =>
        prev.includes(value)
          ? prev.filter((capacity) => capacity !== value)
          : [...prev, value]
      );
    }
  }, []);

  const sortedAndFilteredWashingMachines = useMemo(() => {
    let filtered = washingMachines;

    if (searchInput.trim() !== "") {
      const searchLower = searchInput.toLowerCase();
      filtered = filtered.filter(
        (machine) =>
          machine.name?.toLowerCase().includes(searchLower) ||
          machine.model?.toLowerCase().includes(searchLower)
      );
    }

    if (selectedFunctions.length > 0) {
      filtered = filtered.filter((machine) =>
        selectedFunctions.every((func) => machine.functions?.includes(func))
      );
    }

    if (selectedEnergyClass.length > 0) {
      filtered = filtered.filter((machine) =>
        selectedEnergyClass.includes(machine.energyClass ?? "")
      );
    }

    if (selectedCapacity.length > 0) {
      filtered = filtered.filter((machine) =>
        selectedCapacity.includes(machine.capacity ?? "")
      );
    }

    if (!selectedSort || selectedSort.value === "all") return filtered;

    const sorted = [...filtered];
    switch (selectedSort.value) {
      case "price":
        return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "popularity":
        return sorted.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      case "capacity":
        return sorted.sort((a, b) => {
          const capacityA = parseFloat(a.capacity ?? "0");
          const capacityB = parseFloat(b.capacity ?? "0");
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

  const handleShowMore = useCallback(() => {
    setItemsToShow((prev) => prev + 6);
  }, []);

  return (
    <div className="w-full bg-lightGray">
      <div className="flex flex-col justify-start sm:justify-center items-center w-full max-w-[1046px] mx-auto">
        <div className="self-start sm:self-center ml-8 sm:ml-0 lg:-ml-12 my-[23px] pb-[9px]">
          <label htmlFor="search-input" className="sr-only">
            Wyszukaj urządzenie
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            className="text-black bg-white outline-none px-3 py-2 placeholder:text-black h-[36px]"
            onChange={handleInputChange}
            value={searchInput}
            aria-label="Search input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:justify-end gap-y-3 md:gap-x-3 md:pl-[14px] py-[2px] w-full md:max-w-[1046px]">
          <FilterDropdown
            title="Sortuj po:"
            options={sortOptions}
            selectedValues={selectedSort ? selectedSort.value : null}
            onSelect={handleSortSelect}
            isMulti={false}
          />
          <FilterDropdown
            title="Funkcje:"
            options={functionOptions}
            selectedValues={selectedFunctions}
            onSelect={handleFunctionSelect}
            isMulti={true}
          />
          <FilterDropdown
            title="Klasa energetyczna:"
            options={energyClassOptions}
            selectedValues={selectedEnergyClass}
            onSelect={handleEnergyClassSelect}
            isMulti={true}
          />
          <FilterDropdown
            title="Pojemność:"
            options={capacityOptions}
            selectedValues={selectedCapacity}
            onSelect={handleCapacitySelect}
            isMulti={true}
          />
        </div>

        <div className="flex ml-8 sm:ml-0 self-start sm:self-center sm:justify-center md:justify-start md:w-full md:max-w-[1046px] md:pl-[18px] py-2 mb-1">
          <h4 className="text-sm+">
            Liczba wyników:{" "}
            <span className="font-semibold">
              {sortedAndFilteredWashingMachines.length}
            </span>
          </h4>
        </div>

        <DevicesList
          devices={sortedAndFilteredWashingMachines}
          itemsToShow={itemsToShow}
          handleShowMore={handleShowMore}
        />
      </div>
    </div>
  );
};

export default SearchDevice;
