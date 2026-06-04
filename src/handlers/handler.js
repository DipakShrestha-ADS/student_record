import prisma from "../db/prisma.js"
let FindAllStudents = async (req, res) => {
    let allStudents = await prisma.students.findMany()
    res.json({
        message: "all students found",
        data: allStudents
    })
}
let FindStudentById = async (req, res) => {
    let matchStudent = await prisma.students.findUnique({
        where: {
            id: Number(req.params.id),
        }
    })
    res.status(200).json({
        message: "student found",
        data: matchStudent
    })
}
let CreateStudent = async (req, res) => {
    let data = req.body
    let createdStudent = await prisma.students.create({
        data: data
    })
    res.status(201).json({
        message: "student created successfully",
        data: createdStudent
    })
}
let UpdateStudent = async (req, res) => {
    let id = req.params.id
    let { name, email, roll_no } = req.body
    let updatedStudent = await prisma.students.update(
        {
            where: {
                id: Number(id),
            },
            data: {
                name,
                email,
                rollNo: roll_no,
            }
        }
    )
    res.status(200).json({
        message: "udpated",
        data: UpdateStudent
    })
}
let DeleteStudent = async (req, res) => {

}
export { FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent }