import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN} from '../config';
import { Container, Form, Button, Loader, Message, Panel, Divider, Whisper, Tooltip, SelectPicker, FlexboxGrid } from 'rsuite';

const ShortestRoutePage = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [shortestRoute, setShortestRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);


  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = ACCESS_TOKEN;

  const locations = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' }
  ];

  useEffect(() => {
    setIsFormValid(start !== '' && end !== '');
  }, [start, end]);


  const handleFindShortestRoute = () => {
    if (!isFormValid) {
      setError('Please select both start and end locations.');
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`${serverUrl}/routes/shortest-route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ start, end }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.shortestRoute !== 'NO SUCH ROUTE') {
          setShortestRoute(`${start} - ${end} is ${data.shortestRoute}`);
        } else {
          setShortestRoute(data.shortestRoute);
        }
        setStart('');
        setEnd('');
      })
      .catch(error => setError(`Error finding shortest route : ` + error.message))
      .finally(() => setLoading(false));
  };


  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Panel bordered header="Find Shortest Route" style={{ marginBottom: '20px' }}>
        <Form layout="horizontal">
          <Form.Group controlId="start">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={9}>
                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={<Tooltip>Select the starting location.</Tooltip>}
                >
                  <Form.ControlLabel>Start Location</Form.ControlLabel>
                </Whisper>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={10}>
                <SelectPicker
                  data={locations}
                  value={start}
                  onChange={(value) => setStart(value)}
                  placeholder="Select starting location"
                  block
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form.Group>
          <Divider />
          <Form.Group controlId="end">
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={9}>
                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={<Tooltip>Select the ending location.</Tooltip>}
                >
                  <Form.ControlLabel>End Location</Form.ControlLabel>
                </Whisper>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={10}>
                <SelectPicker
                  data={locations}
                  value={end}
                  onChange={(value) => setEnd(value)}
                  placeholder="Select ending location"
                  block
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form.Group>
          <Divider />
          <Form.Group>
            <Button
              appearance="primary"
              onClick={handleFindShortestRoute}
              disabled={loading || !isFormValid}
              block
            >
              {loading ? <Loader content="Finding..." /> : 'Find Shortest Route'}
            </Button>
          </Form.Group>
        </Form>
      </Panel>
      {error && (
        <Message
          showIcon
          type="error"
          header="Error"
          description={error}
          style={{ marginBottom: '20px' }}
        />
      )}
      {shortestRoute !== null && (
        <Panel bordered header="Shortest Route between" bodyFill style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0' }}>
            {shortestRoute}
          </p>
        </Panel>
      )}
      {  error && <Message showIcon type="error" description={error} />}
    
    </Container>
  );
};

export default ShortestRoutePage;