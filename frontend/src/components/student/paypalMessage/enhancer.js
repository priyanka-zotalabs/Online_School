import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import axios from "axios";
import { toast } from "react-toastify";

export let enhancer = compose(
  connect(
    ({ paymentDetails }) => ({ paymentDetails }),
    (dispatch) => ({
      setPayment: (params) => dispatch({ type: "ADD_PAYMENT", params }),
    })
  ),
  withRouter,
  (Message) => ({ paymentDetails, setPayment, ...props }) => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
      capture();
    }, []);
    console.log("fee message", paymentDetails);
    const capture = () => {
      // axios
      //   .post(`${appConfig.host}${urls.paypalCapture}`, paymentDetails)
      //   .then((result) => {
      //     console.log("result from message", result);
      //     toast.success("Payment Successfully done");
      //     setIsSuccessful(true);
      //     setLoader(false);

      axios
        .put(
          `${appConfig.host}${urls.updatePaymentStatus}?batchId=${paymentDetails.batchId}&installmentId=${paymentDetails.installmentId}`
        )
        .then(() => {
          toast.success("Payment Successfully done");
          setIsSuccessful(true);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
          setIsSuccessful(false);
        });

      // .catch((err) => {
      //   // alert(err);
      //   setLoader(false);
      //   setIsSuccessful(false);
      // });
    };
    return (
      <Message
        {...props}
        {...{
          isSuccessful,
          paymentDetails,
          loader,
        }}
      />
    );
  }
);

export default enhancer;
