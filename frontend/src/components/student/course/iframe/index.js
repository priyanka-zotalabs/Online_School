import React from "react";
import ReactDOM from "react-dom";
import Iframe from "react-iframe";
import HorizontalColoredTab from "./tab/index";
import enhancer from "./enhancer";
import Loading from "../../../../shared/Components/Loading/index";
import { Paper } from "@material-ui/core";

import { Accordion, Card } from "react-bootstrap";
import AccordionMaterial from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./styles.css";
// import StudentLiveClass from "../../liveClass/Call";
const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
const VideoPlayer = (props) => {
  let {
    data,
    moduleData,
    loader,
    url,
    handleLink,
    studentCurrentCourse,
    selected,
    imageShow,
  } = props;

  console.log("iFrame", url);

  return (
    <div className="iframe_background" style={{ marginLeft: "-3%",marginTop:"5px", marginBottom:"2%"}}>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div
          style={{
            display: "grid",
            // gridTemplateColumns: "85% 41%",
            // gridTemplateColumns: "68% 38%",
            gridTemplateColumns: "75% 30%",

            paddingLeft:"15px",
            paddingRight:"15px",
          }}
        >
          <div className="Iframe">
            {imageShow ? (
              <Card id="card-accordian">
                <Card.Header style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>{moduleData.name}</Card.Header>
                <Card.Img style={{padding:"15px"}} variant="top" src={moduleData.modulesImageUrl} />
                <Card.Body>
                  <Card.Title style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>About this module</Card.Title>
                  <Card.Text style={{fontSize:"13px",color:"#0D1925"}}>{moduleData.description}</Card.Text>
                </Card.Body>
              </Card>
            ) : url.typeOfContent == "Video" ? (
              <div>

                  
          {/* import {Paper} from "@material-ui/core";  */}
          {/* import { Modal, Button, Row, Col, Form } from "react-bootstrap"; */}

          <Paper elevation={1} id="paper-test-header">
            {/* <Paper className={classes.paper} > */}
            <span className="create-test">
              
            {moduleData.name}
                    {"-"}
                    {url.title}
            </span>
           
          </Paper>
                {/* <div className="course-title">
                  <span id="main-heading-courses-new">
                    {moduleData.name}
                    {"-"}
                    {url.title}
                  </span>
                </div> */}
                <div style={{ marginTop: "3%" }}>
                  <iframe
                    src={url.value}
                    height="600px"
                    width="100%"
                    allowFullScreen="true"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    frameborder="0"
                  ></iframe>
                </div>

                <AccordionMaterial>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{fontSize:"20px",color:"#175592"}}>About this content</Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography style={{fontSize:"13px",color:"#0D1925"}}>{url.description}</Typography>
                  </AccordionDetails>
                </AccordionMaterial>
              </div>
            ) : (
              <div>
                {/* <Paper elevation={1}> */}
 {/* import {Paper} from "@material-ui/core";  */}
          {/* import { Modal, Button, Row, Col, Form } from "react-bootstrap"; */}

          <Paper elevation={1} id="paper-test-header">
          
            <span className="create-test">

            {moduleData.name}
                      {"-"}
                      {url.title}
            </span>
            
          </Paper>

{/* 
                  <div className="course-title">
                    <span id="main-heading-courses-new">
                      {moduleData.name}
                      {"-"}
                      {url.title}
                    </span>
                  </div> */}
                {/* </Paper> */}
                <div style={{ marginTop: "3%" }}>
                  <Iframe
                    src={url.value + "#toolbar=0"}
                    height="600px"
                    width="100%"
                    allowFullScreen="true"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    frameborder="0"
                  />
                </div>

                <AccordionMaterial>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{fontSize:"22px",color:"#175592"}}>Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>About this content</Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography style={{fontSize:"13px",color:"#0D1925"}}>{url.description}</Typography>
                  </AccordionDetails>
                </AccordionMaterial>
              </div>
            )}
          </div>

          <div
            style={{
              marginLeft: "8%",
              // height: "1100px",
              height:"auto",
              backgroundColor: "#fff",
              boxShadow: "-8px 0px 6px 1px rgba(197,193,193,1)",
            }}
          >
            {/* Live class */}
            {/* <StudentLiveClass /> */}
            <Accordion defaultActiveKey={1}>
              {moduleData.chapters.map((chapter, index) => (
                <Card id="card-accordian" key={index}
                //  style={{padding:"35px",height:"55px"}}
                style={{height:"100%"}}
                >
                  <Accordion.Toggle 
                  
                  style={{padding:"35px",height:"55px"}}
                  as={Card.Header} eventKey={index + 1}>
                    <span  style={{marginTop:"5px"}}>{chapter.name}</span>
                    
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1}  
                  // style={{height:"1100px"}}
                  >
                    <Card.Body id="card-accordian-body" style={{marginTop:"20px",height:"1100px"}}>
                      <HorizontalColoredTab
                        data={moduleData}
                        topic={chapter}
                        linkHandle={handleLink}
                        courseData={studentCurrentCourse}
                        selected={selected}
                        contentData={url}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default enhancer(VideoPlayer);





















// import React from "react";
// import ReactDOM from "react-dom";
// import Iframe from "react-iframe";
// import HorizontalColoredTab from "./tab/index";
// import enhancer from "./enhancer";
// import Loading from "../../../../shared/Components/Loading/index";
// import { Paper } from "@material-ui/core";
// import { Accordion, Card } from "react-bootstrap";
// import AccordionMaterial from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import "./styles.css";
// import StudentLiveClass from "../../liveClass/Call";
// const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
// const VideoPlayer = (props) => {
//   let {
//     data,
//     moduleData,
//     loader,
//     url,
//     handleLink,
//     studentCurrentCourse,
//     selected,
//     imageShow,
//   } = props;

//   console.log("iFrame", url);

//   return (
//     <div className="iframe_background" style={{ marginLeft: "-7%" }}>
//       {loader ? (
//         <Loading isLoading={true}></Loading>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "85% 41%",
//           }}
//         >
//           <div className="Iframe">
//             {imageShow ? (
//               <Card id="card-accordian">
//                 <Card.Header>{moduleData.name}</Card.Header>
//                 <Card.Img variant="top" src={moduleData.modulesImageUrl} />
//                 <Card.Body>
//                   <Card.Title>About this module</Card.Title>
//                   <Card.Text>{moduleData.description}</Card.Text>
//                 </Card.Body>
//               </Card>
//             ) : url.typeOfContent == "Video" ? (
//               <div>
//                 <div className="course-title">
//                   <span id="main-heading-courses-new">
//                     {moduleData.name}
//                     {"-"}
//                     {url.title}
//                   </span>
//                 </div>
//                 <div style={{ marginTop: "3%" }}>
//                   <iframe
//                     src={url.value}
//                     height="400px"
//                     width="100%"
//                     allowFullScreen="true"
//                     webkitallowfullscreen="true"
//                     mozallowfullscreen="true"
//                     frameborder="0"
//                   ></iframe>
//                 </div>

//                 <AccordionMaterial>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography>Details</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography>About this content</Typography>
//                   </AccordionDetails>
//                   <AccordionDetails>
//                     <Typography>{url.description}</Typography>
//                   </AccordionDetails>
//                 </AccordionMaterial>
//               </div>
//             ) : (
//               <div>
//                 <Paper elevation={1}>
//                   <div className="course-title">
//                     <span id="main-heading-courses-new">
//                       {moduleData.name}
//                       {"-"}
//                       {url.title}
//                     </span>
//                   </div>
//                 </Paper>
//                 <div style={{ marginTop: "3%" }}>
//                   <Iframe
//                     src={url.value + "#toolbar=0"}
//                     height="400px"
//                     width="100%"
//                     allowFullScreen="true"
//                     webkitallowfullscreen="true"
//                     mozallowfullscreen="true"
//                     frameborder="0"
//                   />
//                 </div>

//                 <AccordionMaterial>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography>Details</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography>About this content</Typography>
//                   </AccordionDetails>
//                   <AccordionDetails>
//                     <Typography>{url.description}</Typography>
//                   </AccordionDetails>
//                 </AccordionMaterial>
//               </div>
//             )}
//           </div>

//           <div
//             style={{
//               marginLeft: "5%",
//               height: "100vh",
//               backgroundColor: "#fff",
//               boxShadow: "-8px 0px 6px 1px rgba(197,193,193,1)",
//             }}
//           >
//             {/* Live class */}
//             <StudentLiveClass />
//             <Accordion defaultActiveKey={1}>
//               {moduleData.chapters.map((chapter, index) => (
//                 <Card id="card-accordian" key={index}>
//                   <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
//                     {chapter.name}
//                   </Accordion.Toggle>
//                   <Accordion.Collapse eventKey={index + 1}>
//                     <Card.Body id="card-accordian-body">
//                       <HorizontalColoredTab
//                         data={moduleData}
//                         topic={chapter}
//                         linkHandle={handleLink}
//                         courseData={studentCurrentCourse}
//                         selected={selected}
//                         contentData={url}
//                       />
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//               ))}
//             </Accordion>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default enhancer(VideoPlayer);
// //
// // import React from "react";
// // import ReactDOM from "react-dom";
// // import Iframe from "react-iframe";
// // import HorizontalColoredTab from "./tab/index";
// // import enhancer from "./enhancer";
// // import Loading from "../../../../shared/Components/Loading/index";

// // import "./styles.css";

// // const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
// // const VideoPlayer = (props) => {
// //   let { data, moduleData, loader, url, handleLink } = props;
// //   // console.log("moduleData", url);
// //   return (
// //     <div>
// //       {loader ? (
// //         <Loading isLoading={true}></Loading>
// //       ) : (
// //         <div className="Iframe">
// //           <Iframe
// //             src={url}
// //             height="400px"
// //             width="100%"
// //             allowFullScreen="true"
// //             webkitallowfullscreen="true"
// //             mozallowfullscreen="true"
// //             frameborder="0"
// //             // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
// //           />
// //           <div className="tab" style={{ marginTop: "3%" }}>
// //             <HorizontalColoredTab
// //               data={moduleData}
// //               topic={data}
// //               linkHandle={handleLink}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default enhancer(VideoPlayer);
