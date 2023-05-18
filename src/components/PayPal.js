import React, { useEffect } from "react";
import { Box } from '@chakra-ui/react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function PayPal(props) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: props.currency,
      },
    });
  }, [props.currency, props.showSpinner]);

  const amount = (props.product.price + props.product.shippingPrice).toFixed(2);
  const style = { layout: "vertical" };

  const address = "455 se 6th street";

  return (
    <>
      {props.showSpinner && isPending && <div className="spinner" />}
      <Box
        p={4}
        rounded="md" // Apply rounded corners to the box
      >
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, props.currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: props.currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after creating the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              props.onPaymentReceived(props.product.id, props.userCredentialInfo.email, props.shippingAddress);
            });
          }}
        />
      </Box>
    </>
  );
}

export default PayPal;