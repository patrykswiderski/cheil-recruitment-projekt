import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CardItemProps {
	id: number;
	model: string;
	name: string;
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

const convertPrice = (grosze: number): string => {
	return (grosze / 100).toFixed(2);
};

const CardItem: React.FC<CardItemProps> = ({
	id,
	model,
	name,
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
		<div className="border p-6 rounded-lg shadow-md w-full max-w-[338px]">
			<div className="flex justify-center mb-4">
				<Image
					src={imageSrc}
					alt={name}
					width={200}
					height={200}
					className="object-contain rounded-md"
				/>
			</div>
			<h3 className="text-lg font-semibold mb-2">{name}</h3>
			<ul className="text-sm text-gray-700 mb-4">
				<li>
					<strong>Model:</strong> {model}
				</li>
				<li>
					<strong>Pojemność:</strong> {capacity}
				</li>
				<li>
					<strong>Kolor:</strong> {color}
				</li>
				<li>
					<strong>Wymiary (G×S×W):</strong> {dimensions}
				</li>
				<li>
					<strong>Funkcje:</strong> {functions.join(", ")}
				</li>
				<li>
					<strong>Klasa energetyczna:</strong> {energyClass}
				</li>
				<li>
					<strong>Dostępność ceny:</strong> {priceAvailability}
				</li>
			</ul>
			<div className="text-2xl font-bold mb-2">
				{convertPrice(price).replace(".", ",")} {currency}
			</div>
			<div className="text-sm text-gray-500 mb-4">
				<strong>Raty:</strong> {financing}
			</div>
			<Button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
				Wybierz
			</Button>
		</div>
	);
};

export default CardItem;
