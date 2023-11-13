export const getYesterday = (): number => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.getDate();
};

export function getLastWeekDays(): number[] {
  const dates = [];
  const today = new Date();

  // Set date to 7 days ago
  today.setDate(today.getDate() - 7);

  for (let i = 0; i < 7; i++) {
    today.setDate(today.getDate() + 1); // Increment the date
    dates.push(today.getDate()); // Get the day number and push to array
  }

  return dates;
}

export const getDaysInCurrentMonth = (): number[] => {
  const date = new Date();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};
