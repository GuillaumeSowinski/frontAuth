import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const datas = await response.json()
      console.log(datas)
      if (!response.ok) {
        const customError = new Error(datas.error || `Error happened`);
        customError.status = response.status;
        throw customError;
      }

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: datas.access_token,
          expiresAt: new Date
            (Date.now() + datas.expires_in * 1000
            ).toISOString()
        })
      );

      navigate("/offres/professionnelles");
    } catch (err) {
      if (err.status === 401) {
        setError("Votre identifiant ou mot de passe est incorrect.");
      } else {
        setError("Erreur lors du login")
      }
      console.error(`${err.message}, (HTTP ${err.status})`)
    } finally {
      setLoading(false);
    }
    // Handle login logic here
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert):
    //   - Show an error if credentials are invalid
    //   - Show a generic error for all other cases
    // On success, redirect to the Pro Offers page
    console.log("Login submitted:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            {error && <Alert variant="danger">{error}</Alert>}
            <h1 className="text-center mb-4">Se connecter</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {loading ? "Chargement..." : "Se connecter"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
