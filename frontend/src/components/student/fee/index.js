import React, { useEffect, useState } from "react";
import "./style.scss";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import axios from "axios";
import {
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

const Fee = (props) => {
  const [data, setData] = useState([]);

  // const fetchData = () => {
  //   return axios
  //     .get(`${appConfig.host}${urls.getLogedStudentForBatch}`)
  //     .then((success) => {
  //       setData(data);
  //       // console.log("success", success);
  //       return success;
  //     })
  //     .then((success) => {
  //       let temp = [];
  //       var bar = new Promise((resolve, reject) => {
  //         success.data.userMetaData.Student.courses.forEach(
  //           (course, index, array) => {
  //             axios
  //               .get(
  //                 `${appConfig.host}${urls.getStudentBatchId}/${course.batchId._id}`
  //               )
  //               .then((result) => {
  //                 // console.log("result", result);
  //                 temp.push({
  //                   ...result.data.data,
  //                   batchId: course.batchId._id,
  //                 });
  //                 if (index === array.length - 1) resolve();
  //               });
  //           }
  //         );
  //       });
  //       bar.then(() => {
  //         setData([...temp]);
  //       });
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  const fetchData = () => {
    axios
      .get(`${appConfig.host}${urls.getStudentBatchId}`)
      .then((result) => {
        setData([...result.data.data]);
      })
      .catch((err) => console.log("fee error", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFeeView = (e, id) => {
    props.history.push(`/student/fee/${id}`);
  };

  return (
    <React.Fragment>
      <Paper elevation={1} id="paper-batch-header">
        <span className="create-batch">Fee Structure</span>
      </Paper>
      <div className="batch_card">
        {/* </Container> */}
        <Grid container spacing={3}>
          {/* first card */}
          {data.map((batch, index) => (
            <Grid item xs={4} key={index}>
              <Card className="batch_cardHeading">
                <CardContent id="batch-card-heading-bgcolor">
                  <div>
                    {/* card heading */}
                    <Typography gutterBottom variant="bold" component="h6">
                      {batch.courseId.name}
                    </Typography>
                  </div>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" component="p">
                    <span style={{ fontWeight: "bold" }}>
                      Number of installment{" "}
                    </span>
                    {batch.installments.length}
                    <br />
                  </Typography>
                  <Typography variant="body2" component="p">
                    <span style={{ fontWeight: "bold" }}>Due Date </span>
                    {batch.installments.map((installment) => {
                      if (!installment.isPaid) {
                        return installment.date + "," + "\n";
                      }
                    })}
                    {/* 25/08/2020 */}
                    <br />
                  </Typography>

                  <button
                    id="view-batch-btn"
                    onClick={(e) => handleFeeView(e, batch._id)}
                  >
                    VIEW
                  </button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Paper elevation={1} id="paper-batch-header">
        <span className="create-batch">
          Reminders <hr />
          {data.map((batch, index) => (
            <div id="reminder-id" key={index}>
              {batch.courseId.name}
              <span style={{ fontWeight: "bold" }}> Fees Due on </span>
              {batch.installments.map((installment) => {
                if (!installment.isPaid) {
                  return installment.date + "," + "\n";
                }
              })}
              <hr />
            </div>
          ))}
        </span>
      </Paper>
    </React.Fragment>
  );
};

export default Fee;
