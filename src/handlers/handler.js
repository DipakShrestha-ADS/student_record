import prisma from "../db/prisma.js"
import { ValidateAllFieldTypes, ValidateEmptyField } from "../validators/field_validator.js"
let FindAllStudents = async (req, res) => {
    let allStudents = await prisma.students.findMany()
    res.json({
        message: "all students found",
        data: allStudents
    })
}
let FindStudentById = async (req, res) => {
    let id = req.params.id
    let matchedStudent = await prisma.students.findUnique({
        where:{
            id: Number(id)
        }
    })
    res.status(200).json({
        message: `student with ${id} fetched successfully`,
        data: matchedStudent
    })
}
let CreateStudent = async (req, res) => {
    let {email, name, rollNo} = req.body
    let createdStudent = await prisma.students.create({
        data: {
            name,
            email,
            rollNo
        },
    })
    res.status(201).json({
        message: "student created successfully",
        data: createdStudent
    })
}
let UpdateStudent = async (req, res) => {
    let id = req.params.id
    let {email, name, rollNo} = req.body
    let updatedStudent = await prisma.students.update({
        where: {id},
        data:{email, name, rollNo}
    })
    res.status(200).json(
        {
            message: `student with id ${id} updated successfully`,
            data: updatedStudent
        }
    )
}
let DeleteStudent = async (req, res) => {
    let id = req.params.id
    let deletedData = await prisma.students.delete({
        where: {id}
    })
    res.status(200).json({
        message: `student with id ${id} deleted successfully`,
        data :deletedData
    })
}
export { FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent }