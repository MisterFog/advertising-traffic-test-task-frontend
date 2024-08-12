import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { usersEffectCallbacks } from '../../services/paths/effectCallbacksInstances';

interface UserProfile {
  name: string;
  profilePicture: string;
  birthDate: string;
}

const PeoplePage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersEffectCallbacks.list({});
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {users.map((user, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ padding: '1rem' }}
              cover={
                user.profilePicture ? (
                  <img
                    alt={user.name}
                    src={`${process.env.REACT_APP_API_ROUTE}/${user.profilePicture}`}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', margin: 'auto' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                  >
                    <UserOutlined
                      style={{ fontSize: '32px', color: '#1890ff', borderRadius: '50%' }}
                    />
                  </div>
                )
              }
            >
              <Card.Meta title={user.name} description={`Age: ${user.birthDate}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PeoplePage;
