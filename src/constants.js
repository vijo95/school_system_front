const localhost = "http://localhost:8000"
const host = "https://school-system-service.herokuapp.com"

const apiURL = "/api"

export const endpoint = `${host}${apiURL}`

export const home = `${endpoint}/`
export const studentOrTeacher = `${endpoint}/student-teacher/`
export const createProfile = `${endpoint}/create-profile/`

export const subjects = `${endpoint}/subjects/`

export const createTask = `${endpoint}/create-task/`
export const studentTaskDetail = `${endpoint}/student-task-detail/`
export const updateStudentTask = `${endpoint}/update-student-task/`

export const createTest = `${endpoint}/create-test/`
export const studentTestDetail = `${endpoint}/student-test-detail/`
export const updateStudentTest = `${endpoint}/update-student-test/`