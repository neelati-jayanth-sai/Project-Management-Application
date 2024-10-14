import { gql } from '@apollo/client';

// Query to get all clients with pagination and ordering options
const GET_CLIENTS = gql`
  query getClients($limit: Int, $offset: Int, $orderBy: String) {
    clients(limit: $limit, offset: $offset, orderBy: $orderBy) {
      id
      name
      email
      phone
      createdAt
      updatedAt
    }
  }
`;

// Query to get a specific client by ID and their projects
const GET_CLIENT_PROJECTS = gql`
  query getClientProjects($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
      projects {
        id
        name
        status
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT_PROJECTS };
