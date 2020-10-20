
import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom"




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
import PostModal from "../../components/PostModal"
import { usePromiseTracker, trackPromise } from "react-promise-tracker";




const userName = localStorage.getItem("name");
const email = localStorage.getItem("email");

function Profile() {


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

  const history = useHistory()
  const [flag, setFlag] = useState(true)
  const [aoi, setAOI] = useState("")
  const [skills, setSkills] = useState("")
  const [address, setAdd] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [about, setAbout] = useState("")
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);

//  const {id} = useParams()

  useEffect(() => {

    fetch(`/showprofile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then((result) => {
        // console.log("------******", result)
        // console.log(image);

        setData(result);

      });
    // console.log(userName, email)

  }, [])


  


  // function myPic() {
  //   const profilePic = new FormData();
  //   profilePic.append("file", image);
  //   profilePic.append("upload_preset", "learnerConsultant");
  //   profilePic.append("cloud_name", "danish1712");


  //   trackPromise(
  //     fetch("https://api.cloudinary.com/v1_1/danish1712/image/upload", {
  //       method: "post",
  //       body: profilePic

  //     }).then(res =>
  //       res.json()).then(

  //         data => {
  //           setImageUrl(data.url)
  //         }
  //       ).catch(err => {
  //         console.log(err);
  //       }))

  // }

  function changeProfile() {
    fetch("/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        areaOfInterest: (aoi != "" ? aoi.split(",").map(e=>e.trim()) : undefined),
        skills: (skills != "" ? skills.split(",").map(e=>e.trim()) : undefined),
        address: (address != "" ? address : undefined),
        city: (city != "" ? city : undefined),
        country: (country != "" ? country : undefined),
        about: (about != "" ? about : undefined),
        imageUrl: (image != "" ? image : undefined)
      })
    }).then(res =>
      res.json()

    ).then(data => {
      console.log()
      // console.log(data);
      // console.log(image)




      if (data.error) {
        console.error(data.error)
      } else {

        // history.push("/admin/user-profile")
         window.location.reload(false);

      }



    }).catch(err => {
      console.log(err);
    })
  }






  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <LoadingIndicator />
                    <img
                      alt="..."
                      style={{height:"190px",width:"195px"}}
                      className="rounded-circle"
                      src={data && data[0]&& data[0].imageUrl}
                    />
                    

                  </div>
                </Col>
                 <SimpleModal /> 
                 
              </Row>
              
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col" style={{marginTop:"10px"}}>
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {userName}

                  </h3>

                  <div>
                    <i className="ni education_hat mr-2" />
                    {email}
                  </div>
                  <hr className="my-4" />
                  
                  <PostModal />
                
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>

                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => setFlag(false)}
                      size="sm"
                    >
                      Edit
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                            </label>
                          <Input
                            className="form-control-alternative"

                            id="input-username"
                            placeholder={userName}
                            disabled={flag}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                            </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            disabled="true"
                            placeholder={email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Role
                            </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder={data && data[0] ? data[0].userId.role : null}
                            disabled={flag}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      {data && data[0] ? data[0].userId.role == "Learner" ?
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Area of interest
                          </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => { setAOI(e.target.value) }}
                              id="input-username"
                              placeholder={data && data[0] ? data[0].areaOfInterest : null}
                              disabled={flag}
                              type="text"
                            />
                          </FormGroup>
                        </Col> :
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Skills
                        </label>
                            <Input
                              className="form-control-alternative"
                              onChange={(e) => { setSkills(e.target.value) }}

                              id="input-username"
                              placeholder={data && data[0] ? data[0].skills : null}
                              disabled={flag}
                              type="text"
                            />
                          </FormGroup>
                        </Col> :
                        null}

                    </Row>

                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(e) => { setAdd(e.target.value) }}

                            id="input-address"
                            disabled={flag}
                            placeholder={data && data[0] ? data[0].address : null}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(e) => { setCity(e.target.value) }}

                            id="input-city"
                            disabled={flag}
                            placeholder={data && data[0] ? data[0].city : null}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(e) => { setCountry(e.target.value) }}

                            id="input-country"
                            placeholder={data && data[0] ? data[0].country : null}
                            disabled={flag}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        onChange={(e) => { setAbout(e.target.value) }}

                        placeholder={data && data[0] ? data[0].about : null}
                        rows="4"
                        disabled={flag}

                        type="textarea"
                      />
                    </FormGroup>
                  </div>


                </Form>
              </CardBody>
              {flag == false ?
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                    </Col>

                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={async () => {
                          await changeProfile();
                          setFlag(true)
                        }}
                        size="sm"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                : null}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default Profile;
