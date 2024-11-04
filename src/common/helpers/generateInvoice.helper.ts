export const generateInvoiceNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();

  return `INV-${datePart}-${randomPart}`;
};
