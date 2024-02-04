import React from 'react';
import './Styling/LandingPage.css';
import logo from './Styling/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const LandingPage = () => {
    return (
      <div className='LandingPage'>
        <Container fluid className="custom-container p-0">
          <Row className="justify-content-center">
            <Col md={6} sm={12}>
              <Card className="text-center bg-custom">
                <Card.Body>
                  <Card.Img src={logo} alt="Clash Course Logo" className="img-fluid mb-5" />
                  <button class="my-button">Start Here</button>
                  <p className="mt-4">
                    Need an account?{" "}
                    <span className="sign-up-link" onClick={() => console.log("Sign up clicked")}>
                        Sign up
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default LandingPage;