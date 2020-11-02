import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./style.scss";
import MediaPlayer from "./MediaPlayer";

const Index = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        dialolassName="modal-100w modal-100h"
        aria-labelledby="example-custom-modal-styling-title"
        style={{ width: "100%" }}
      >
        <Modal.Body style={{ width: "100%", height: "100%", padding: "2%", textAlign: "center" }}>
          <MediaPlayer videoTrack={props.videoTrack} audioTrack={props.audioTrack}></MediaPlayer>
        </Modal.Body>
        <Modal.Footer>
          <button style={{ backgroundColor: "#EB952D", fontWeight: "bold", color: "white", border: "none" }} type='button' onClick={props.onHide}> <i class="fas fa-compress"></i> </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Index;

