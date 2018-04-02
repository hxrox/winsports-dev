import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [`
    scalar Date

    type ApplicationType {
        _id: String
        name: String
        description: String
        active: Boolean
        applications: [Application]
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Application {
        _id: String
        name: String
        description: String
        clientId: String
        clientSecret: String
        version: String
        iosId: String
        androidId: String
        applicationType: ApplicationType
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type User {
        _id: String
        name: String
        lastName: String
        userName: String
        email: String
        birthDate: Date
        emailConfirmed: Boolean
        emailConfirmationToken: String
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Session {
        _id: String
        user: User
        application: Application
        ipAddress: String
        acccessToken: String
        os: String
        active: Boolean
        createdAt: Date
        logoutAt: Date
        logoutBy: String
        expiredAt: Date
    }

    type Module {
        _id: String
        name: String
        description: String
        active: Boolean
        module: Module
        application: Application
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Action {
        _id: String
        name: String
        description: String
        active: Boolean
        module: Module
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Query {
        applicationTypes(searchTerm: String): [ApplicationType]
        applicationType(id: String!): ApplicationType

        applications(searchTerm: String): [Application]
        application(id: String!): Application

        users(searchTerm: String): [User]
        user(id: String!): User
        userByEmailConfirmationToken(token: String!): User

        sessions(searchTerm: String): [Session]

        modules(searchTerm: String): [Module]
        module(id: String!): Module

        actions(searchTerm: String): [Action]
        action(id: String!): Action
    }

    type Mutation {
        addApplicationType(name: String!, description: String): ApplicationType
        editApplicationType(id: String!, name: String!, description: String, active: Boolean): ApplicationType
        deleteLogicApplicationType(id: String!): ApplicationType
        deleteApplicationType(id: String!): ApplicationType

        addApplication(name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String! ): Application
        editApplication(id: String!, name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String!, active: Boolean): Application
        deleteLogicApplication(id: String!): Application
        deleteApplication(id: String!): Application

        addUser(name: String!, lastName: String!, userName: String!, email: String!, password: String!, birthDate: Date): User
        editUser(id: String, name: String!, lastName: String!, userName: String!, email: String!, birthDate: Date): User
        deleteLogicUser(id: String!): User
        deleteUser(id: String!): User
        userConfirmEmail(id: String!): User
        userChangePassword(id: String!, passwordCurrent: String!, newPassword: String!, confirmPassword: String!): User

        addModule(name: String!, description: String, moduleId: String, applicationId: String!): Module
        editModule(id: String!, name: String!, description: String, moduleId: String, applicationId: String!, active: Boolean): Module
        deleteLogicModule(id: String!): Module
        deleteModule(id: String!): Module

        addAction(name: String!, description: String, moduleId: String!, applicationId: String!): Action
        editAction(id: String!, name: String!, description: String, moduleId: String!, active: Boolean): Action
        deleteLogicAction(id: String!): Action
        deleteAction(id: String!): Action
    }
`];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;