import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

function PayPalCheckout(props) {
  const handlePaymentSuccess = (details) => {
    // Handle successful payment
    console.log('Payment successful:', details);
    
    // Pass the payment details to the parent component if needed
    // Example: props.onPaymentSuccess(details);
  };

  return (
    <div>
      {/* PayPal checkout button */}
      <PayPalButton
        options={{
          clientId: 'AVXD-KGU-RGKicHcolgMxktz68L85uJmIdLUS7OeqQEgzHmxnxhP5gUd4mR-sZRGEtptC6JsyBntyUx_',
          currency: 'USD',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: (props.product.price + props.product.shippingPrice).toFixed(2),
                },
              },
            ],
          });
        }}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default PayPalCheckout;
