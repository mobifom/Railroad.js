import React, { useState } from 'react';
import { ACCESS_TOKEN} from '../config';

import { Container, Form, Button, Loader, Message, Panel, Tooltip, Whisper, Divider } from 'rsuite';

const DistanceCalculatorPage = () => {
  const [path, setPath] = useState('');
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = ACCESS_TOKEN;

  const handleCalculateDistance = () => {
    // Input validation
    if (!path || !/^[A-Z](-[A-Z])*$/.test(path)) {
      setError('Invalid path format. Please enter a path like A-B-C.');
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${serverUrl}/distance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ path: path.split('-') }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setDistance(data.distance))
      .catch(error => setError(`Error calculating distance: ${error.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Panel bordered header="Distance Calculator" style={{ marginBottom: '20px' }}>
        <Form layout="horizontal">
          <Form.Group controlId="path">
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>Enter a path using hyphen-separated capital letters (e.g., A-B-C).</Tooltip>}
            >
              <Form.ControlLabel>Path</Form.ControlLabel>
            </Whisper>
            <Form.Control
              name="path"
              placeholder="Enter path (e.g., A-B-C)"
              value={path}
              onChange={(value) => setPath(value)}
            />
            <Form.HelpText>Use uppercase letters and hyphens, e.g., A-B-C.</Form.HelpText>
          </Form.Group>
          <Divider />
          <Form.Group>
            <Button appearance="primary" onClick={handleCalculateDistance}  disabled={loading || !path}
              block>
              {loading ? <Loader content="Calculating..." /> : 'Calculate Distance'}
            </Button>
          </Form.Group>
        </Form>
      </Panel>
      {error && (
        <Message showIcon type="error" header="Calculation Error" description={error} style={{ marginBottom: '20px' }} >{error}</Message>
      )}
      {!error&&distance !== null && (
        <Panel bordered bodyFill style={{ textAlign: 'center', background: '#f7f7f7' }}>
          <h4>Calculated Distance</h4>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0' }}>{distance}</p>
        </Panel>
      )}
    </Container>
  );
};

export default DistanceCalculatorPage;