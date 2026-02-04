export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

export type Field = "name" | "email" | "city";

export type FormState = {
  name: string;
  email: string;
  city: string;
};