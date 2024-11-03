import Header from "./components/Header";
import SearchDevice from "./components/SearchDevice";

export default function Home() {
	return (
		<div className="flex justify-center w-full items-center ">
			<main className=" w-full">
				<Header label="Wybierz urządzenie" />
				<SearchDevice />
			</main>
			<footer className=""></footer>
		</div>
	);
}
