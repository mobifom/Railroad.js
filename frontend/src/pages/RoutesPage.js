import React, { useEffect,useState, } from 'react';
import { ACCESS_TOKEN} from '../config';
import { Container, Form, ButtonToolbar, Button, Table, Loader, Message, Panel, Tooltip, Whisper, Divider, SelectPicker, FlexboxGrid, IconButton } from 'rsuite';
import RouteGraph from '../components/RouteGraph'; 

const { Column, HeaderCell, Cell } = Table;

const locations = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' }
  ];

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [maxStops, setMaxStops] = useState('');
  const [exactStops, setExactStops] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  
 useEffect(() => {
    setIsFormValid(start !== '' && end !== '' && searchValue !== '');
  }, [start, end, searchValue]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const token = ACCESS_TOKEN;

  const handleFetch = (url, body) => {
    setLoading(true);
    setError(null);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.routes) && data.routes.length > 0) {
          setRoutes(data.routes);
        } else {
          setError('No data satisfies the search criteria.');
        }
      })
      .catch(error => setError('Error fetching routes: ' + error.message))
      .finally(() => setLoading(false));
  };
  const handleSearch = () => {
    if (searchValue === 'max-stops') {
      handleFetch(`${serverUrl}/routes/max-stops`, { start, end, maxStops: parseInt(maxStops) });
    } else if (searchValue === 'exact-stops') {
      handleFetch(`${serverUrl}/routes/exact-stops`, { start, end, exactStops: parseInt(exactStops) });
    } else if (searchValue === 'max-distance') {
      handleFetch(`${serverUrl}/routes/max-distance`, { start, end, maxDistance: parseInt(maxDistance) });
    }
  };

  const searchOptions = [
    { label: 'Search by Max Stops', value: 'max-stops' },
    { label: 'Search by Exact Stops', value: 'exact-stops' },
    { label: 'Search by Max Distance', value: 'max-distance' }
  ];

  return (
    <Container>
      <Panel bordered header={(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Search Routes</span>
          <Whisper
            placement="top"
            trigger="hover"
            speaker={<Tooltip>Select one of the below search criteria to find routes.</Tooltip>}
          >
            <IconButton icon={<i className="rs-icon rs-icon-info" />} size="xs" style={{ marginLeft: 8 }} />
          </Whisper>
        </div>
      )} style={{ width: '600px', margin: '0 auto', padding: '20px', marginBottom: '20px' }}>
        <Form layout="horizontal">
          <Form.Group controlId="start">
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item colspan={9}>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Select the starting location</Tooltip>}>
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
          <Form.Group controlId="end">
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item colspan={9}>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Select the ending location</Tooltip>}>
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
          <Form.Group controlId="searchValue">
            <FlexboxGrid align="middle">
              <FlexboxGrid.Item colspan={9}>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Select the search criteria</Tooltip>}>
                  <Form.ControlLabel>Search Criteria</Form.ControlLabel>
                </Whisper>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={10}>
                <SelectPicker
                  data={searchOptions}
                  value={searchValue}
                  onChange={(value) => setSearchValue(value)}
                  placeholder="Select search criteria"
                  block
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form.Group>
          {searchValue === 'max-stops' && (
            <Form.Group controlId="maxStops">
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={9}>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Enter Max Stops</Tooltip>}>
                    <Form.ControlLabel>Max Stops</Form.ControlLabel>
                  </Whisper>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>
                  <Form.Control
                    name="maxStops"
                    placeholder="Max Stops"
                    value={maxStops}
                    onChange={(value) => setMaxStops(value)}
                    type="number"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Form.Group>
          )}
          {searchValue === 'exact-stops' && (
            <Form.Group controlId="exactStops">
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={9}>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Enter Exact Stops</Tooltip>}>
                    <Form.ControlLabel>Exact Stops</Form.ControlLabel>
                  </Whisper>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>
                  <Form.Control
                    name="exactStops"
                    placeholder="Exact Stops"
                    value={exactStops}
                    onChange={(value) => setExactStops(value)}
                    type="number"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Form.Group>
          )}
          {searchValue === 'max-distance' && (
            <Form.Group controlId="maxDistance">
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={9}>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Enter Max Distance</Tooltip>}>
                    <Form.ControlLabel>Max Distance</Form.ControlLabel>
                  </Whisper>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={10}>
                  <Form.Control
                    name="maxDistance"
                    placeholder="Max Distance"
                    value={maxDistance}
                    onChange={(value) => setMaxDistance(value)}
                    type="number"
                  />
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Form.Group>
          )}
          <Divider />
          <Form.Group>
            <Button appearance="primary" onClick={handleSearch}
              disabled={loading || !isFormValid || (searchValue === 'max-stops' && !maxStops) || (searchValue === 'exact-stops' && !exactStops) || (searchValue === 'max-distance' && !maxDistance)}
              block>
              {loading ? <Loader content="Searching..." /> : 'Search'}
            </Button>
          </Form.Group>
        </Form>
      </Panel>
      {error && <Message showIcon type="error" description={error} >{error}</Message>}
      {!loading && !error && routes.length > 0 && (
        <Panel bordered header="Search Results" style={{ marginTop: '20px' }}>
          <Table data={routes.map((route, index) => ({ id: index, route }))} height={400} autoHeight>
            <Column width={100} fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Route</HeaderCell>
              <Cell>
                {(rowData) => <RouteGraph route={rowData.route} />}
              </Cell>
            </Column>
          </Table>
        </Panel>
      )}
    </Container>
  );
};


export default RoutesPage;