import addressDetailsInit from "./addressDetails";
import { validate } from "../../../../shared/helpers/formValidation";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import { toast } from "react-toastify";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export const enhancer = compose(
  connect(
    ({ paymentDetails }) => ({
      paymentDetails,
    }),
    (dispatch) => ({
      setPayment: (params) => dispatch({ type: "ADD_PAYMENT", params }),
    })
  ),
  withRouter,
  (CheckoutForm) => ({ payment, setPayment, paymentDetails, ...props }) => {
    const [addressDetails, setAddressDetails] = useState(addressDetailsInit);
    const [paypalResult, setPaypalResult] = useState();
    const [loader, setLoader] = useState(false);
    const paypalRef = useRef();

    useEffect(() => {
      if (props.currency === "USD") {
        window.paypal
          .Buttons({
            // style: {
            //   layout: "horizontal",
            // },
            onInit: function (data, actions) {
              if (isFormValid(addressDetails)) {
                console.log("valid");
                actions.enable();
              }
            },
            createOrder: function (data, actions) {
              // let param = {
              //   course_name: "AIML",
              //   amount: "2",
              //   buyer_name: "GAK",
              //   buyer_surname: "GAK",
              //   mobile_number: "9876543212",
              //   email_address: "abc@gmail.com",
              // };
              let param = {
                course_name: props.course,
                amount: props.amount.toString(),
                buyer_name: addressDetails.first_name.value,
                buyer_surname: addressDetails.last_name.value,
                mobile_number: addressDetails.mobileNumber.value,
                email_address: addressDetails.email.value,
              };

              return axios
                .post(`${appConfig.host}${urls.paypalBackend}`, param)
                .then((result) => {
                  let param2 = {
                    approvedPayPalOrderId: result.data.orderID,
                    batchId: props.batchId,
                    installmentId: props.installmentId,
                    paymentMethod: "Paypal",
                  };
                  // console.log("param2", param2);
                  setPayment(param2);
                  return result.data;
                })
                .then((result) => {
                  return result.orderID;
                })
                .catch((err) => alert(err));
            },
            onApprove: function (data, actions) {
              axios
                .post(`${appConfig.host}${urls.paypalCapture}`, paymentDetails)
                .then(function (orderData) {
                  // debugger;
                  // console.log(orderData.data.data.result);
                  return orderData.data.data.result;
                })
                .then(function (orderData) {
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show a success / thank you message

                  // Your server defines the structure of 'orderData', which may differ
                  var errorDetail =
                    Array.isArray(orderData.details) && orderData.details[0];

                  if (
                    errorDetail &&
                    errorDetail.issue === "INSTRUMENT_DECLINED"
                  ) {
                    // Recoverable state, see: "Handle Funding Failures"
                    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                    return actions.restart();
                  }

                  if (errorDetail) {
                    var msg = "Sorry, your transaction could not be processed.";
                    if (errorDetail.description)
                      msg += "\n\n" + errorDetail.description;
                    if (orderData.debug_id)
                      msg += " (" + orderData.debug_id + ")";
                    // Show a failure message
                    return alert(msg);
                  }

                  // Show a success message to the buyer
                  // alert(
                  //   "Transaction completed by " +
                  //     orderData.payer.name.given_name
                  // );
                  props.history.push("/fee/message");
                });
            },
          })
          .render(paypalRef.current);
      }
    }, []);
    useEffect(() => {
      clearFormData();
    }, []);

    const clearFormData = () => {
      let allFormKeys = Object.keys(addressDetails);
      let formData = { ...addressDetails };
      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        formData[formKey].invalid = false;
        formData[formKey].helperText = "";
        formData[formKey].touched = false;
      });
      setAddressDetails(formData);
    };

    const inputBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...addressDetails,
      };
      const updatedFormElement = {
        ...updatedForm[inputIdentifier],
      };
      let validationResult = true;
      let helperText = "";
      updatedFormElement.value = event.target.value;
      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;
      updatedForm[inputIdentifier] = updatedFormElement;

      setAddressDetails({ ...updatedForm });
    };

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...addressDetails,
      };
      updatedForm[inputIdentifier].value = event.target.value;
      // console.log("onChange", updatedForm);
      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;
      setAddressDetails({ ...updatedForm });
    };

    const showAllInputFieldError = () => {
      console.log("Function runs");
      const addressDetailForm = {
        ...addressDetails,
      };
      console.log(addressDetails);

      for (const key in addressDetailForm) {
        if (!addressDetailForm[key].touched) {
          let helperText = "";
          for (const validationKey in addressDetailForm[key].validation) {
            console.log("Loop", addressDetailForm[key]);
            const validationResult = validate(
              validationKey,
              addressDetailForm[key].validation[validationKey].value,
              addressDetailForm[key].value
            );

            if (!validationResult) {
              helperText =
                addressDetailForm[key].validation[validationKey].errMsg;
              console.log("Helper", helperText);
              break;
            }
          }
          addressDetailForm[key].invalid = true;
          addressDetailForm[key].helperText = helperText;
        }
      }
      console.log("Function ends", addressDetailForm);

      setAddressDetails({ ...addressDetailForm });
    };

    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      return tempFormIsValid;
    };

    const handleSubmit = (e) => {
      if (isFormValid(addressDetails)) {
        let param = {
          course_name: props.course,
          amount: props.amount.toString(),
          first_name: addressDetails.first_name.value,
          // buyer_surname: addressDetails.last_name.value,
          phone: addressDetails.mobileNumber.value,
          email: addressDetails.email.value,
        };
        axios
          .post(`${appConfig.host}${urls.payHash}`, param)
          .then((result) => {
            let data = {
              amount: props.amount,
              email: props.course,
              firstname: addressDetails.first_name.value,
              furl: "https://fail-url.in",
              hash: result.data.data.hash,
              key: "gtKFFx",
              //mode: "dropout",
              phone: addressDetails.mobileNumber.value,
              productinfo: props.course,
              surl: "https://sucess-url.in",
              txnid: result.data.data.txnid,
            };
            //let data = result.data.data;
            var handler = {
              responseHandler: function (BOLT) {
                console.log("response");
              },
              catchException: function (BOLT) {
                console.log("error");
              },
            };
            console.log(data);
            window.bolt.launch(data, handler);
          })
          .catch((err) => console.warn({ err }));
      } else {
        showAllInputFieldError();
      }
    };

    return (
      <CheckoutForm
        {...props}
        {...{
          inputBlurHandler,
          inputChangeHandler,
          addressDetails,
          handleSubmit,
          paypalRef,
          loader,
        }}
      />
    );
  }
);

export default enhancer;
