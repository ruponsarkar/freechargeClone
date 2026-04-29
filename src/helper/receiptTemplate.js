export const receiptHTML = (order) => {
    const line = '--------------------------------';
  
    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: monospace;
            font-size: 12px;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .center {
            text-align: center;
          }
          .right {
            text-align: right;
          }
          .row {
            display: flex;
            justify-content: space-between;
          }
          .bold {
            font-weight: bold;
          }
          .mt {
            margin-top: 6px;
          }
        </style>
      </head>
  
      <body>
        <div class="center bold">MY SHOP</div>
        <div class="center">Thank you for shopping</div>
  
        <div class="mt">${line}</div>
  
        <div>Order ID : ${order.order_id}</div>
        <div>Date     : ${new Date().toLocaleString()}</div>
        <div>Payment  : ${order.payment_type.toUpperCase()}</div>
  
        <div class="mt">${line}</div>
  
        ${order.items
          .map(
            item => `
            <div>${item.name}</div>
            <div class="row">
              <span>${item.quantity} x ${item.price}</span>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          `
          )
          .join('')}
  
        <div class="mt">${line}</div>
  
        <div class="row">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
  
        <div class="row">
          <span>Discount</span>
          <span>- ${order.discount.toFixed(2)}</span>
        </div>
  
        <div class="row">
          <span>Tax</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
  
        <div class="mt">${line}</div>
  
        <div class="row bold">
          <span>TOTAL</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
  
        <div class="mt">${line}</div>
  
        <div class="center mt">🙏 Thank You 🙏</div>
        <div class="center">Visit Again</div>
  
        <br/><br/>
      </body>
    </html>
    `;
  };
  