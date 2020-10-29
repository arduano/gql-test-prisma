import { Box, Card, Container } from '@material-ui/core';
import React from 'react';
import { useGetAllUsersQuery } from '../.gql/graphql-client';
import { checkQuery } from './util';

const UserPosts: React.FC = () => {
  const query = useGetAllUsersQuery();
  return checkQuery(query, ({ getAllUsers: users }) => {
    return (
      <div>
        {users.map(u => (
          <Box m={4} key={u.id}>
            <Container maxWidth="sm">
              <Card>
                <Box p={2}>
                  <div>{u.name}</div>
                  <div>{u.email}</div>
                </Box>
                <Box px={2}>
                  <h3>Posts:</h3>
                </Box>
                {u.posts.map(p => (
                  <Box key={p.id} p={2}>
                    <div>
                      <b>Title:</b> {p.title}
                    </div>
                    <div>
                      <b>Content:</b> {p.content}
                    </div>
                  </Box>
                ))}
              </Card>
            </Container>
          </Box>
        ))}
      </div>
    );
  });
};

export default UserPosts;
