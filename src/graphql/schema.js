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
        modules: [Module]
        roles: [Role]
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
        actions: [Action]
        roles: [Role]
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
        module: Module
        application: Application
        actions: [Action]
        roles: [Role]
        active: Boolean
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
        module: Module
        users: [User]
        roles: [Role]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Role {
        _id: String
        name: String
        description: String
        application: Application
        actions: [Action]
        users: [User]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Country { 
        _id: String
        name: String
        code: String
        image: String
        leagues: [League]
        stadiums: [Stadium]
        teams: [Team]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Sport {
        _id: String
        name: String
        description: String
        image: String
        leagues: [League]
        stadiums: [Stadium]
        teams: [Team]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type League { 
        _id: String
        name: String
        description: String
        image: String
        country: Country
        sport: Sport
        teams: [Team]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Stadium { 
        _id: String
        name: String
        image: String
        country: Country
        sport: Sport
        team: Team
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Team {
        _id: String
        name: String
        shortName: String
        image: String
        sport: Sport
        stadium: Stadium
        country: Country
        leagues: [League]
        active: Boolean
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

        roles(searchTerm: String): [Role]
        role(id: String!): Role

        countries(searchTerm: String): [Country]
        country(id: String!): Country
        
        sports(searchTerm: String): [Sport]
        sport(id: String!): Sport

        leagues(searchTerm: String): [League]
        league(id: String!): League
        
        stadiums(searchTerm: String): [Stadium]
        stadium(id: String!): Stadium
        
        teams(searchTerm: String): [Team]
        team(id: String!): Team
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

        addUser(name: String!, lastName: String!, userName: String!, email: String!, password: String!, birthDate: Date, actions: [String], roles: [String]): User
        editUser(id: String, name: String!, lastName: String!, userName: String!, email: String!, birthDate: Date, actions: [String], roles: [String]): User
        deleteLogicUser(id: String!): User
        deleteUser(id: String!): User
        userConfirmEmail(id: String!): User
        userChangePassword(id: String!, passwordCurrent: String!, newPassword: String!, confirmPassword: String!): User

        addModule(name: String!, description: String, moduleId: String, applicationId: String!): Module
        editModule(id: String!, name: String!, description: String, moduleId: String, applicationId: String!, active: Boolean): Module
        deleteLogicModule(id: String!): Module
        deleteModule(id: String!): Module

        addAction(name: String!, description: String, moduleId: String!): Action
        editAction(id: String!, name: String!, description: String, moduleId: String!, active: Boolean): Action
        deleteLogicAction(id: String!): Action
        deleteAction(id: String!): Action

        addRole(name: String!, description: String, applicationId: String!, actions: [String]): Role
        editRole(id: String!, name: String!, description: String, applicationId: String!, active: Boolean, actions: [String]): Role
        deleteLogicRole(id: String!): Role
        deleteRole(id: String!): Role

        addCountry(name: String!, code: String, image: String!): Country
        editCountry(id: String!, name: String!, code: String, image: String!, active: Boolean): Country
        deleteLogicCountry(id: String!): Country
        deleteCountry(id: String!): Country
        
        addSport(name: String!, description: String, image: String!): Sport
        editSport(id: String!, name: String!, description: String, image: String!, active: Boolean): Sport
        deleteLogicSport(id: String!): Sport
        deleteSport(id: String!): Sport

        addLeague(name: String!, description: String, image: String!, countryId: String!, sportId: String!): League
        editLeague(id: String!, name: String!, description: String, image: String!, countryId: String!, sportId: String!, active: Boolean): League
        deleteLogicLeague(id: String!): League
        deleteLeague(id: String!): League
        
        addStadium(name: String!, image: String!, countryId: String!, sportId: String!): Stadium
        editStadium(id: String!, name: String!, image: String!, countryId: String!, sportId: String!, active: Boolean): Stadium
        deleteLogicStadium(id: String!): Stadium
        deleteStadium(id: String!): Stadium
        
        addTeam(name: String!, shortName: String!, image: String!, countryId: String!, sportId: String!, stadiumId: String!, leagues: [String]): Team
        editTeam(id: String!, name: String!, shortName: String!, image: String!, countryId: String!, sportId: String!, stadiumId: String!, leagues: [String], active: Boolean): Team
        deleteLogicTeam(id: String!): Team
        deleteTeam(id: String!): Team
    }
`];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;