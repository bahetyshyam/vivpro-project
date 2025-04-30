import { Layout, Row, Col, Button } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TracksList } from '../components/TracksList/index';
import { ROUTES } from '../constants/routes';
import { TracksState } from '../components/TracksList/useTracksState';
import { useCallback, useState } from 'react';
import { Charts } from '../components/Charts';
const { Header, Content } = Layout;

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [tracksState, setTracksState] = useState<TracksState | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const handleTracksStateChange = useCallback((tracksState: TracksState) => {
    setTracksState(tracksState);
  }, []);

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
        <Row>
          <Col span={24}>
            <TracksList onStateChange={handleTracksStateChange} />
          </Col>
        </Row>
        <Row>
          <Col span={24} className="margin-top-20">
            <Charts tracksState={tracksState} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
