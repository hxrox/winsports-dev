import applicationTypesResolvers from './resolvers/application-types.resolver';
import applicationsResolvers from './resolvers/application.resolver';
import usersResolvers from './resolvers/user.resolver';
import sessionsResolvers from './resolvers/session.resolver';
import modulesResolvers from './resolvers/module.resolver';
import actionsResolvers from './resolvers/action.resolver';
import rolesResolvers from './resolvers/role.resolver';
//Negocio
import countriesResolvers from './resolvers/country.resolver';
import sportsResolvers from './resolvers/sport.resolver';
import leaguesResolvers from './resolvers/league.resolver';
import stadiumsResolvers from './resolvers/stadium.resolver';
import teamsResolvers from './resolvers/team.resolver';
import questionsResolvers from './resolvers/question.resolver';
import gamesResolvers from './resolvers/game.resolver';
import paymentMethodsResolvers from './resolvers/payment-method.resolver';
import eventsResolvers from './resolvers/event.resolver';

const resolvers = {
    ApplicationType: {
        applications: applicationsResolvers.applicationsByApplicationType
    },
    Application: {
        applicationType: applicationTypesResolvers.applicationType,
        modules: modulesResolvers.modulesByApplicationId,
        roles: rolesResolvers.rolesByApplicationId
    },
    Module: {
        application: applicationsResolvers.application,
        actions: actionsResolvers.actionsByModuleId
    },
    Action: {
        users: usersResolvers.usersByActionId,
        module: modulesResolvers.module,
        roles: rolesResolvers.rolesByActionId
    },
    User: {
        actions: actionsResolvers.actionsByIds,
        roles: rolesResolvers.rolesByIds,
        teams: teamsResolvers.teamsByIds
    },
    Role: {
        application: applicationsResolvers.application,
        actions: actionsResolvers.actionsByIds,
        users: usersResolvers.usersByRoleId
    },
    Country: {
        leagues: leaguesResolvers.leaguesByCountryId,
        stadiums: stadiumsResolvers.stadiumsByCountryId,
        teams: teamsResolvers.teamsByCountryId,
        games: gamesResolvers.gamesByCountryId,
        events: eventsResolvers.eventsByCountryId
    },
    Sport: {
        leagues: leaguesResolvers.leaguesBySportId,
        stadiums: stadiumsResolvers.stadiumsBySportId,
        teams: teamsResolvers.teamsBySportId,
        questions: questionsResolvers.questionsBySportId,
        games: gamesResolvers.gamesBySportId,
        events: eventsResolvers.eventsBySportId
    },
    League: {
        sport: sportsResolvers.sport,
        country: countriesResolvers.country,
        teams: teamsResolvers.teamsByLeagueId,
        games: gamesResolvers.gamesByLeagueId,
        events: eventsResolvers.eventsByLeagueId
    },
    Stadium: {
        sport: sportsResolvers.sport,
        country: countriesResolvers.country,
        team: teamsResolvers.teamsByStadiumId,
        games: gamesResolvers.gamesByStadiumId
    },
    Team: {
        sport: sportsResolvers.sport,
        country: countriesResolvers.country,
        stadium: stadiumsResolvers.stadium,
        leagues: leaguesResolvers.leaguesByIds,
        localGames: gamesResolvers.gamesByLocalTeamId,
        visitorGames: gamesResolvers.gamesByVisitorTeamId
    },
    Question: {
        sport: sportsResolvers.sport,
        games: gamesResolvers.gamesByQuestionId
    },
    Game: {
        localTeam: teamsResolvers.teamByLocalTeam,
        visitorTeam: teamsResolvers.teamByVisitorTeam,
        questions: questionsResolvers.questionsByIds,
        sport: sportsResolvers.sport,
        stadium: stadiumsResolvers.stadium,
        country: countriesResolvers.country,
        league: leaguesResolvers.league,
        events: eventsResolvers.eventsByGameId
    },
    PaymentMethod: {
    },
    EventPaymentMethod: {
        paymentMethod: paymentMethodsResolvers.paymentMethod
    },
    UserBalance: {
        paymentMethod: paymentMethodsResolvers.paymentMethod
    },
    Event: {
        country: countriesResolvers.country,
        league: leaguesResolvers.league,
        sport: sportsResolvers.sport,
        games: gamesResolvers.gamesByIds
    },
    Query: {
        // ApplicationTypes
        applicationTypes: applicationTypesResolvers.applicationTypes,
        applicationType: applicationTypesResolvers.applicationType,
        // Applications
        applications: applicationsResolvers.applications,
        application: applicationsResolvers.application,
        //Users
        users: usersResolvers.users,
        user: usersResolvers.user,
        userByEmailConfirmationToken: usersResolvers.userByEmailConfirmationToken,
        // Sessions
        sessions: sessionsResolvers.sessions,
        // Modules
        modules: modulesResolvers.modules,
        module: modulesResolvers.module,
        // Actions
        actions: actionsResolvers.actions,
        action: actionsResolvers.action,
        // Roles
        roles: rolesResolvers.roles,
        role: rolesResolvers.role,

        // Reglas de negocio
        // Paises
        countries: countriesResolvers.countries,
        country: countriesResolvers.country,
        // Deports
        sports: sportsResolvers.sports,
        sport: sportsResolvers.sport,
        // Ligas
        leagues: leaguesResolvers.leagues,
        league: leaguesResolvers.league,
        // Ligas
        stadiums: stadiumsResolvers.stadiums,
        stadium: stadiumsResolvers.stadium,
        // Teams
        teams: teamsResolvers.teams,
        team: teamsResolvers.team,
        // Questions
        questions: questionsResolvers.questions,
        question: questionsResolvers.question,
        // Games
        games: gamesResolvers.games,
        game: gamesResolvers.game,
        // Metodo de pagos
        paymentMethods: paymentMethodsResolvers.paymentMethods,
        paymentMethod: paymentMethodsResolvers.paymentMethod,
        // Eventos
        events: eventsResolvers.events,
        event: eventsResolvers.event,
    },
    Mutation: {
        // ApplicationTyes
        addApplicationType: applicationTypesResolvers.addApplicationType,
        editApplicationType: applicationTypesResolvers.editApplicationType,
        trashApplicationType: applicationTypesResolvers.trashApplicationType,
        recoverApplicationType: applicationTypesResolvers.recoverApplicationType,
        deleteApplicationType: applicationTypesResolvers.deleteApplicationType,
        // Applications
        addApplication: applicationsResolvers.addApplication,
        editApplication: applicationsResolvers.editApplication,
        trashApplication: applicationsResolvers.trashApplication,
        recoverApplication: applicationsResolvers.recoverApplication,
        deleteApplication: applicationsResolvers.deleteApplication,
        // Users
        addUser: usersResolvers.addUser,
        editUser: usersResolvers.editUser,
        trashUser: usersResolvers.trashUser,
        recoverUser: usersResolvers.recoverUser,
        deleteUser: usersResolvers.deleteUser,
        userConfirmEmail: usersResolvers.userConfirmEmail,
        userChangePassword: usersResolvers.userChangePassword,
        userAddTeam: usersResolvers.userAddTeam,
        userDeleteTeam: usersResolvers.userDeleteTeam,
        userAddBalance: usersResolvers.userAddBalance,
        registerUser: usersResolvers.registerUser,
        addBalance: usersResolvers.addBalance,
        // Modules
        addModule: modulesResolvers.addModule,
        editModule: modulesResolvers.editModule,
        trashModule: modulesResolvers.trashModule,
        recoverModule: modulesResolvers.recoverModule,
        deleteModule: modulesResolvers.deleteModule,
        // Actions
        addAction: actionsResolvers.addAction,
        editAction: actionsResolvers.editAction,
        trashAction: actionsResolvers.trashAction,
        recoverAction: actionsResolvers.recoverAction,
        deleteAction: actionsResolvers.deleteAction,
        // Roles
        addRole: rolesResolvers.addRole,
        editRole: rolesResolvers.editRole,
        trashRole: rolesResolvers.trashRole,
        recoverRole: rolesResolvers.recoverRole,
        deleteRole: rolesResolvers.deleteRole,

        //Negocio
        // Paises
        addCountry: countriesResolvers.addCountry,
        editCountry: countriesResolvers.editCountry,
        trashCountry: countriesResolvers.trashCountry,
        recoverCountry: countriesResolvers.recoverCountry,
        deleteCountry: countriesResolvers.deleteCountry,
        // Deports
        addSport: sportsResolvers.addSport,
        editSport: sportsResolvers.editSport,
        trashSport: sportsResolvers.trashSport,
        deleteSport: sportsResolvers.deleteSport,
        recoverSport: sportsResolvers.recoverSport,
        // Ligas
        addLeague: leaguesResolvers.addLeague,
        editLeague: leaguesResolvers.editLeague,
        trashLeague: leaguesResolvers.trashLeague,
        recoverLeague: leaguesResolvers.recoverLeague,
        deleteLeague: leaguesResolvers.deleteLeague,
        // Estadios
        addStadium: stadiumsResolvers.addStadium,
        editStadium: stadiumsResolvers.editStadium,
        trashStadium: stadiumsResolvers.trashStadium,
        recoverStadium: stadiumsResolvers.recoverStadium,
        deleteStadium: stadiumsResolvers.deleteStadium,
        // Teams
        addTeam: teamsResolvers.addTeam,
        editTeam: teamsResolvers.editTeam,
        trashTeam: teamsResolvers.trashTeam,
        recoverTeam: teamsResolvers.recoverTeam,
        deleteTeam: teamsResolvers.deleteTeam,
        // Games
        addGame: gamesResolvers.addGame,
        editGame: gamesResolvers.editGame,
        trashGame: gamesResolvers.trashGame,
        recoverGame: gamesResolvers.recoverGame,
        deleteGame: gamesResolvers.deleteGame,
        addGoalLocalGame: gamesResolvers.addGoalLocalGame,
        removeGoalLocalGame: gamesResolvers.removeGoalLocalGame,
        addGoalVisitorGame: gamesResolvers.addGoalVisitorGame,
        removeGoalVisitorGame: gamesResolvers.removeGoalVisitorGame,
        closeGame: gamesResolvers.closeGame,
        // Métodos de pago
        addPaymentMethod: paymentMethodsResolvers.addPaymentMethod,
        editPaymentMethod: paymentMethodsResolvers.editPaymentMethod,
        trashPaymentMethod: paymentMethodsResolvers.trashPaymentMethod,
        recoverPaymentMethod: paymentMethodsResolvers.recoverPaymentMethod,
        deletePaymentMethod: paymentMethodsResolvers.deletePaymentMethod,
        // Eventos
        addEvent: eventsResolvers.addEvent,
        editEvent: eventsResolvers.editEvent,
        trashEvent: eventsResolvers.trashEvent,
        recoverEvent: eventsResolvers.recoverEvent,
        deleteEvent: eventsResolvers.deleteEvent,
        //Questions
        addQuestion: questionsResolvers.addQuestion,
        editQuestion: questionsResolvers.editQuestion,
        trashQuestion: questionsResolvers.trashQuestion,
        recoverQuestion: questionsResolvers.recoverQuestion,
        deleteQuestion: questionsResolvers.deleteQuestion,
    }
}

export default resolvers;