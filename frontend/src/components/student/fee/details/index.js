import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { urls } from "../../../../url";
import { appConfig } from "../../../../constants";
import axios from "axios";

import { Paper } from "@material-ui/core";
import PaypalForm from "../checkoutFom/index";

function FeeDetails(props) {
  const [checkBox, setCheckBox] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [installmentId, setInsallmentId] = useState("");
  const [currecy, setCurrecy] = useState("");
  let { id } = props.match.params;

  useEffect(() => {
    setAmount(0);
    setCourseName("");
  }, []);

  useEffect(() => {
    axios.get(`${appConfig.host}${urls.getStudentBatchId}`).then((result) => {
      result.data.data.forEach((batch) => {
        if (batch._id === id) {
          let tempArray = [];
          setCurrecy(batch.currency);
          setCourseName(batch.courseId.name);
          batch.installments.map((installment) => {
            let temp = {};
            let tempStatus;

            if (installment.isPaid) {
              tempStatus = "paid";
            } else {
              let pickedDate = installment.date.split("-");
              pickedDate = new Date(
                parseInt(pickedDate[2], 10),
                parseInt(pickedDate[1], 10) - 1,
                parseInt(pickedDate[0]),
                10
              ).getTime();
              let todaysDate = Date.parse(new Date());
              let dateDifference = Number(todaysDate) - pickedDate;
              if (dateDifference > 0) {
                tempStatus = "late";
              } else {
                tempStatus = "due";
              }
            }
            temp = {
              id: installment._id,
              date: installment.date,
              amount: installment.amount,
              status: tempStatus,
            };

            tempArray.push({ ...temp });
          });
          setFeeData([...tempArray]);
        }
      });
    });
  }, [id]);

  const handleCheck = (e, index) => {
    let temp = [...checkBox];
    if (e.target.checked) {
      temp.push(index);
      setCheckBox([...temp]);
    } else {
      let filtered = checkBox.filter((value) => {
        return value != index;
      });
      setCheckBox([...filtered]);
    }
    // console.log(e.target.checked, index);
  };

  const payButton = () => {
    let finalAmount = 0;
    if (checkBox.length >= 2) {
      // for (let i = 0; i < checkBox.length; i++) {
      //   finalAmount = finalAmount + parseFloat(feeData[checkBox[i]].amount);
      // }
      alert("Select only one installment");
    } else if (checkBox.length == 1) {
      finalAmount = parseFloat(feeData[checkBox[0]].amount);

      setInsallmentId(feeData[checkBox[0]].id);
    } else {
      alert("Select fee installment");
    }

    setAmount(finalAmount);
  };
  if (amount > 0) {
    return (
      <PaypalForm
        batchId={id}
        course={courseName}
        amount={amount}
        installmentId={installmentId}
        currency={currecy}
      />
    );
  }

  return (
    <React.Fragment>
      <Paper elevation={1} id="paper-batch-header">
        <span className="create-batch">Fee Structure {">"} Subject</span>
      </Paper>

      <Paper elevation={1} id="paper-batch-header">
        <div className="create-batch">
          Installments <hr />
          <div>
            {feeData.map((install, index) => {
              return (
                <div className="installment-data">
                  <div className="installment-check">
                    <input
                      type="checkbox"
                      id={index}
                      disabled={install.status == "paid"}
                      onChange={(e) => handleCheck(e, index)}
                    />
                  </div>

                  <div for={index} className="intallment-data-div">
                    <div
                      className={`${
                        (install.status == "due" &&
                          "intallment-data-div-due") ||
                        (install.status == "paid" &&
                          "intallment-data-div-paid") ||
                        (install.status == "late" && "intallment-data-div-late")
                      }`}
                    >
                      {install.date}
                    </div>
                    <div
                      className={`${
                        (install.status == "due" &&
                          "intallment-data-div-due") ||
                        (install.status == "paid" &&
                          "intallment-data-div-paid") ||
                        (install.status == "late" && "intallment-data-div-late")
                      }`}
                    >
                      {install.amount + " "}
                      {currecy}
                    </div>
                    <div>
                      {install.status == "paid" ? (
                        <i class="fas fa-calendar-check"></i>
                      ) : // <img src={paidImage}></img>
                      install.status == "due" ? (
                        <i class="fas fa-calendar-alt"></i>
                      ) : (
                        <i class="far fa-hourglass"></i>
                      )}
                      {" " + install.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
      <div className="pay-button">
        <button id="view-batch-btn-last" onClick={payButton}>
          Pay Now
        </button>
      </div>
    </React.Fragment>
  );
}

export default FeeDetails;
