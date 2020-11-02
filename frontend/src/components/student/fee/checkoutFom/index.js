import React from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import enhancer from "./enhancer";
import Loading from "../../../../shared/Components/Loading/index";
import "./CheckoutForm.scss";

function PaypalForm(props) {
  let {
    inputBlurHandler,
    inputChangeHandler,
    addressDetails,
    course,
    amount,
    batchId,
    handleSubmit,
    paypalRef,
    loader,
    currency,
  } = props;

  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <Form className="checkout-form">
          <Form.Group>
            <Row id="checkout-row" className="text-center">
              <Col xs={12}>
                <Form.Label className="checkout-amount text-center">
                  Amount: {amount}
                  {currency}
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row id="checkout-row">
              <Col xs={12} md={3}>
                <Form.Label className="checkout-label">
                  First Name:<span id="required-field">*</span>
                </Form.Label>
              </Col>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  name="first_name"
                  onChange={(e) => inputChangeHandler(e, "first_name")}
                  onBlur={(e) => inputBlurHandler(e, "first_name")}
                  value={addressDetails.first_name.value}
                />
                <span className="error-required">
                  {addressDetails.first_name.invalid
                    ? addressDetails.first_name.helperText
                    : ""}
                </span>
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="checkout-label">
                  Last Name:<span id="required-field">*</span>
                </Form.Label>
              </Col>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={(e) => inputChangeHandler(e, "last_name")}
                  onBlur={(e) => inputBlurHandler(e, "last_name")}
                  value={addressDetails.last_name.value}
                />
                <span className="error-required">
                  {addressDetails.last_name.invalid
                    ? addressDetails.last_name.helperText
                    : ""}
                </span>
              </Col>
            </Row>
            <Row id="checkout-row">
              <Col xs={12} md={3}>
                <Form.Label className="checkout-label">
                  Mobile Number:<span id="required-field">*</span>
                </Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  onChange={(e) => inputChangeHandler(e, "mobileNumber")}
                  onBlur={(e) => inputBlurHandler(e, "mobileNumber")}
                  value={addressDetails.mobileNumber.value}
                />
                <span className="error-required">
                  {addressDetails.mobileNumber.invalid
                    ? addressDetails.mobileNumber.helperText
                    : ""}
                </span>
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="checkout-label">
                  Email:<span id="required-field">*</span>
                </Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={(e) => inputChangeHandler(e, "email")}
                  onBlur={(e) => inputBlurHandler(e, "email")}
                  value={addressDetails.email.value}
                />
                <span className="error-required">
                  {addressDetails.email.invalid
                    ? addressDetails.email.helperText
                    : ""}
                </span>
              </Col>
            </Row>
          </Form.Group>
          {/* <Button className="order-button" onClick={(e) => handleSubmit(e)}>
            Pay Now
          </Button> */}
          {currency === "INR" ? (
            <Button className="order-button" onClick={(e) => handleSubmit(e)}>
              Pay Now
            </Button>
          ) : (
            <div ref={paypalRef} />
          )}
        </Form>
      )}
    </div>
  );
}

export default enhancer(PaypalForm);
