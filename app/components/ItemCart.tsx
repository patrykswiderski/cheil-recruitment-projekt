import Image from "next/image";

interface CardItemProps {
	id: number;
	model: string;
	name: string;
	type: string;
	capacity: string;
	color: string;
	dimensions: string;
	functions: string[];
	energyClass: string;
	price: number;
	currency: string;
	financing: string;
	priceAvailability: string;
	imageSrc: string;
}

const CardItem: React.FC<CardItemProps> = ({
	id,
	model,
	name,
	type,
	capacity,
	color,
	dimensions,
	functions,
	energyClass,
	price,
	currency,
	financing,
	priceAvailability,
	imageSrc,
}) => {
	return (
		<div className="flex flex-col p-4 rounded-itemCard w-full sm:max-w-[338px] bg-background px-6 py-[25px] gap-3 sm:max-h-[603px]">
			<div className="flex flex-col gap-4 w-full sm:max-w-[290px]">
				<div className="relative flex justify-center w-full aspect-[21/16] sm:aspect-[29/20] h-[330px] sm:h-[200px] self-center -my-14 xxs:-my-8 xs:my-0">
					<Image
						src={imageSrc}
						alt={`${type} - ${model}`}
						fill
						className="object-contain"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-col gap-[14px]">
					<div className="flex flex-col gap-2">
						<div className="mb-7 line-clamp-2">
							<h3 className="text-lg- font-bold ">
								{model}, {type}
							</h3>
							<h3 className="text-lg- font-bold">
								{name}, {capacity}, {color}
							</h3>
						</div>
						<div>
							<div className="text-xs+ text-descriptionDeviceGray">
								Pojemność (kg):{" "}
								<span className=" font-bold text-foreground">
									{capacity.slice(0, -3)}
								</span>
							</div>
							<div className="text-xs+ text-descriptionDeviceGray">
								Wymiary (G×S×W):{" "}
								<span className=" font-bold text-foreground">{dimensions}</span>
							</div>
							<div className="text-xs+ text-descriptionDeviceGray line-clamp-2">
								Funkcje:{" "}
								<span className=" font-bold text-foreground">
									{functions.join(", ")}
								</span>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-[9px] text-xs+ text-descriptionDeviceGray w-[290px]">
						<div>Klasa energetyczna</div>
						<div className="flex">
							<div className="flex items-center text-white text-xs leading-[14px] pl-[6px] font-bold bg-ecoGreen w-[42.6px] h-[18px]">
								{energyClass}
							</div>
							<div
								className="inset-y-0 right-0 w-0 h-0 border-y-[9px] border-y-transparent border-l-[7px] border-l-ecoGreen"
								aria-hidden="true"
							></div>
						</div>
					</div>
					<div className="flex flex-col gap-[1px] w-[290px]">
						<div className="text-xs leading-4+ text-descriptionDeviceGray">
							Cena obowiązuje: {priceAvailability}
						</div>
						<div className="flex justify-start items-center gap-[2px] ">
							<div className="font-bold text-5xl-">
								{String(price)
									.slice(0, -2)
									.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
							</div>
							<div className="flex flex-col justify-center self-end h-full text-sm leading-4 font-bold -mb-[3px]">
								<div>{String(price).slice(-2)}</div>
								<div className="self-end">{currency}</div>
							</div>
						</div>
					</div>
					<div className="flex items-center leading-4+ font-bold text-financingGrey h-[18px]">
						{financing}
					</div>
				</div>
			</div>

			<button
				type="button"
				className="flex items-center self-center w-fit max-h-9 px-10 py-[14px] rounded-full text-sm leading-4 font-bold tracking-widest+ bg-chooseButtonBlue text-white hover:bg-chooseButtonHover"
				aria-label={`Choose ${type} ${model}`}
			>
				WYBIERZ
			</button>
		</div>
	);
};

export default CardItem;
