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
        teams: [Team]
        balances: [UserBalance]
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
        games: [Game]
        events: [Event]
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
        questions: [Question]
        games: [Game]
        events: [Event]
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
        games: [Game]
        events: [Event]
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
        games: [Game]
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
        localGames: [Game]
        visitorGames: [Game]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Question { 
        _id: String
        name: String
        point: Int
        sport: Sport
        games: [Game]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Game {
        _id: String
        localTeam: Team
        visitorTeam: Team
        localTeamResult: Int
        visitorTeamResult: Int
        questions: [Question]
        events: [Event]
        sport: Sport
        stadium: Stadium
        country: Country
        league: League
        startAt: Date
        endAt: Date
    }

    type PaymentMethod {
        _id: String
        name: String
        icon: String
        iconIonic: String
        events: [Event]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type Event {
        _id: String
        folio: Int
        name: String
        paymentMethods: [EventPaymentMethod]
        isPublic: Boolean
        isGuaranteed: Boolean
        endAt: Date
        closedAt: Date
        country: Country
        league: League
        sport: Sport
        games: [Game]
        active: Boolean
        createdAt: Date
        createdBy: String
        updatedAt: Date
        updatedBy: String
        deletedAt: Date
        deletedBy: String
    }

    type EventPaymentMethod {
        _id: String
        paymentMethod: PaymentMethod
        amount: Int
    }

    type UserBalance {
        _id: String
        paymentMethod: PaymentMethod
        balance: Int
    }

    input IEventPaymentMethod {
        paymentMethod: String!
        amount: Int!
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
        
        questions(searchTerm: String): [Question]
        question(id: String!): Question

        games(searchTerm: String): [Game]
        game(id: String!): Game

        paymentMethods(searchTerm: String): [PaymentMethod]
        paymentMethod(id: String!): PaymentMethod

        events(searchTerm: String): [Event]
        event(id: String!): Event
    }

    type Mutation {
        addApplicationType(name: String!, description: String): ApplicationType
        editApplicationType(id: String!, name: String!, description: String, active: Boolean): ApplicationType
        trashApplicationType(id: String!): ApplicationType
        recoverApplicationType(id: String!): ApplicationType
        deleteApplicationType(id: String!): ApplicationType

        addApplication(name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String! ): Application
        editApplication(id: String!, name: String!, description: String, clientId: String!, clientSecret: String!, version: String, iosId: String, androidId: String, applicationType: String!, active: Boolean): Application
        trashApplication(id: String!): Application
        recoverApplication(id: String!): Application
        deleteApplication(id: String!): Application

        addUser(name: String!, lastName: String!, userName: String!, email: String!, password: String!, birthDate: Date, actions: [String], roles: [String]): User
        editUser(id: String, name: String!, lastName: String!, userName: String!, email: String!, birthDate: Date, actions: [String], roles: [String]): User
        trashUser(id: String!): User
        recoverUser(id: String!): User
        deleteUser(id: String!): User
        userConfirmEmail(id: String!): User
        userChangePassword(id: String!, passwordCurrent: String!, newPassword: String!, confirmPassword: String!): User
        userAddTeam(teamId: String!): User
        userDeleteTeam(teamId: String!): User
        userAddBalance(balance: Float!, paymentMethodId: String!): User
        registerUser(name: String!, lastName: String!, userName: String!, email: String!, password: String!, birthDate: Date): User
        addBalance(balance:Int): User

        addModule(name: String!, description: String, moduleId: String, applicationId: String!): Module
        editModule(id: String!, name: String!, description: String, moduleId: String, applicationId: String!, active: Boolean): Module
        trashModule(id: String!): Module
        recoverModule(id: String!): Module
        deleteModule(id: String!): Module

        addAction(name: String!, description: String, moduleId: String!): Action
        editAction(id: String!, name: String!, description: String, moduleId: String!, active: Boolean): Action
        trashAction(id: String!): Action
        recoverAction(id: String!): Action
        deleteAction(id: String!): Action

        addRole(name: String!, description: String, applicationId: String!, actions: [String]): Role
        editRole(id: String!, name: String!, description: String, applicationId: String!, active: Boolean, actions: [String]): Role
        trashRole(id: String!): Role
        recoverRole(id: String!): Role
        deleteRole(id: String!): Role

        addCountry(name: String!, code: String, image: String!): Country
        editCountry(id: String!, name: String!, code: String, image: String!, active: Boolean): Country
        trashCountry(id: String!): Country
        recoverCountry(id: String!): Country
        deleteCountry(id: String!): Country
        
        addSport(name: String!, description: String, image: String!): Sport
        editSport(id: String!, name: String!, description: String, image: String!, active: Boolean): Sport
        trashSport(id: String!): Sport
        recoverSport(id: String!): Sport
        deleteSport(id: String!): Sport

        addLeague(name: String!, description: String, image: String!, countryId: String!, sportId: String!): League
        editLeague(id: String!, name: String!, description: String, image: String!, countryId: String!, sportId: String!, active: Boolean): League
        trashLeague(id: String!): League
        recoverLeague(id: String!): League
        deleteLeague(id: String!): League
        
        addStadium(name: String!, image: String!, countryId: String!, sportId: String!): Stadium
        editStadium(id: String!, name: String!, image: String!, countryId: String!, sportId: String!, active: Boolean): Stadium
        trashStadium(id: String!): Stadium
        recoverStadium(id: String!): Stadium
        deleteStadium(id: String!): Stadium
        
        addTeam(name: String!, shortName: String!, image: String!, countryId: String!, sportId: String!, stadiumId: String!, leagues: [String]): Team
        editTeam(id: String!, name: String!, shortName: String!, image: String!, countryId: String!, sportId: String!, stadiumId: String!, leagues: [String], active: Boolean): Team
        trashTeam(id: String!): Team
        recoverTeam(id: String!): Team
        deleteTeam(id: String!): Team
        
        addGame(localTeamId: String!, visitorTeamId: String!, startAt: Date!, countryId: String!, sportId: String!, stadiumId: String!, leagueId: String!, questions: [String!]): Game
        editGame(id: String!, localTeamId: String!, visitorTeamId: String!, startAt: Date!, localTeamResult: Int!, visitorTeamResult: Int!, countryId: String!, sportId: String!, stadiumId: String!, leagueId: String!, questions: [String!], active: Boolean): Game
        trashGame(id: String!): Game
        recoverGame(id: String!): Game
        deleteGame(id: String!): Game
        addGoalLocalGame(id: String!): Game
        removeGoalLocalGame(id: String!): Game
        addGoalVisitorGame(id: String!): Game
        removeGoalVisitorGame(id: String!): Game
        closeGame(id: String!): Game

        addPaymentMethod(name: String!, icon: String!, iconIonic: String!): PaymentMethod
        editPaymentMethod(id: String!, name: String!, icon: String!, iconIonic: String!, active: Boolean): PaymentMethod
        trashPaymentMethod(id: String!): PaymentMethod
        recoverPaymentMethod(id: String!): PaymentMethod
        deletePaymentMethod(id: String!): PaymentMethod
        
        addEvent(name: String!, paymentMethods: [IEventPaymentMethod!], isPublic: Boolean, isGuaranteed: Boolean, endAt: Date!, countryId: String!, leagueId: String!, sportId: String!, games: [String]): Event
        editEvent(id: String!, name: String!, paymentMethods: [IEventPaymentMethod!], isPublic: Boolean, isGuaranteed: Boolean, endAt: Date!, countryId: String!, leagueId: String!, sportId: String!, games: [String], active: Boolean): Event
        trashEvent(id: String!): Event
        recoverEvent(id: String!): Event
        deleteEvent(id: String!): Event

        addQuestion(name: String!, point: Int!, sportId: String!): Question
        editQuestion(id: String!, name: String!, point: Int!, sportId: String!, active: Boolean): Question
        trashQuestion(id: String!): Question
        recoverQuestion(id: String!): Question
        deleteQuestion(id: String!): Question
    }
`];

export default makeExecutableSchema({ typeDefs, resolvers });