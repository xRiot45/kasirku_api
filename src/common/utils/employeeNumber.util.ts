export function generateEmployeeNumber() {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let employeeNumber: string = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    employeeNumber += characters.charAt(randomIndex);
  }

  return employeeNumber;
}
