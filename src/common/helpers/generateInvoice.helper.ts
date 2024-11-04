import cuid from 'cuid';

export const generateInvoiceNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const cuidPart = cuid();

  return `INV-${datePart}-${cuidPart}`;
};
