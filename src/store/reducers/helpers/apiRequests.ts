const getUserRequest = `
query GetUser($userId: String!) {
    getUser(userId: $userId) {
        id
        describe_name
        describe_date
        describe_specialization
        describe_position
        describe_role
        currentTask
        mail
        jobs {
            ship_name
            job_description
            project_number
            name_of_company_locale
            hours_worked
            report_period
            order
            notes
        }
    }
}
`

const getCTORequest = `
query {
    getCTO {
        id
        describe_name
        describe_date
        describe_specialization
        describe_position
        describe_role
        currentTask
        describe_password
        mail
        jobs {
            ship_name
            job_description
            project_number
            hours_worked
            report_period
            notes
        }
    }
}
`

const getUsersRequest = `
query {
    getUsers {
        id
        describe_name
        describe_date
        describe_specialization
        describe_position
        describe_role
        currentTask
        describe_password
        mail
        jobs {
            ship_name
            job_description
            project_number
            name_of_company_locale
            hours_worked
            report_period
            notes
        }
    }
}
`

const loginRequest = `
mutation Login($username: String!, $password: String!) {
    login(loginDto: { username: $username, password: $password }) {
        access_token
        refresh_token
    }
}
`

const refreshRequest = `
mutation Refresh {
    refresh {
        access_token
    }
}
`

const checkAuthRequest = `
query CheckAuth {
    checkAuth {
        id
    }
}
`

const logoutRequest = `
mutation Logout {
    logout
}
`

const getJobsByUserIdRequest = `
query GetJobsByUserIdAndPeriod($userId: String!) {
    getJobsByUserIdAndPeriod(userId: $userId, period: $period) {
        ship_name
        job_description
        name_of_company_locale
        project_number
        hours_worked
        report_period
        order
        notes
    }
}
`

const getJobsByUserIdAndPeriodRequest = `
query GetJobsByUserIdAndPeriod($userId: String!, $period: String!) {
    getJobsByUserIdAndPeriod(userId: $userId, period: $period) {
        id
        ship_name
        job_description
        name_of_company_locale
        project_number
        hours_worked
        report_period
        order
        notes
    }
}
`

const updateJobsByUserIdAndPeriodRequest = `
mutation UpdateJobsByUserIdAndPeriod($updateJobsData: UpdateJobsInput!) {
    updateJobsByUserIdAndPeriod(updateJobsData: $updateJobsData) {
        order
    }
}
`

const createUserRequest = `
mutation CreateUser(
    $describe_name: String!
    $describe_date: String
    $describe_specialization: String
    $describe_position: String
    $describe_password: String!
    $CTO: Boolean
) {
    createUser(
        createUserData: {
        describe_name: $describe_name
        describe_date: $describe_date
        describe_specialization: $describe_specialization
        describe_position: $describe_position
        describe_password: $describe_password
        CTO: $CTO
        }
    ) {
        id
    }
}
`

const deleteUserRequest = `
mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
}
`

const updatePasswordRequest = `
mutation UpdatePassword($id: String!, $newPassword: String!) {
    updatePassword(id: $id, newPassword: $newPassword)
}
`

const updateUserRequest = `
mutation UpdateUser($id: String!, $updateUserData: UpdateUserInput!) {
    updateUser(id: $id, updateUserData: $updateUserData) {
        id
    }
}
`

const getCurrencyRateRequest = `
query GetCurrency($pair: [String!]!) {
    getCurrency(pair: $pair) {
        baseCurrency
        quoteCurrency
        crossRate
    }
}
`

export const apiRequests = {
   getUserRequest,
   getCTORequest,
   getUsersRequest,
   loginRequest,
   refreshRequest,
   checkAuthRequest,
   logoutRequest,
   getJobsByUserIdRequest,
   getJobsByUserIdAndPeriodRequest,
   updateJobsByUserIdAndPeriodRequest,
   createUserRequest,
   deleteUserRequest,
   updatePasswordRequest,
   updateUserRequest,
   getCurrencyRateRequest
}
