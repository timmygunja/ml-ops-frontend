import React, { useEffect, useState } from "react";
import PredictionForm from "./PredictionForm";
import ImageGrid from "./ImageGrid";
import { useDispatch, useSelector } from "react-redux";

export default function CarPricePredictor() {
  const [prediction, setPrediction] = useState(null);
  // const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { price, images, loading } = useSelector((state) => state.prediction);

  useEffect(() => {
    console.log(price);

    setPrediction(price * 109); // 109 - euro currency to rouble
  }, [price]);

  const handlePrediction = (formData) => {
    // Симулируем результат
    // setPrediction(Math.floor(Math.random() * 500000) + 10000);
    // setImages(["/carDefault.jpg"]);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/2 flex items-center justify-center">
        <PredictionForm onSubmit={handlePrediction} />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <ImageGrid images={images} />
          {prediction !== null && (
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-700">
                Цена согласно модели:
              </h2>
              <p className="text-3xl font-bold text-green-600">
                {prediction} ₽
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
