import Image from "next/image";
import CardItem from "./ItemCart";
import { WashingMachine } from "../data/devices";

interface DeviceListProps {
	devices: WashingMachine[];
	itemsToShow: number;
	handleShowMore: () => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
	devices,
	itemsToShow,
	handleShowMore,
}) => {
	return (
		<>
			<div className="w-[1046px]">
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{devices.slice(0, itemsToShow).map((machine) => (
						<li key={machine.id}>
							<CardItem
								id={machine.id}
								name={machine.name}
								model={machine.model}
								capacity={machine.capacity}
								color={machine.color}
								dimensions={machine.dimensions}
								functions={machine.functions}
								energyClass={machine.energyClass}
								price={machine.price}
								currency={machine.currency}
								financing={machine.financing}
								priceAvailability={machine.priceAvailability}
								imageSrc={`/${machine.src}`}
							/>
						</li>
					))}
				</ul>
			</div>
			{itemsToShow < devices.length && (
				<div className="flex justify-center my-4">
					<button
						onClick={handleShowMore}
						className="flex justify-between items-center border-none bg-transparent text-blueButton text-lg font-bold leading-[28px] w-[118px] h-[20px]"
					>
						Pokaż więcej
						<Image
							src="/assets/icons/chevronDownBlue.svg"
							width={7}
							height={7}
							alt="arrow down icon"
						/>
					</button>
				</div>
			)}
		</>
	);
};

export default DeviceList;
