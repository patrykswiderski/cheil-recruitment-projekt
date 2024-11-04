import Image from "next/image";
import CardItem from "./ItemCart";
import { WashingMachine } from "../data/devices";

interface DevicesListProps {
	devices: WashingMachine[];
	itemsToShow: number;
	handleShowMore: () => void;
}

const DevicesList: React.FC<DevicesListProps> = ({
	devices,
	itemsToShow,
	handleShowMore,
}) => {
	return (
		<>
			<div className="w-full max-w-[1046px]">
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
					{devices.slice(0, itemsToShow).map((device) => (
						<li key={device.id}>
							<CardItem
								id={device.id}
								name={device.name}
								model={device.model}
								type={device.type}
								capacity={device.capacity}
								color={device.color}
								dimensions={device.dimensions}
								functions={device.functions}
								energyClass={device.energyClass}
								price={device.price}
								currency={device.currency}
								financing={device.financing}
								priceAvailability={device.priceAvailability}
								imageSrc={`/${device.src}`}
							/>
						</li>
					))}
				</ul>
			</div>
			{itemsToShow < devices.length && (
				<div className="flex justify-center mt-4 mb-[38px]">
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

export default DevicesList;