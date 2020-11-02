import React, { Fragment,useState } from "react";
import "./style.scss";
import enhancer from "./enhancer";
import TandCModal from "./T&CModal/index";
import Loading from "../../shared/Components/Loading";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaRoad } from "react-icons/fa";

const ChangePassword = (props) => {
  let {
    handleChangePassword,
    loader,
    inputBlurHandler,
    inputChangeHandler,
    passwordForm,
    formIsValid,
    error,
    handleCheckbox,
    isChecked,
    isFirstTimeLogin
  } = props;

  const [modalShow, setModalShow] = useState(false);
  return (
    <div style={{ marginTop: "10%" }}>

      <TandCModal
        show={modalShow}
        onHide={() => setModalShow(false)}

      />

      <Container>
        <Form>
          <Form.Group as={Row}>
            <Form.Label
              column
              md={{ span: "3", offset: "1" }}
              sm={{ span: "3", offset: "1" }}
            >
              Current Password:
            </Form.Label>
            <Col md={7} sm={7}>
              <Form.Control
                type="password"
                name="currentPassword"
                onChange={(e) => inputChangeHandler(e, "currentPassword")}
                onBlur={(e) => inputBlurHandler(e, "currentPassword")}
                value={passwordForm.currentPassword.value}
              />
            </Col>
            <span className="error-message">
              {passwordForm.currentPassword.invalid
                ? passwordForm.currentPassword.helperText
                : ""}
            </span>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label
              column
              md={{ span: "3", offset: "1" }}
              sm={{ span: "3", offset: "1" }}
            >
              New Password<span id="required-field">*</span> :
            </Form.Label>
            <Col md={7} sm={7}>
              <Form.Control
                type="password"
                name="newPassword"
                onChange={(e) => inputChangeHandler(e, "newPassword")}
                onBlur={(e) => inputBlurHandler(e, "newPassword")}
                value={passwordForm.newPassword.value}
              />
            </Col>
            <span className="error-message">
              {passwordForm.newPassword.invalid
                ? passwordForm.newPassword.helperText
                : ""}
            </span>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label
              column
              md={{ span: "3", offset: "1" }}
              sm={{ span: "3", offset: "1" }}
            >
              Confirm New Password <span id="required-field">*</span> :
            </Form.Label>
            <Col md={7} sm={7}>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={(e) => inputChangeHandler(e, "confirmPassword")}
                onBlur={(e) => inputBlurHandler(e, "confirmPassword")}
                value={passwordForm.confirmPassword.value}
              />
            </Col>
            <span className="error-message">
              {passwordForm.confirmPassword.invalid
                ? passwordForm.confirmPassword.helperText
                : ""}
            </span>
          </Form.Group>
          <Row>

            <Col md={{ span: 1, offset: 5 }} sm={{ span: 1, offset: 2 }} >
              <div style={{ paddingLeft: "50px" }}>
              {console.log("checkbox clicked once",isChecked)}
                <Form.Check
                  inline
                  disabled={!(isFirstTimeLogin)}
                  checked={isChecked}
                  // label=""
                  type={'checkbox'}
                  id={`inline-checkbox-1`}
                  onClick={(e) => handleCheckbox(e)}
                />
              </div>
            </Col>
            <Col sm={6} md={6}>

              <span style={{ fontSize: "12px", textAlign: "right" }}>
                I accept the <span style={{ color: "blue", textDecoration: "underline" }} onClick={() => setModalShow(true)}>
                  Terms and Conditions</span></span>

              {/* <p>I accept the <span>Terms and Conditions</span></p> */}
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: "4", offset: "6" }}
              sm={{ span: "4", offset: "6" }}
            >
              <Button onClick={(e) => handleChangePassword()} style={{backgroundColor:"#8499ff"}}>Save</Button>
            </Col>
            <span className="error-message">{error ? error : ""}</span>
          </Row>


        </Form>
      </Container>
    </div>
  );
};

export default enhancer(ChangePassword);
