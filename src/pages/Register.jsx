import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
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
      const response = await fetch("https://offers-api.digistos.com/api/auth/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}, ${response.message}`);
      }
      console.log("Form submitted:", formData);
      navigate("/connexion");

    } catch (err) {
      setError("Erreur lors de l'inscription");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };
  // Handle signup logic here
  // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert)
  // Redirect to Login on success



  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            {error && <Alert variant="danger">{error}</Alert>}
            <h1 className="text-center mb-4">Créer un compte</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />



              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
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
                {loading ? "Chargement..." : "S'inscrire"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
