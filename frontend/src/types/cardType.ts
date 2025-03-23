// Тип для страны
export type Country = {
  id: number;
  name: string;
  url: string;
};

export type Dop = {
  id: number;
  name: string;
  description: string;
};

// Тип для направления
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
  extra_services: Dop[];
};
