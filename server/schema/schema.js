const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt } = require("graphql");
const Client = require("../models/Client");
const Project = require("../models/Project");

// Client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    createdAt: { 
      type: GraphQLString,
      resolve(parent) {
        return new Date(parent.createdAt).toISOString(); // Convert to readable format
      }
    },
    updatedAt: { 
      type: GraphQLString,
      resolve(parent) {
        return new Date(parent.updatedAt).toISOString(); // Convert to readable format
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Project.find({ clientId: parent.id });
      },
    },
  }),
});

// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { 
      type: GraphQLString,
      resolve(parent) {
        return new Date(parent.createdAt).toISOString(); // Convert to readable format
      }
    },
    updatedAt: { 
      type: GraphQLString,
      resolve(parent) {
        return new Date(parent.updatedAt).toISOString(); // Convert to readable format
      }
    },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      args: {
        limit: { type: GraphQLInt }, // Optional limit for pagination
        offset: { type: GraphQLInt }, // Optional offset for pagination
        orderBy: { type: GraphQLString }, // Optional order by field
      },
      resolve(parent, args) {
        const { limit, offset, orderBy } = args;

        // Default query options
        const queryOptions = {
          sort: {},
          limit: limit || null, // Return all if limit is not provided
          skip: offset || 0, // Default offset if not provided
        };

        // Sort by createdAt in descending order for latest first if no orderBy specified
        queryOptions.sort[orderBy || "createdAt"] = -1;

        return Project.find()
          .sort(queryOptions.sort)
          .limit(queryOptions.limit)
          .skip(queryOptions.skip);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      args: {
        limit: { type: GraphQLInt }, // Optional limit for pagination
        offset: { type: GraphQLInt }, // Optional offset for pagination
        orderBy: { type: GraphQLString }, // Optional order by field
      },
      resolve(parent, args) {
        const { limit, offset, orderBy } = args;

        // Default query options
        const queryOptions = {
          sort: {},
          limit: limit || null, // Return all if limit is not provided
          skip: offset || 0, // Default offset if not provided
        };

        // Sort by createdAt in descending order for latest first if no orderBy specified
        queryOptions.sort[orderBy || "createdAt"] = -1;

        return Client.find()
          .sort(queryOptions.sort)
          .limit(queryOptions.limit)
          .skip(queryOptions.skip);
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingClient = await Client.findOne({ email: args.email });
        if (existingClient) {
          throw new Error("Client already exists");
        }
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          await Project.deleteMany({ clientId: args.id });
          return await Client.findOneAndDelete({ _id: args.id });
        } catch (err) {
          throw new Error("Failed to delete client");
        }
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          return await Project.findOneAndDelete({ _id: args.id });
        } catch (err) {
          throw new Error("Failed to delete project");
        }
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});
