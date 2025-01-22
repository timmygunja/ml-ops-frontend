import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPredictionFailure,
  setPredictionSuccess,
} from "../store/predictionSlice";

const formFields = [
  { name: "brand", label: "Brand []", type: "select" },
  { name: "model", label: "Model", type: "select" },
  { name: "vehicleType", label: "Vehicle Type", type: "select" },
  { name: "yearOfRegistration", label: "Year of Registration", type: "number" },
  { name: "powerPS", label: "Power (PS)", type: "number" },
  { name: "kilometer", label: "Kilometers", type: "number" },
  { name: "fuelType", label: "Fuel Type", type: "select" },
  { name: "gearbox", label: "Gearbox", type: "select" },
  { name: "seller", label: "Seller", type: "select" },
  { name: "notRepairedDamage", label: "Not Repaired Damage", type: "select" },
];

export default function PredictionForm({ onSubmit }) {
  const [formFields, setFormFields] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { price, images, loading } = useSelector((state) => state.prediction);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const data = await response.json();

        const newFormFields = [
          {
            name: "brand",
            label: "Brand [Марка]",
            type: "select",
            options: data.brands,
          },
          {
            name: "model",
            label: "Model [Модель]",
            type: "select",
            options: data.models,
          },
          {
            name: "vehicleType",
            label: "Vehicle Type [Кузов]",
            type: "select",
            options: data.vehicleTypes,
          },
          {
            name: "yearOfRegistration",
            label: "Year of Registration [Год Выпуска]",
            type: "number",
          },
          {
            name: "powerPS",
            label: "Power (PS)  [Мощность в ЛС]",
            type: "number",
          },
          { name: "kilometer", label: "Kilometers  [Пробег]", type: "number" },
          {
            name: "fuelType",
            label: "Fuel Type [Тип Топлива]",
            type: "select",
            options: data.fuelTypes,
          },
          {
            name: "gearbox",
            label: "Gearbox [Трансмиссия]",
            type: "select",
            options: data.gearboxes,
          },
          {
            name: "seller",
            label: "Seller [Продавец]",
            type: "select",
            options: data.sellers,
          },
          {
            name: "notRepairedDamage",
            label: "Not Repaired Damage [Битая]",
            type: "select",
            options: data.notRepairedDamageOptions,
          },
        ];

        setFormFields(newFormFields);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to load form options. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setPrediction(null);

    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      console.log(formData);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData, // ОТПРАВКА ДАННЫХ ПО УМОЛЧАНИЮ, БЕЗ ЗАГОЛОВКОВ

        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ powerPS: formData.get("powerPS") }), // ДЛЯ УПРОЩЕННОЙ МОДЕЛИ SimpleLinearRegression

        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(jsonData), // ДЛЯ ЛАБОРАТОРНОЙ ИНКАПСУЛЯЦИЯ
      });

      if (!response.ok) {
        throw new Error("Failed to get price prediction");
      }

      const data = await response.json();
      setPrediction(data.prediction);
      dispatch(setPredictionSuccess(data));
      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      setError("An error occurred. Please try again.");
      dispatch(setPredictionFailure("An error occurred. Please try again."));
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading form options...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {/* {loading && <div className="text-center">Loading form options...</div>} */}
      <div className="grid grid-cols-2 gap-6 p-6">
        {formFields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm text-left font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                className="w-full px-3 py-2 text-base bg-gray-50 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Show Price
        </button>
      </div>
      {prediction && (
        <div className="mt-4 text-center text-lg font-semibold">
          Predicted Price: €{prediction}
        </div>
      )}
    </form>
  );
}
