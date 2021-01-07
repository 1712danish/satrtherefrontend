
import React, { useState } from "react";
import {useHistory} from "react-router-dom"
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
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

function Login() {
  const [password, setPass] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [msg, setMessage] = useState("")

  const history = useHistory()

  const postData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res =>
      res.json()

    ).then(data => {
      // console.log(data);


      if (data.error) {
        setStatus("False")
        setMessage(data.details && data.details.body[0].message || data.error)


      } else {
        setStatus("True")
        setMessage(data.message)
        
        const value=data.user
        // console.log(value)
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        localStorage.setItem("name",(value.name));
        localStorage.setItem("email",(value.email));
        localStorage.setItem("_id",(value._id));





        history.push("/admin/index")
        window.location.reload(false);

      }

      

    }).catch(err => {
      console.log(err);
    })
  }




  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <large><b>SIGN IN</b></large>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
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
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button"  onClick={() => postData()}>
                  Sign in
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
        <Row className="mt-3">
          <Col xs="6">
            <Link
              className="text-light"
              to="/admin/reset-pass"
              
            >
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );

}

export default Login;
