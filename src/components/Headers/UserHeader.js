/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom"
// import { Button, Container, Row, Col } from "reactstrap";
import io from "socket.io-client";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SOCKET_IO_URL = "http://127.0.0.1:5000";
let socket;


// reactstrap components
function UserHeader() {

  

  socket = io.connect(SOCKET_IO_URL,{
    query: {
      id : localStorage.getItem("_id")
    }
  });

  const [initialized, setInitialized] = useState(false);
  // const [mssg, setMssg] = useState("");
  // const { id } = useParams();

  const connectToRoom = () => {
    console.log("---------id", localStorage.getItem("_id"))
    socket.emit("join", {
      id: localStorage.getItem("_id")
    });

    socket.on("newMessage", data => {
      console.log("hi recieved a new message", data);
      if(data){
        toast("new message recieved");
      }

      

    });
    socket.on("messageRecieved", data => {
      console.log("hi recieved a new message", data)
      if(data){
        toast(JSON.stringify(data.name) +":"+data.message);
        console.log("hi recieved a new message-------")

      }



      });
    setInitialized(true);
  };
  useEffect(() => {
    if (!initialized) {
      connectToRoom()
    }
  });

  return (
    <>
  <ToastContainer></ToastContainer>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "450px",
          backgroundImage:
            "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        
      
      </div>
    </>
  );

}

export default UserHeader;
