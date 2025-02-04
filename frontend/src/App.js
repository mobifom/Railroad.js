import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import DistanceCalculatorPage from './pages/DistanceCalculatorPage';
import ShortestRoutePage from './pages/ShortestRoutePage';
import { Container, Header, Content, Navbar, Nav, Drawer, IconButton, Footer } from 'rsuite';
import { Menu } from '@rsuite/icons';

const App = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const getClassName = ({ isActive }) => (isActive ? 'active-link' : 'nav-link');

  return (
    <Router>
      <Container>
        {/* Header Section */}
        <Header>
          <Navbar appearance="default" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
              Railroad Project
            </Navbar.Brand>
            <Nav className="d-none d-lg-flex" style={{ marginLeft: 'auto' }}>
              <Nav.Item as={NavLink} to="/" className={getClassName}>
                Home
              </Nav.Item>
              <Nav.Item as={NavLink} to="/routes" className={getClassName}>
                Routes
              </Nav.Item>
              <Nav.Item as={NavLink} to="/distance-calculator" className={getClassName}>
                Distance Calculator
              </Nav.Item>
              <Nav.Item as={NavLink} to="/shortest-route" className={getClassName}>
                Shortest Route
              </Nav.Item>
            </Nav>
            {/* Mobile Drawer Toggle */}
            <IconButton
              icon={<Menu />}
              className="d-lg-none"
              onClick={() => setDrawerOpen(true)}
              appearance="subtle"
              style={{ marginLeft: 'auto' }}
            />
          </Navbar>
        </Header>

        {/* Mobile Drawer Navigation */}
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="right"
        >
          <Drawer.Header>
            <Drawer.Title>Navigation</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Nav vertical>
              <Nav.Item as={NavLink} to="/" className={getClassName} onClick={() => setDrawerOpen(false)}>
                Home
              </Nav.Item>
              <Nav.Item as={NavLink} to="/routes" className={getClassName} onClick={() => setDrawerOpen(false)}>
                Routes
              </Nav.Item>
              <Nav.Item
                as={NavLink}
                to="/distance-calculator"
                className={getClassName}
                onClick={() => setDrawerOpen(false)}
              >
                Distance Calculator
              </Nav.Item>
              <Nav.Item
                as={NavLink}
                to="/shortest-route"
                className={getClassName}
                onClick={() => setDrawerOpen(false)}
              >
                Shortest Route
              </Nav.Item>
            </Nav>
          </Drawer.Body>
        </Drawer>

        {/* Main Content Section */}
        <Content style={{ padding: '20px 40px', minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/distance-calculator" element={<DistanceCalculatorPage />} />
            <Route path="/shortest-route" element={<ShortestRoutePage />} />
          </Routes>
        </Content>

        {/* Footer Section */}
        <Footer style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa' }}>
          <p>© {new Date().getFullYear()} Railroad Project. All rights reserved.</p>
          <Nav justified>
            <Nav.Item as={NavLink} to="/" className={getClassName}>
              Home
            </Nav.Item>
            <Nav.Item as={NavLink} to="/routes" className={getClassName}>
              Routes
            </Nav.Item>
            <Nav.Item as={NavLink} to="/distance-calculator" className={getClassName}>
              Distance Calculator
            </Nav.Item>
            <Nav.Item as={NavLink} to="/shortest-route" className={getClassName}>
              Shortest Route
            </Nav.Item>
          </Nav>
        </Footer>
      </Container>
    </Router>
  );
};

export default App;
