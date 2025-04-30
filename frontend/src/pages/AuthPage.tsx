import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button, Input, Form, Alert } from 'antd';
import { ROUTES } from '../constants/routes';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === ROUTES.LOGIN;

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    setErrorMessage(null); // Clear previous error message
    try {
      if (isLogin) {
        await login(values.username, values.password);
      } else {
        await register(values.username, values.password);
      }
      navigate(ROUTES.DASHBOARD);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed`, error);
      setErrorMessage(
        error.response?.data?.error ||
          `An error occurred during ${isLogin ? 'login' : 'registration'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            className="auth-alert"
          />
        )}
        <Form onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form.Item>
        </Form>
        <div className="auth-footer">
          {isLogin ? (
            <>
              Don't have an account? <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
