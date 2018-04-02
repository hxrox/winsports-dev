import applicationTypesResolvers from './resolvers/application-types.resolver';
import applicationsResolvers from './resolvers/application.resolver';
import usersResolvers from './resolvers/user.resolver';
import sessionsResolvers from './resolvers/session.resolver';

const resolvers = {
    ApplicationType: {
        applications: applicationsResolvers.applicationsByApplicationType
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
        sessions: sessionsResolvers.sessions
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
        userChangePassword: usersResolvers.userChangePassword
    }
}

export default resolvers;