import applicationTypesResolvers from './resolvers/application-types.resolver';
import applicationsResolvers from './resolvers/application.resolver';
import usersResolvers from './resolvers/user.resolver';
import sessionsResolvers from './resolvers/session.resolver';
import modulesResolvers from './resolvers/module.resolver';
import actionsResolvers from './resolvers/action.resolver';
import rolesResolvers from './resolvers/role.resolver';
//Negocio
import countriesResolvers from './resolvers/country.resolver';

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
        roles: rolesResolvers.rolesByIds
    },
    Role: {
        application: applicationsResolvers.application,
        actions: actionsResolvers.actionsByIds,
        users: usersResolvers.usersByRoleId
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
        // Roles
        addRole: rolesResolvers.addRole,
        editRole: rolesResolvers.editRole,
        deleteLogicRole: rolesResolvers.deleteLogicRole,
        deleteRole: rolesResolvers.deleteRole,

        //Negocio
        // Paises
        addCountry: countriesResolvers.addCountry,
        editCountry: countriesResolvers.editCountry,
        deleteLogicCountry: countriesResolvers.deleteLogicCountry,
        deleteCountry: countriesResolvers.deleteCountry,
    }
}

export default resolvers;