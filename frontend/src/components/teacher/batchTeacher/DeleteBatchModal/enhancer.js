import { compose } from "redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { urls } from "../../../../../src/url";

import { appConfig } from "../../../../../src/constants";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import addNewBatchFormInit from "./addNewBatchForm";
// import { validate } from "../../../../shared/helpers/formValidation";
import { toast } from "react-toastify";

export let enhancer = compose(
  connect(({ auth, }) => ({ auth, })),
  withRouter,
  (DeleteBatch) => ({
    auth,

    ...props
  }) => {
    let [loader, setLoader] = useState(false);
    // useEffect(() => {
    //     deleteParicularBatches();
    //   }, []);
    const deleteParicularBatches = () => {
        setLoader(true);
        axios
          .delete(`${appConfig.host}${urls.deleteParticularBatch}`)
          .then((result) => {
            console.log("delete batch API called ", result.data.data);
  
            // setAllBatchList(result.data.data);
            // console.log("batch list get scuessfully");
  
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
          });
      };

    return (
        <DeleteBatch
          {...props}
          {...{
            auth,
            deleteParicularBatches,
            loader,
          }}
        />
      );
    }
  );
  
  export default enhancer;
  