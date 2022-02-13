import Component, { html, css } from '../class/Component.js';
import locator from "../script/locator.js";
import Progress from '../components/progress-indicator.js';

import AppSticker from '../components/app-sticker.js';
import $, { updateChildrenText } from '../class/DOM.js';

const attributes = {};
const properties = {};

const style = css`
  :host {
    display: block;
  }
  slot {
    display: block;
  }
  #payments {
    margin: 16px auto;
    width: 90%;
  }
  #title {
    text-align: center;
  }
  #title, #description {
    font-size: 20px;
    text-align: center;
  }
  #infoWrapper {
    padding: 0 20px;
  }
  #price {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
  apple-pay-button {
    margin-bottom: 10px;
    display: block;
    --apple-pay-button-width: 100%;
    --apple-pay-button-height: 40px;
    --apple-pay-button-border-radius: 4px;
    --apple-pay-button-padding: 0px 0px;
    --apple-pay-button-box-sizing: border-box;
  }`;

/** name {Class} @class @ui @component <page-donate />
  * description
  */
export default class PageDonate extends Component {
  static template = html`
      <template>
        <script async src="/library/pay.js" id="google-pay-script"></script>
        <style>${style}</style>
        <style type="text/css">
          .gpay-card-info-container {
            padding: 0;
            position: relative;
            min-width: 240px;
            height: 40px;
            min-height: 40px;
            border-radius: 4px;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            cursor: pointer;
            border: 0px;
          }

          .gpay-card-info-container.black,
          .gpay-card-info-animation-container.black {
            background-color: #000;
            box-shadow: none;
          }

          .gpay-card-info-container.white,
          .gpay-card-info-animation-container.white {
            background-color: #fff;
          }

          .gpay-card-info-container.black.active {
            background-color: #5f6368;
          }

          .gpay-card-info-container.black.hover,
          .gpay-card-info-animation-container.black.hover {
            background-color: #3c4043;
          }

          .gpay-card-info-container.white.active {
            background-color: #fff;
          }

          .gpay-card-info-container.white.focus {
            box-shadow: #e8e8e8 0 1px 1px 0, #e8e8e8 0 1px 3px;
          }

          .gpay-card-info-container.white.hover,
          .gpay-card-info-animation-container.white.hover {
            background-color: #f8f8f8;
          }

          .gpay-card-info-iframe {
            border: 0;
            display: block;
            height: 40px;
            margin: auto;
            max-width: 100%;
            width: 240px;
          }

          .gpay-card-info-container-fill .gpay-card-info-iframe{
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
          }

          .gpay-card-info-container-fill,
            .gpay-card-info-container-fill > .gpay-card-info-container{
            width: 100%;
            height: inherit;
          }

          .gpay-card-info-container-fill .gpay-card-info-placeholder-container{
            align-items: center;
            justify-content: center;
            width: 100%;
            padding-top: 3px;
            box-sizing: border-box;
            overflow: hidden;
          }

          .gpay-card-info-container-fill .gpay-card-info-placeholder-svg-container{
            position: relative;
            width: 60%;
            height: inherit;
            max-height: 80%;
            margin-right: -20%;
          }

          .gpay-card-info-container-fill .gpay-card-info-placeholder-svg-container > svg {
            position: absolute;
            left: 0;
            height: 100%;
            max-width: 100%;
          }
        </style>
        <style type="text/css">
          .gpay-card-info-animation-container {
            display: flex;
            width:100%;
            position: absolute;
            z-index: 100;
            height: 40px;
            border-radius: 4px;
          }

          .gpay-card-info-placeholder-container {
            display: flex;
            width: 240px;
            height: 100%;
            margin: auto;
          }

          .gpay-card-info-animated-progress-bar-container {
            display: flex;
            box-sizing: border-box;
            position: absolute;
            width: 100%;
          }

          .gpay-card-info-animated-progress-bar {
            border-radius: 4px 4px 0px 0px;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
            animation-iteration-count: 1;
            animation-name: gpayProgressFill;
            animation-timing-function: cubic-bezier(0.97, 0.33, 1, 1);
            background: #caccce;
            width: 100%;
            height: 3px;
            max-height: 3px;
          }

          .gpay-card-info-animated-progress-bar-indicator {
            border-radius: 4px 4px 0px 0px;
            max-width: 20px;
            min-width: 20px;
            height: 3px;
            max-height: 3px;
            background: linear-gradient(to right, #caccce 30%, #acaeaf 60%);
            animation-delay: 0.5s;
            animation-duration: 1.7s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: gpayPlaceHolderShimmer;
          }

          .gpay-card-info-iframe-fade-in {
            animation-fill-mode: forwards;
            animation-duration: 0.6s;
            animation-name: gpayIframeFadeIn;
          }

          .gpay-card-info-animation-container-fade-out {
            animation-fill-mode: forwards;
            animation-duration: 0.6s;
            animation-name: gpayPlaceHolderFadeOut;
          }

          .gpay-card-info-animation-gpay-logo {
            margin: 13px 7px 0px  39px;
            background-origin: content-box;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
            height: 17px;
            max-height: 17px;
            max-width: 41px;
            min-width: 41px;
          }

          .gpay-card-info-animation-gpay-logo.black {
            background-image: url("https://www.gstatic.com/instantbuy/svg/dark_gpay.svg");
          }

          .gpay-card-info-animation-gpay-logo.white {
            background-image: url("https://www.gstatic.com/instantbuy/svg/light_gpay.svg");
          }

          @keyframes gpayPlaceHolderShimmer{
            0% {
              margin-left: 0px;
            }
            100% {
              margin-left: calc(100% - 20px);
            }
          }

          @keyframes gpayIframeFadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
          }

          @keyframes gpayPlaceHolderFadeOut {
            from {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
          }

          @keyframes gpayProgressFill {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          .gpay-card-info-container-fill .gpay-card-info-animation-container{
            top: 0;
            width: 100%;
            height: 100%;
          }

          .gpay-card-info-container-fill .gpay-card-info-animation-gpay-logo{
            background-position: right;
            margin: 0 0 0 0;
            max-width: none;
            width: 25%;
            height:inherit;
            max-height: 50%;
          }
          .aim {
            margin: 15px 0;
            text-align: center;
            font-size: 18px;
          }
          .counter {
            width: 80%;
            margin: auto;
            margin-top: 10px;
            margin-bottom: 25px;
          }
          .bounty {
            margin: 15px;
            margin-bottom: 25px;
            text-align: center;
          }
        </style>
        <div id="infoWrapper">
          <div id="title">Donate to Banff national park</div>
          <slot></slot>
          <div id="sticker"></div>
          <div id="price">2$</div>
          <div id="description">Help us to raise money and get an animated cat as a gift!</div>
        </div>
        <div id="payments">
          <apple-pay-button buttonstyle="black" type="plain" locale="en"></apple-pay-button>
          <div id="google-pay"></div>
        </div>

      </template>`;

  // /** Создание компонента {Class} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(sticker) {
  //     super();
  //     this.store({ sticker });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageDonate} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    // const { store } = this.store();

    const proceed = () => {
      const person = locator.storage.get("personInfo")

      const buySticker = async () => {
        const response = await fetch(`/api/buy?id=${person.id}&sticker=${this.stickerId}&sum=${2}`);

        if (response.ok) locator.go(`main/success/${this.stickerId}/${this.isStickerPaused}`);
      }

      buySticker();
    }


    const applePay = $('apple-pay-button', node);
    applePay.addEventListener('click', async () => {
      try {
        await onApplePayButtonClicked();
      } catch (e) {
        proceed();
      }
    });

    const googlePay = $('#google-pay', node);
    const gps = $('#google-pay-script', node);
    gps.onload = () => onGooglePayLoaded(googlePay, proceed);

    this.addEventListener('component-routing', e => {
      const location = e?.detail?.options?.location || [];
      console.log('route', location);
      this.isStickerPaused = true;
      this.stickerId = location[1] || "s6";
      const sticker = new AppSticker({
        id: this.stickerId,
        paused: this.isStickerPaused
      });
      $('#sticker', node).appendChild(sticker);
    });

    const donatedAmount = locator.storage.get('personInfo');

    const progressIndicator = new Progress({
      amount: donatedAmount.donated,
      aim: 70
    });
    progressIndicator.classList.add("counter");
    node.appendChild(progressIndicator);

    return this;
  }


}

Component.init(PageDonate, 'page-donate', { attributes, properties });

// APPLE PAY
async function onApplePayButtonClicked() {
  // Consider falling back to Apple Pay JS if Payment Request is not available.
  if (!PaymentRequest) {
    return;
  }

  try {
    // Define PaymentMethodData
    const paymentMethodData = [{
      "supportedMethods": "https://apple.com/apple-pay",
      "data": {
        "version": 3,
        "merchantIdentifier": "merchant.com.example",
        "merchantCapabilities": [
          "supports3DS"
        ],
        "supportedNetworks": [
          "amex",
          "discover",
          "masterCard",
          "visa"
        ],
        "countryCode": "CA"
      }
    }];

    // Define PaymentDetails
    const paymentDetails = {
      "total": {
        "label": "My Merchant",
        "amount": {
          "value": "20",
          "currency": "USD"
        }
      }
    };
    // Define PaymentOptions
    const paymentOptions = {
      "requestPayerName": false,
      "requestBillingAddress": false,
      "requestPayerEmail": false,
      "requestPayerPhone": false,
      "requestShipping": true,
      "shippingType": "shipping"
    };

    // Create PaymentRequest
    const request = new PaymentRequest(paymentMethodData, paymentDetails, paymentOptions);

    request.onmerchantvalidation = event => {
      // Call your own server to request a new merchant session.


      // const merchantSessionPromise = validateMerchant();
      // const merchantSessionPromise = fetch("/authorizeMerchant")
      //   .then(res => res.json()) // Parse response as JSON.
      //   .catch(err => {
      //     console.error("Error fetching merchant session", err);
      //   });

      const merchantSessionPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          // throw new Error('test');
          reject('test');
        }, 10000);
      });
      event.complete(merchantSessionPromise);
    };

    request.onpaymentmethodchange = event => {
      // Define PaymentDetailsUpdate based on the selected payment method.
      // No updates or errors needed, pass an object with the same total.
      const paymentDetailsUpdate = {
        'total': paymentDetails.total
      };
      event.updateWith(paymentDetailsUpdate);
    };

    request.onshippingoptionchange = event => {
      // Define PaymentDetailsUpdate based on the selected shipping option.
      // No updates or errors needed, pass an object with the same total.
      const paymentDetailsUpdate = {
        'total': paymentDetails.total
      };
      event.updateWith(paymentDetailsUpdate);
    };

    request.onshippingaddresschange = event => {
      // Define PaymentDetailsUpdate based on a shipping address change.
      const paymentDetailsUpdate = {
        "total": {
          "label": "My Merchant",
          "amount": {
            "value": "20",
            "currency": "USD"
          }
        }
      };
      event.updateWith(paymentDetailsUpdate);
    };

    const response = await request.show();
    const status = "success";
    await response.complete(status);
  } catch (e) {
    // Handle errors
    // console.log('err', e);
    throw e;
  }
}

// GOOGLE PAY
/**
 * Define the version of the Google Pay API referenced when creating your
 * configuration
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
 */
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm card networks supported by your site and gateway
 */
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

/**
 * Card authentication methods supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm your processor supports Android device tokens for your
 * supported card networks
 */
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable
 * of being charged by a supported gateway after payer authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
 */
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'example',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

/**
 * Describe your site's support for the CARD payment method including optional
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: tokenizationSpecification
  }
);

/**
 * An initialized google.payments.api.PaymentsClient object or null if not yet set
 *
 * @see {@link getGooglePaymentsClient}
 */
let paymentsClient = null;

/**
 * Configure your site's support for payment methods supported by the Google Pay
 * API.
 *
 * Each member of allowedPaymentMethods should contain only the required fields,
 * allowing reuse of this base request when determining a viewer's ability
 * to pay and later requesting a supported payment method
 *
 * @returns {object} Google Pay API version, payment methods supported by the site
 */
function getGoogleIsReadyToPayRequest() {
  return Object.assign(
    {},
    baseRequest,
    {
      allowedPaymentMethods: [baseCardPaymentMethod]
    }
  );
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    // @todo a merchant ID is available for a production environment after approval by Google
    // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    // merchantId: '01234567890123456789',
    merchantName: 'Example Merchant'
  };
  return paymentDataRequest;
}

/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
  if (paymentsClient === null) {
    paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
  }
  return paymentsClient;
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 *
 * Display a Google Pay payment button after confirmation of the viewer's
 * ability to pay.
 */
function onGooglePayLoaded(root, proceed) {
  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
    .then(function (response) {
      if (response.result) {
        addGooglePayButton(root, proceed);
        // @todo prefetch payment data to improve performance after confirming site functionality
        // prefetchGooglePaymentData();
      }
    })
    .catch(function (err) {
      // show error in developer console for debugging
      console.error(err);
    });
}

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton(root, proceed) {
  const paymentsClient = getGooglePaymentsClient();
  const button =
    paymentsClient.createButton({
      onClick: () => {
        onGooglePaymentButtonClicked(proceed)
      },
      buttonSizeMode: 'fill'
    });
  root.appendChild(button);
}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
function getGoogleTransactionInfo() {
  return {
    countryCode: 'CA',
    currencyCode: 'USD',
    totalPriceStatus: 'FINAL',
    // set to cart total
    totalPrice: '20'
  };
}

/**
 * Prefetch payment data to improve performance
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
 */
function prefetchGooglePaymentData() {
  const paymentDataRequest = getGooglePaymentDataRequest();
  // transactionInfo must be set but does not affect cache
  paymentDataRequest.transactionInfo = {
    totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
    currencyCode: 'USD'
  };
  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
function onGooglePaymentButtonClicked(proceed) {
  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function (paymentData) {
      // handle the response
      processPayment(paymentData);
    })
    .catch(function (err) {
      // show error in developer console for debugging
      console.error(err);
      // debugger;
      proceed();
    });
}

/**
 * Process payment data returned by the Google Pay API
 *
 * @param {object} paymentData response from Google Pay API after user approves payment
 * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
 */
function processPayment(paymentData) {
  // show returned data in developer console for debugging
  console.log(paymentData);
  // @todo pass payment token to your gateway to process payment
  paymentToken = paymentData.paymentMethodData.tokenizationData.token;
}
