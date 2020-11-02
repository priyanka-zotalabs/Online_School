import React, { useRef, useEffect } from 'react'
import enhancer from './enhancer'
import "./style.scss";
import moment from "moment";
import Avatar from "react-avatar";

const DiscussionBoard = (props) => {
    let {
        auth,
        allMessages,
        newMessage,
        handleMessageSendText,
        contentName,
        sendMessageOnSocket
    } = props;

    const dummy = useRef();
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages.length]);

    return (
        <div className="msger">
            <header className="msger-header">
                <div className="msger-header-title">
                    <i className="fas fa-comment-alt"></i>{"    "} {contentName}
                </div>
            </header>

            {/* message from self or other flag required */}

            <div className="discussion-board">
                {allMessages ? allMessages.map(eachMessage => {
                    let message = eachMessage.message;
                    let name = eachMessage.senderDetails ? eachMessage.senderDetails.name : "Server Error";
                    let senderId = eachMessage.senderDetails.senderId ? eachMessage.senderDetails.senderId : "404";

                    if (senderId == auth._id) {
                        return (
                            <div className="msg right-msg" key={eachMessage.date} >
                                {/* <div className="msg-img" style={{ width: "25px", height: "25px" }}><Avatar name={name} size="25" round={true} color/></div> */}
                                <div className="msg-bubble">
                                    <div className="msg-info">
                                        {/* <div className="msg-info-name">{name}</div> */}
                                        <div className="msg-info-name">{" "}</div>
                                        <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                    </div>
                                    <div className="msg-text">{message}</div>
                                </div>
                            </div>
                        );
                    }
                    else {
                        return (
                            <div className="msg left-msg" key={eachMessage.date}>
                                <div className="msg-img" style={{ width: "25px", height: "25px" }}>{eachMessage.senderDetails.imageUrl ? <Avatar src={eachMessage.senderDetails.imageUrl} size="25" round={true} color="gray" /> : <Avatar name={name} size="25" round={true} color="gray" />}</div>

                                <div className="msg-bubble">
                                    <div className="msg-info">
                                        <div className="msg-info-name">{name}</div>
                                        <div className="msg-info-time">{moment(eachMessage.date).format("hh:mm A")}</div>
                                    </div>
                                    <div className="msg-text">{message}</div>
                                </div>
                            </div>
                        );
                    }
                }) : null}
                <span ref={dummy}></span>
            </div>

            <form className="msger-inputarea">
                <input type="text" id="messageInput" className="msger-input" placeholder="Enter your message..." onChange={(e) => handleMessageSendText(e.target.value)} value={newMessage}
                    value={newMessage} />
                <button type="submit" className="msger-send-btn" onClick={(e) => sendMessageOnSocket(e)}>Send</button>
            </form>
        </div>
    )

}

export default React.memo(enhancer(DiscussionBoard));