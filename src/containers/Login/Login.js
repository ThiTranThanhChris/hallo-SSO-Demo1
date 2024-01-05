import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Header from 'layout/Header/Header';
import React, { useState } from 'react';
import { useMsal, UnauthenticatedTemplate,AuthenticatedTemplate } from '@azure/msal-react';
import {Row, Col} from 'reactstrap';
import './styles.scss';

import LoginFace from 'assets/images/hallo-login-face_purple.png';
import MicrosoftIcon from 'assets/images/Microsoft_icon.png';
import { ApiCollections, loginRequest } from 'auth/AuthConfig';




const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [res, setRes] = useState(null);
  const { instance, inProgress } = useMsal();
 

  const loginWithEmailPassword = (event) => {
    // Prevent page reload
    event.preventDefault();

    const {url, method, headers, body} = ApiCollections.apiLogin;
    //const navigate = useNavigate();

    var urlencoded = new URLSearchParams({
      ...body,
      'username': email,
      'password': password
    });
    var requestOptions = {
      method: method,
      headers: headers,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response =>response.json())
      .then(e => setRes(e))
      .catch(error => {
        console.log('error', error);
      });

    if(res.access_token){
      localStorage.setItem("access_token", res?.access_token);
      props.setToken(res?.access_token);
    }
  }

  const handleLoginWithMS = () => {
    console.log(instance);
    instance.loginRedirect(loginRequest).then(item => console.log(item)).catch((error) => console.log(error));
  }
  return (
    <>
      <Header />
      <Row className="login-content">
        <Col sm={4} className="login-face">
          <img src={LoginFace} alt="" />
        </Col>
        <Col sm={4} className="confirm-text">
          <h1>Wij zorgen dat ICT voor jou werkt</h1>
        </Col>
        <Col sm={4} className="login-wrapper">
          <div className="login-form">
            <h2>inloggen mijn hallo</h2>
            <form onSubmit={loginWithEmailPassword}>
              <div className="input-item">
                <p className="label">e-mailadres</p>
                <Input type="text" placeholder="Gebruikersnaam/E-mail"  value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-item">
                <p className="label">Wachtwoord</p>
                <Input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="forgot-pw">
                <Button label="Wachtwoord vergeten "></Button>
              </div>
              <div className="login-btn">
                <Button type="submit" label="Login" />
              </div>
              <div hidden={message ==''}>
                <p>{message}</p>
              </div>
            </form>
            <div className="or">Or</div>
            <UnauthenticatedTemplate>
              <div className="sign-in-microsoft">
                  <button onClick={handleLoginWithMS}>
                    <img src={MicrosoftIcon} alt="" />
                    <span>Sign in with Microsoft</span>
                  </button>
              </div>
            </UnauthenticatedTemplate>
          </div>
        </Col>
        {/* <h1>Please Log In</h1>
         */}
      </Row>
    </>
  );
};

export default Login;
