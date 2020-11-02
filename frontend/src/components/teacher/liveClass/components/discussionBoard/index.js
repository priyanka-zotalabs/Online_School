import React, { useState, useEffect } from 'react'
import enhancer from './enhancer'
import "./style.scss";
import moment from "moment";
import Avatar from "react-avatar";

const DiscussionBoard = (props) => {
    let {
        allMessages,
        newMessage,
        handleMessageSendText,
        sendMessageOnSocket,
        auth
    } = props;

    return (
        <>
            <div className="ldbmsger" style={{ width: "100%" }}>
                <header className="ldbmsger-header">
                    <div className="ldbmsger-header-title">
                        <i className="fas fa-comment-alt"></i> Eumetry Live Discussion
                    </div>
                </header>

                {/* message from self or other flag required */}

                <div className="ldbdiscussion-board">
                    {console.log("allMessages", allMessages)}
                    {allMessages ? allMessages.map(eachMessage => {
                        let message = eachMessage.message;
                        let senderId = eachMessage.senderDetails.senderId ? eachMessage.senderDetails.senderId : "404";
                        if (senderId == auth._id) {
                            return (
                                <div className="ldbmsg ldbright-msg" key={eachMessage.date}>
                                    <div className="ldbmsg-bubble">
                                        <div className="ldbmsg-info">
                                            <div className="ldbmsg-info-name">{eachMessage.senderDetails.name}</div>
                                            <div className="ldbmsg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                        </div>

                                        <div className="ldbmsg-text">{message}</div>
                                    </div>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className="ldbmsg ldbleft-msg" key={eachMessage.date}>
                                    <div className="ldbmsg-img" style={{ width: "25px", height: "25px" }}>{eachMessage.senderDetails.imageUrl ? <Avatar src={eachMessage.senderDetails.imageUrl} size="25" round={true} color="gray" /> : <Avatar name={eachMessage.senderDetails.name} size="25" round={true} color="gray" />}</div>
                                    <div className="ldbmsg-bubble">
                                        <div className="ldbmsg-info">
                                            <div className="ldbmsg-info-name">{eachMessage.senderDetails.name}</div>
                                            <div className="ldbmsg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                        </div>
                                        <div className="ldbmsg-text">{message}</div>
                                    </div>
                                </div>
                            );
                        }
                    }) : null}
                </div>

                <form className="ldbmsger-inputarea">
                    <input type="text" id="messageInput" className="ldbmsger-input" placeholder="Enter your message..." onChange={(e) => handleMessageSendText(e.target.value)} value={newMessage}
                        value={newMessage} />
                    <button type="submit" className="ldbmsger-send-btn" onClick={(e) => sendMessageOnSocket(e)}>Send</button>
                </form>
            </div>
        </>
    )

}

export default enhancer(DiscussionBoard);