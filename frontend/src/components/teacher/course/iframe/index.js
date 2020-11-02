import React from "react";
import ReactDOM from "react-dom";
import Iframe from "react-iframe";
import HorizontalColoredTab from "./tab/index";
import enhancer from "./enhancer";
import Loading from "../../../../shared/Components/Loading/index";

import { Accordion, Card } from "react-bootstrap";
import "./styles.css";
// import TeacherLiveClass from "../../liveClass/Call";
const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
const VideoPlayer = (props) => {
  let {
    data,
    moduleData,
    loader,
    url,
    handleLink,
    teacherCurrentCourse,
    selected,
    imageShow,
  } = props;

  return (
    <div className="iframe_background" style={{ marginLeft: "-2%",marginTop:"5px"}}>
      {loader ? (
        <Loading isLoading={true}></Loading>
      ) : (
        <div
          style={{
            display: "grid",
            // gridTemplateColumns: "68% 36.5%",
            gridTemplateColumns:  "74% 31%",

            paddingLeft:"8px",
            paddingRight:"15px",
          }}
        >
          <div className="Iframe">
            {imageShow ? (
              <Card id="card-accordian">
                <Card.Header  style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>{moduleData.name}</Card.Header>
                <Card.Img style={{padding:"15px"}} variant="top" src={moduleData.modulesImageUrl} />
                <Card.Body>
                  <Card.Title style={{fontSize:"20px",color:"#175592",fontWeight:"bold"}}>About this module</Card.Title>
                  <Card.Text  style={{fontSize:"13px",color:"#0D1925"}}>{moduleData.description}</Card.Text>
                </Card.Body>
              </Card>
            ) : url.typeOfContent == "Video" ? (
              // <Vimeo video={url.value} />
              // "https://player.vimeo.com/video/286794359"
              // <Vimeo
              //   video={url.value}
              //   width="900"
              //   controls={true}
              //   responsive={true}
              //   height="350"
              // />
              <iframe
                src={url.value}
                height="550px"
                width="100%"
                allowFullScreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                frameborder="0"

                // frameborder="0" 
                // marginheight="0" 
                // marginwidth="0" 
                // width="100%" 
                // height="100%" 
                // scrolling="auto"
              ></iframe>
            ) : (
              <Iframe
                src={url.value + "#toolbar=0"}
                height="800px"
                width="100%"
                allowFullScreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                frameborder="0"
              />
            )}
          </div>
          <div
            style={{
              marginLeft: "8%",
              // height: "100vh",
              height:"auto",
              backgroundColor: "#fff",
              boxShadow: "-8px 0px 6px 1px rgba(197,193,193,1)",
            }}
          >
            {/* <TeacherLiveClass /> */}
            <Accordion defaultActiveKey={1}>
              {moduleData.chapters.map((chapter, index) => (
                // <div style={{ position: "relative", zIndex: "100" }}>
                
                <Card id="card-accordian-teacher" key={index} style={{height:"100%"}}>

{/* <span>priyanka</span> */}
                  <Accordion.Toggle as={Card.Header} eventKey={index + 1} 
                  style={{fontSize:"20px",color:"#175592"}} >
                    {chapter.name}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index + 1} >
                    <Card.Body id="card-accordian-body-teacher" style={{marginTop:"20px",marginBottom:"20px",height:"1000px"}}>
                      <HorizontalColoredTab
                        data={moduleData}
                        topic={chapter}
                        linkHandle={handleLink}
                        courseData={teacherCurrentCourse}
                        selected={selected}
                        contentData={url}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                // </div>
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
// import { Accordion, Card } from "react-bootstrap";
// import "./styles.css";
// import TeacherLiveClass from "../../liveClass/Call";
// const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
// const VideoPlayer = (props) => {
//   let {
//     data,
//     moduleData,
//     loader,
//     url,
//     handleLink,
//     teacherCurrentCourse,
//     selected,
//     imageShow,
//   } = props;

//   return (
//     <div className="iframe_background" style={{ marginLeft: "-3%" }}>
//       {loader ? (
//         <Loading isLoading={true}></Loading>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "68% 35%",
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
//               // <Vimeo video={url.value} />
//               // "https://player.vimeo.com/video/286794359"
//               // <Vimeo
//               //   video={url.value}
//               //   width="900"
//               //   controls={true}
//               //   responsive={true}
//               //   height="350"
//               // />
//               <iframe
//                 src={url.value}
//                 height="400px"
//                 width="100%"
//                 allowFullScreen="true"
//                 webkitallowfullscreen="true"
//                 mozallowfullscreen="true"
//                 frameborder="0"

//                 // frameborder="0"
//                 // marginheight="0"
//                 // marginwidth="0"
//                 // width="100%"
//                 // height="100%"
//                 // scrolling="auto"
//               ></iframe>
//             ) : (
//               <Iframe
//                 src={url.value + "#toolbar=0"}
//                 height="400px"
//                 width="100%"
//                 allowFullScreen="true"
//                 webkitallowfullscreen="true"
//                 mozallowfullscreen="true"
//                 frameborder="0"
//               />
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
//             <TeacherLiveClass />
//             <Accordion defaultActiveKey={1}>
//               {moduleData.chapters.map((chapter, index) => (
//                 // <div style={{ position: "relative", zIndex: "100" }}>
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
//                         courseData={teacherCurrentCourse}
//                         selected={selected}
//                         contentData={url}
//                       />
//                     </Card.Body>
//                   </Accordion.Collapse>
//                 </Card>
//                 // </div>
//               ))}
//             </Accordion>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default enhancer(VideoPlayer);







//
// import React from "react";
// import ReactDOM from "react-dom";
// import Iframe from "react-iframe";
// import HorizontalColoredTab from "./tab/index";
// import enhancer from "./enhancer";
// import Loading from "../../../../shared/Components/Loading/index";

// import "./styles.css";

// const video = "https://www.youtube.com/embed/kCDNCJt2tsg";
// const VideoPlayer = (props) => {
//   let { data, moduleData, loader, url, handleLink } = props;
//   // console.log("moduleData", url);
//   return (
//     <div>
//       {loader ? (
//         <Loading isLoading={true}></Loading>
//       ) : (
//         <div className="Iframe">
//           <Iframe
//             src={url}
//             height="400px"
//             width="100%"
//             allowFullScreen="true"
//             webkitallowfullscreen="true"
//             mozallowfullscreen="true"
//             frameborder="0"
//             // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//           />
//           <div className="tab" style={{ marginTop: "3%" }}>
//             <HorizontalColoredTab
//               data={moduleData}
//               topic={data}
//               linkHandle={handleLink}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default enhancer(VideoPlayer);
