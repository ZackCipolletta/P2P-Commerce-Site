import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { useEffect } from "react";

const ButtonWrapper = ({ currency, showSpinner, buttonContainerStyle }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const amount = "2";
  const style = { layout: "vertical" };

  return (
    <div style={buttonContainerStyle}>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
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
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            // Your code here after capturing the order
          });
        }}
      />
    </div>
  );
};

export default function Test2() {
  const currency = "USD";

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px"
  };


  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
          buttonContainerStyle={buttonContainerStyle}
        />
      </PayPalScriptProvider>
    </div>
  );
}

