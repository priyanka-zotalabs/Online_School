import React from "react";
import enhancer from "./enhancer";
import { Link } from "react-router-dom";
import Loading from "../../../shared/Components/Loading/index";
function Message(props) {
  let { isSuccessful, paymentDetails, loader } = props;
  return (
    <div>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div>
          {isSuccessful ? (
            <div>
              <h1>Congrats, your payment has been received !</h1>
              <Link to="/">Home</Link>
            </div>
          ) : (
            <div>
              <h1>Issue with payment please try again.</h1>
              <Link to={`/student/fee/${paymentDetails.batchId}`}>
                Try Again
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default enhancer(Message);
