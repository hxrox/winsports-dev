import applicationTypesResolvers from './resolvers/application-types.resolver';
import applicationsResolvers from './resolvers/application.resolver';
import usersResolvers from './resolvers/user.resolver';
import sessionsResolvers from './resolvers/session.resolver';
import modulesResolvers from './resolvers/module.resolver';
import actionsResolvers from './resolvers/action.resolver';

const resolvers = {
    ApplicationType: {
        applications: applicationsResolvers.applicationsByApplicationType
    },
    Application: {
        applicationType: applicationTypesResolvers.applicationType,
        modules: modulesResolvers.modulesByApplicationId
    },
    Module: {
        application: applicationsResolvers.application,
        actions: actionsResolvers.actionsByModuleId
    },
    Action: {
        users: usersResolvers.usersByActionId,
        module: modulesResolvers.module
    },
    User: {
        actions: actionsResolvers.actionsByIds
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
        action: actionsResolvers.action
    },
    Mutation: {
        // ApplicationTyes
        addApplicationType: applicationTypesResolvers.addApplicationType,
        editApplicationType: applicationTypesResolvers.editApplicationType,
        deleteLogicApplicationType: applicationTypesResolvers.deleteLogicApplicationType,
        deleteApplicationType: applicationTypesResolvers.deleteApplicationType,
        // Applications
        addApplication: applicationsResolvers.addApplication,
        editApplication: applicationsResolvers.editApplication,
        deleteLogicApplication: applicationsResolvers.deleteLogicApplication,
        deleteApplication: applicationsResolvers.deleteApplication,
        // Users
        addUser: usersResolvers.addUser,
        editUser: usersResolvers.editUser,
        deleteLogicUser: usersResolvers.deleteLogicUser,
        deleteUser: usersResolvers.deleteUser,
        userConfirmEmail: usersResolvers.userConfirmEmail,
        userChangePassword: usersResolvers.userChangePassword,
        // Modules
        addModule: modulesResolvers.addModule,
        editModule: modulesResolvers.editModule,
        deleteLogicModule: modulesResolvers.deleteLogicModule,
        deleteModule: modulesResolvers.deleteModule,
        // Actions
        addAction: actionsResolvers.addAction,
        editAction: actionsResolvers.editAction,
        deleteLogicAction: actionsResolvers.deleteLogicAction,
        deleteAction: actionsResolvers.deleteAction,
    }
}

export default resolvers;