const { buildSchema } = require('graphql');

module.exports = buildSchema(`        
            type User {
                _id: ID!
                email: String!
                password: String
                userRole: String!
            }

            type Student {
                _id: ID!
                name: String!
                idNumber: String!
                userId: User!
                enrolledSubjects: [Subject!]
                markIds: [Mark!]
                email: String!
            }

            type Lecturer {
                _id: ID!
                name: String!
                idNumber: String!
                userId: User!
                lecturerSubjects: [Subject!]
                email: String!
            }

            type Subject{
                _id :ID!
                name: String!
                key: String!
                description: String
                assignments: [Assignment!]
                lectures: [Lecturer!]
                enrolledStudents: [Student!]!
                course: Course!
            }

            type Assignment{
                _id: ID!
                name: String!
                date: String!
                description: String
                subject: Subject!
                creator: User!
            }

            type Course{
                _id: ID!
                name: String!
                description: String
                subjects: [Subject!]
            }

            type Mark{
                _id: ID!
                description: String
                assignment: Assignment!
                student: Student!
                mark: Float!
                creator: User!
            }

            type AuthData {
                userId: ID!
                token: String!
                tokenExpiration: Int!
            }
            
            input UserInput{
                email: String!
                password: String!
                userRole: String!
                idNumber: String!
                name: String!
            } 

            input SubjectInput{
                name: String!
                key: String!
                description: String
                course: String!
            }

            input AssignmentInput{
                name: String!
                date: String!
                description: String
                subject: String!
            }

            input CourseInput{
                name: String!
                description: String
            }

            input MarkInput{
                description: String
                assignment: String!
                student: String!
                mark: Float!
                creator: String!
            }

            type RootQuery{
                login(email: String! , password: String!): AuthData!
                courses: [Course!]!
                subjects(courseId: String!): [Subject!]!
                students(subjectId: String!): [Student!]!
                assignments(subjectId: String!): [Assignment!]!
                enrolledSubjects: Student!
                lecturerSubjects: Lecturer!
            }

            type RootMutation{
                createUser(userInput: UserInput): User!
                createCourse(courseInput: CourseInput): Course!
                createSubject(subjectInput: SubjectInput): Subject!
                createAssignment(assignmentInput: AssignmentInput): Assignment!
                markForStudent(markInput: MarkInput): Mark!
                enrollForSubject(subjectId: String!): Student!
            }

            schema{
                query: RootQuery
                mutation: RootMutation
            }
    `)