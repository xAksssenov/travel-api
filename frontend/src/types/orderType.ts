export interface Profile {
  id: number;
  phone_number: string;
  address: string;
  user: number;
}

export interface Order {
  id: number;
  profile: Profile;
  order_date: string;
  travel_date: string;
  num_people: number;
  package: number;
}
