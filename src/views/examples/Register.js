
import React, { useState } from "react";
import Alert from '@material-ui/lab/Alert';



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  CardText,
  Label
} from "reactstrap";



function Register() {
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [interest, setInterest] = useState("")
  const [skill, setSkill] = useState("")
  const [status, setStatus] = useState("")
  const [msg, setMessage] = useState("")

  const postdata = () => {


    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
        areaOfInterest: interest.split(","),
        skills: skill.split(","),

      })

    }).then(res =>
      res.json()
    ).then(data => {
      // console.log(typeof data, data.error, data)
      if (data.error) {
        setStatus("False")

        setMessage(data.details && data.details.body[0].message || data.error)


      } else {
        setStatus("True")
        setMessage(data.message)



      }
    })


  }



  return (
    <>
      <Col lg="6" md="8">

        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <large><b>SIGN UP</b></large>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" required="true" value={name} onChange={(e) => { setName(e.target.value) }} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" required="true" autoComplete="new-email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" value={password} onChange={(e) => { setPass(e.target.value) }} />
                </InputGroup>

              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="select" id="exampleSelect" placeholder="Select Role" value={role} onChange={(e) => { setRole(e.target.value) }}>
                    <option hidden>Select</option>

                    <option>Learner</option>
                    <option>Consultant</option>


                  </Input>
                </InputGroup>
              </FormGroup>
              {
                role != "" ? role == "Learner"
                  ? <FormGroup>
                    <InputGroup className="input-group-alternative">

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-briefcase-24" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input placeholder="area of interest(guitar,singing)" type="text" value={interest} onChange={(e) => { setInterest(e.target.value) }} />
                    </InputGroup>

                  </FormGroup>
                  :
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-briefcase-24" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Skills" type="text" value={skill} onChange={(e) => { setSkill(e.target.value) }} />
                    </InputGroup>

                  </FormGroup> : <FormGroup></FormGroup>

              }

              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={() => postdata()}>
                  Create account
                </Button>
                


              </div>
              
              {
                status != "" ? status == "False" ?
                  <Alert severity="error">{msg}</Alert>
                  : <Alert severity="success">{msg}</Alert>
                  : null


              }
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;