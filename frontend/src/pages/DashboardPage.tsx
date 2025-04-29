import { Layout, Row, Col, Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#001529",
          color: "#fff",
          padding: "0 20px",
        }}
      >
        <div style={{ fontSize: "20px" }}>Hello {user?.username}</div>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ background: "#ff4d4f", borderColor: "#ff4d4f" }}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "20px", width: "100%", height: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{ background: "#fff", padding: "20px", minHeight: "200px" }}
          >
            {/* Placeholder for table */}
            Table Section
          </Col>
          <Col
            span={24}
            style={{
              background: "#fff",
              padding: "20px",
              minHeight: "200px",
              marginTop: "20px",
            }}
          >
            {/* Placeholder for charts */}
            Charts Section
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
