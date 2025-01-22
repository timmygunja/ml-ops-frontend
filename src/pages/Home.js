import CarPricePredictor from "../components/CarPricePredictor";

export default function Home() {
  return (
    <main className="bg-gray-150 w-screen h-screen overflow-hidden p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Предсказание цены автомобиля
      </h1>
      <CarPricePredictor />
    </main>
  );
}
