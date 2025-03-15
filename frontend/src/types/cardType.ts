// Тип для страны
export type Country = {
  id: number;
  name: string;
};

// Тип для направления (например, город)
export type Destination = {
  id: number;
  country: Country;
  name: string;
  description: string;
  image: string;
};

// Тип для туров
export type Card = {
  id: number;
  destination: Destination;
  name: string;
  description: string;
  price: string;
  duration: number;
};

export type TourResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Card[];
};
