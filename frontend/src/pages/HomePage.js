import React from 'react';
import { Container, Row, Col, Button, Panel } from 'rsuite';

const HomePage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Row style={{ padding: '50px 20px', backgroundColor: '#f5f5f5' }}>
        <Col xs={24} md={16} mdOffset={4} className="text-center">
          <h1 style={{ fontSize: '2.5em', fontWeight: 'bold' }}>Welcome to the Railroad Project</h1>
          <p style={{ fontSize: '1.2em', marginTop: '10px' }}>
            Easily explore routes, calculate distances, and find the shortest routes to streamline your journey.
          </p>
        
        </Col>
      </Row>

      {/* Features Section */}
      <Row style={{ padding: '40px 20px' }}>
        <Col xs={24} md={8} className="text-center">
          <Panel shaded bordered bodyFill style={{ padding: '20px', margin: '10px' }}>
            <h3>Explore Routes</h3>
            <p>Discover and search for routes with ease.</p>
            <Button appearance="link" href="/routes">Learn More</Button>
          </Panel>
        </Col>
        <Col xs={24} md={8} className="text-center">
          <Panel shaded bordered bodyFill style={{ padding: '20px', margin: '10px' }}>
            <h3>Distance Calculator</h3>
            <p>Calculate distances between stations effortlessly.</p>
            <Button appearance="link" href="/distance-calculator">Learn More</Button>
          </Panel>
        </Col>
        <Col xs={24} md={8} className="text-center">
          <Panel shaded bordered bodyFill style={{ padding: '20px', margin: '10px' }}>
            <h3>Shortest Routes</h3>
            <p>Find the quickest way to your destination.</p>
            <Button appearance="link" href="/shortest-route">Learn More</Button>
          </Panel>
        </Col>
      </Row>

    </Container>
  );
};

export default HomePage;