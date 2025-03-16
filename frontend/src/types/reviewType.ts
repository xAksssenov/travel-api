export type Review = {
  id: number;
  profile: {
    id: number;
    phone_number: string;
    address: string;
    user: number;
  };
  rating: number;
  comment: string;
  date_posted: string;
  package: number;
};
