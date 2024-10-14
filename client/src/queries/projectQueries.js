import { gql } from '@apollo/client';

// Query to get projects with pagination and ordering options
const GET_PROJECTS = gql`
  query getProjects($limit: Int, $offset: Int, $orderBy: String) {
    projects(limit: $limit, offset: $offset, orderBy: $orderBy) {
      id
      name
      status
      description
      createdAt
      updatedAt
    }
  }
`;

// Query to get a specific project by ID, including the client details
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      createdAt
      updatedAt
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
