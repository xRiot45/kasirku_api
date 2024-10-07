export function generateProductCode() {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let productCode: string = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    productCode += characters.charAt(randomIndex);
  }

  return productCode;
}
