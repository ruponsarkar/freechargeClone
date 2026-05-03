import {getOrgName} from '../config/appSettings';

const WIDTH = 32;

const padRight = (t, w) => t.length > w ? t.slice(0, w) : t.padEnd(w);
const padLeft = (t, w) => t.length > w ? t.slice(0, w) : t.padStart(w);

const itemLine = (name, qty, amount) => {
  const left = `${name} x${qty}`;
  return padRight(left, 20) + padLeft(amount.toFixed(2), 12);
};

export const thermalReceiptTemplate = order => {
  const line = '-'.repeat(WIDTH);
  const orgName = getOrgName();

  const items = order.items
    .map(i => itemLine(i.name || 'Item', i.quantity, i.price * i.quantity))
    .join('\n');

  return (
`      *** ${orgName} ***

Order: ${order.order_id}
Pay: ${order.payment_type.toUpperCase()}

${line}
ITEMS
${line}
${items}
${line}
Subtotal:${padLeft(order.subtotal.toFixed(2), 22)}
Discount:${padLeft(order.discount.toFixed(2), 22)}
Tax:${padLeft(order.tax.toFixed(2), 27)}
${line}
TOTAL:${padLeft(order.total.toFixed(2), 25)}
${line}

Thank you!
Visit Again

`
  );
};


export const printBarcode = (data) => {
    return (
      '\x1D\x48\x02' +      // HRI below barcode
      '\x1D\x77\x02' +      // Barcode width
      '\x1D\x68\x50' +      // Barcode height
      '\x1D\x6B\x49' +      // CODE128
      String.fromCharCode(data.length) +
      data +
      '\n'
    );
  };
  