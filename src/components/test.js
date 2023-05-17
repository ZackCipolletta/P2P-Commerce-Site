return (
  <React.Fragment>
    <PurchaseSummary product={product}/>
    <PayPalScriptProvider
      options={{
        "client-id": process.env.CLIENT_ID,
        components: "buttons",
        currency: "USD",
      }}
    >
      <PayPal currency={currency} showSpinner={false} product={product} /*{ parentColor={parentColor} }*/ />
    </PayPalScriptProvider>
  </React.Fragment>

);