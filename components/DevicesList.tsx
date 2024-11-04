import Image from "next/image";
import CardItem from "@/components/CardItem";
import { WashingMachine } from "@/app/data/devices";

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
      <div className="max-w-[692px] md:max-w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.slice(0, itemsToShow).map((device) => (
            <li className="flex justify-center" key={device.id}>
              <CardItem
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
      {itemsToShow < devices.length ? (
        <div className="flex justify-center mt-4 mb-[38px]">
          <button
            onClick={handleShowMore}
            className="flex justify-between items-center border-none bg-transparent text-blueButton text-lg font-bold leading-[28px] w-[118px] h-[20px]"
            aria-label="Show more devices"
          >
            Pokaż więcej
            <Image
              src="/assets/icons/chevronDownBlue.svg"
              width={7}
              height={7}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      ) : (
        <div className="mb-[38px]" aria-hidden="true"></div>
      )}
    </>
  );
};

export default DevicesList;
