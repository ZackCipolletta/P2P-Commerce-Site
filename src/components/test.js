import React, { useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?components=buttons,hosted-fields&client-id=<CLIENT_ID>&merchant-id=<MERCHANT_ID>&currency=USD&intent=capture';
    script.setAttribute('data-partner-attribution-id', '<BN_CODE>');
    script.setAttribute('data-client-token', '<CLIENT_TOKEN>');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const initializePayPalButtons = () => {
      let orderId;

      // Displays PayPal buttons
      window.paypal.Buttons({
        style: {
          layout: 'horizontal'
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '1.00'
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            window.location.href = '/success.html';
          });
        }
      }).render('#paypal-button-container');

      // If this returns false or the card fields aren't visible, see Step #1.
      if (window.paypal.HostedFields.isEligible()) {
        // Renders card fields
        window.paypal.HostedFields.render({
          // Call your server to set up the transaction
          createOrder: function () {
            return fetch('/your-server/paypal/order', {
              method: 'post'
            })
              .then(function (res) {
                return res.json();
              })
              .then(function (orderData) {
                orderId = orderData.id;
                return orderId;
              });
          },
          styles: {
            '.valid': {
              color: 'green'
            },
            '.invalid': {
              color: 'red'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: 'MM/YY'
            }
          }
        }).then(function (cardFields) {
          document.querySelector('#card-form').addEventListener('submit', (event) => {
            event.preventDefault();

            cardFields.submit({
              // Cardholder's first and last name
              cardholderName: document.getElementById('card-holder-name').value,
              // Billing Address
              billingAddress: {
                // Street address, line 1
                streetAddress: document.getElementById('card-billing-address-street').value,
                // Street address, line 2 (Ex: Unit, Apartment, etc.)
                extendedAddress: document.getElementById('card-billing-address-unit').value,
                // State
                region: document.getElementById('card-billing-address-state').value,
                // City
                locality: document.getElementById('card-billing-address-city').value,
                // Postal Code
                postalCode: document.getElementById('card-billing-address-zip').value,
                // Country Code
                countryCodeAlpha2: document.getElementById('card-billing-address-country').value
              }
            }).then(function () {
              fetch('/your-server/api/order/' + orderId + '/capture/', {
                method: 'post'
              })
                .then(function (orderData) {
                  // Two cases to handle:
                  //   (1) Non-recoverable errors -> Show a failure message
                  //   (2) Successful transaction -> Show confirmation or thank you

                  // This example reads a v2/checkout/orders capture response, propagated from the server
                  // You could use a different API or structure for your 'orderData'
                  var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                  if (errorDetail) {
                    var msg = 'Sorry, your transaction could not be processed.';
                    if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                    if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                    return alert(msg); // Show a failure message
                  }

                  // Show a success message or redirect
                  alert('Transaction completed!');
                });
            }).catch(function (err) {
              alert('Payment could not be captured! ' + JSON.stringify(err));
            });
          });
        });
      } else {
        // Hides card fields if the merchant isn't eligible
        document.querySelector('#card-form').style.display = 'none';
      }
    };

    // Initialize PayPal buttons and hosted fields once the script is loaded
    window.onload = initializePayPalButtons;
  }, []);

  return (
    <div>
      <div id="paypal-button-container"></div>

      <div className="card_container">
        <form id="card-form">
          <label htmlFor="card-number">Card Number</label>
          <div id="card-number" className="card_field"></div>
          <div>
            <label htmlFor="expiration-date">Expiration Date</label>
            <div id="expiration-date" className="card_field"></div>
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <div id="cvv" className="card_field"></div>
          </div>
          <label htmlFor="card-holder-name">Name on Card</label>
          <input type="text" id="card-holder-name" name="card-holder-name" autoComplete="off" placeholder="card holder name" />
          <div>
            <label htmlFor="card-billing-address-street">Billing Address</label>
            <input type="text" id="card-billing-address-street" name="card-billing-address-street" autoComplete="off" placeholder="street address" />
          </div>
          <div>
            <label htmlFor="card-billing-address-unit">&nbsp;</label>
            <input type="text" id="card-billing-address-unit" name="card-billing-address-unit" autoComplete="off" placeholder="unit" />
          </div>
          <div>
            <input type="text" id="card-billing-address-city" name="card-billing-address-city" autoComplete="off" placeholder="city" />
          </div>
          <div>
            <input type="text" id="card-billing-address-state" name="card-billing-address-state" autoComplete="off" placeholder="state" />
          </div>
          <div>
            <input type="text" id="card-billing-address-zip" name="card-billing-address-zip" autoComplete="off" placeholder="zip / postal code" />
          </div>
          <div>
            <input type="text" id="card-billing-address-country" name="card-billing-address-country" autoComplete="off" placeholder="country code" />
          </div>
          <br /><br />
          <div>
            <input type="text" id="card-billing-address-country" name="card-billing-address-country" autoComplete="off" placeholder="country code" />
          </div>
          <br /><br />
          <button value="submit" id="submit" className="btn">Pay</button>
        </form>
      </div>
    </div>
  );
};

export default PayPalCheckout;

