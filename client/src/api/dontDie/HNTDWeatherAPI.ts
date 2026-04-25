// File: client/src/api/dontDie/HNTDWeatherAPI.ts

export interface HNTDWeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { id: number; main: string; description: string }[];
  wind: { speed: number; deg: number };
  visibility: number;
  clouds: { all: number };
}

export const fetchWeather = async (city: string): Promise<HNTDWeatherData> => {
  const res = await fetch(`/hntd/api/weather?city=${encodeURIComponent(city)}`);
  if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
  return res.json();
};
