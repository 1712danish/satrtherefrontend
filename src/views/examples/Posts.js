
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import ReadMoreReact from 'read-more-react';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Loader from 'react-loader-spinner'

// core components
import UserHeader from "components/Headers/UserHeader.js";
import UploadButtons from "../../components/upload"
import SimpleModal from "../../components/modal"
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import "./style.scss"


const userName = localStorage.getItem("name");
const email = localStorage.getItem("email");

function Post() {

  const [state, setState] = useState(0)

  function incrementMe() {
    let newCount = state + 1
    setState(newCount)
  }


  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
      promiseInProgress &&
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    );
  }


  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("/getpost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then((result) => {
        console.log("------", result)


        setData(result);

      });

  }, [])



  return (
    <>
      <UserHeader />
      {/* Page content */}

      <Row style={{ margin: "15px" }}>

        {data && data[0] ?
          data.map(object => {

            // console.log("----", object.userId)
            return (
              <Col xs="4">

                <div

                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",


                    padding: "15px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    maxWidth: "500px",
                    marginLeft: "30px",


                    borderBottom: "2px solid gray",
                  }}>
                  <div style={{ textAlign: "center" }}>
                    <b>{object.postTitle}</b><br /><br />
                  </div>
                  <div>
                    <img
                      style={{
                        marginTop: "8px",
                        marginLeft: "30px",
                        height: "300px",
                        width: "300px",
                        borderRadius: "10px",
                      }}
                      src={object.postUrl}
                    />
                    <br />
                    <br />
                    <hr />
                  </div>

                  <div>

                    <ReadMoreReact text={object.description}
                      min={9}
                      embedCSS="false"
                      readMoreText= "show more..." />

                  </div>
                  <br />
                  <hr />
                  <div style={{ textAlign: "center" }}>
                    <button onClick={incrementMe}
                     ><i class="far fa-thumbs-up"> {state}</i></button>
                  </div>

                </div>
              </Col>
            )

          }


          ) : <div><h3>Sorry no post to show!</h3></div>

        }
      </Row>


    </>
  );

}

export default Post;
