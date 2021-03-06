import React from "react";
import { Grid } from "@material-ui/core";
import { Col } from "react-bootstrap";
import "./style.css";

export default function Description(props) {
  // console.table("data", props);
  // let a = props.selected;
  // if (a === undefined) {
  //   console.log("unde");
  //   a = 0;
  // } else {
  //   console.log("else", a);
  //   a = props.selected;
  // }

  // console.log("a", a);

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      {props.topic.content.map((chapter, index) => (
        <Col xs={12} sm={12} md={12} key={index} id="content-data">
          {index === props.selected ? (
            <h2
              onClick={() => props.linkHandle(chapter, index)}
              style={{ backgroundColor: "#f6f6f6" }}
            >
              {chapter.description}
            </h2>
          ) : (
            <h2
              onClick={() => props.linkHandle(chapter, index)}
              style={{ backgroundColor: "white" }}
            >
              {chapter.description}
            </h2>
          )}
        </Col>

        // <Col
        //   xs={12}
        //   sm={12}
        //   md={12}
        //   key={index}
        // >

        //   <a
        //     onClick={() => props.linkHandle(chapter)}
        //     style={{ cursor: "pointer", color: "blue" }}
        //   >
        //     {chapter.description}
        //   </a>
        // </Col>
      ))}
    </Grid>
  );
}
