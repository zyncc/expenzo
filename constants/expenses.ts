export const expenses: Expense[] = [
  {
    category: "Food",
    title: "Burger",
    date: new Date(2025, 1, 5), // February 5, 2025
    price: 45,
  },
  {
    category: "Transport",
    title: "Uber Ride",
    date: new Date(2025, 1, 4),
    price: 12,
  },
  {
    category: "Entertainment",
    title: "Movie Ticket",
    date: new Date(2025, 1, 3),
    price: 9,
  },
  {
    category: "Shopping",
    title: "New Sneakers",
    date: new Date(2025, 1, 2),
    price: 79,
  },
  {
    category: "Bills",
    title: "Electricity Bill",
    date: new Date(2025, 1, 1),
    price: 120,
  },
  {
    category: "Subscription",
    title: "Netflix",
    date: new Date(2025, 0, 31), // January 31, 2025
    price: 15,
  },
  {
    category: "Food",
    title: "Dinner at Restaurant",
    date: new Date(2025, 0, 30),
    price: 55,
  },
  {
    category: "Transport",
    title: "Fuel for Bike",
    date: new Date(2025, 0, 29),
    price: 25,
  },
  {
    category: "Health",
    title: "Gym Membership",
    date: new Date(2025, 0, 28),
    price: 30,
  },
  {
    category: "Education",
    title: "Online Course",
    date: new Date(2025, 0, 27),
    price: 49,
  },
];

export type Expense = {
  category: string;
  title: string;
  date: Date;
  price: number;
};
