import { Layout, Row, Col, Button } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TracksList } from '../components/TracksList/index';
import { ROUTES } from '../constants/routes';
const { Header, Content } = Layout;

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div style={{ fontSize: '20px' }}>Hello {user?.username}</div>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ background: '#ff4d4f', borderColor: '#ff4d4f' }}
        >
          Logout
        </Button>
      </Header>
      <Content className="content">
        <Row gutter={[16, 16]}>
          <Col className="col">
            <TracksList />
          </Col>
          <Col className="col col-margin">
            {/* Placeholder for charts */}
            Charts Section
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
