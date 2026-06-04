import prisma from "../db/prisma.js"
import { ValidateAllFieldTypes, ValidateEmptyField } from "../validators/field_validator.js"
let FindAllStudents = async (req, res) => {
    try {
        let allStudents = await prisma.students.findMany()
        res.json({
            message: "all students found",
            data: allStudents
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let FindStudentById = async (req, res) => {
    try {
        let id = req.params.id
        // empty validation with bad request status
        if (id === ""){
            res.status(400).json({
                error: "id cannot be empty",
            })
            return
        }
        // check if id is number or not and must return status related to it
        if (isNaN(id)){
            res.status(400).json({
                error: "id must be a number",
            })
            return
        }
        let matchStudent = await prisma.students.findUnique({
            where: {
                id: Number(req.params.id),
            }
        })
        res.status(200).json({
            message: "student found",
            data: matchStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateStudent = async (req, res) => {
    try {
        let data = req.body
        let {email, name, roll_no} = data
        let validateMsg = ValidateAllFieldTypes("email", email)
        if(validateMsg != null){
            res.status(400).json({
                error: validateMsg
            })
            return
        }
        let validateMsg = ValidateAllFieldTypes("name", name)
        if(validateMsg != null){
            res.status(400).json({
                error: validateMsg
            })
            return
        }
        let createdStudent = await prisma.students.create({
            data: data
        })
        res.status(201).json({
            message: "student created successfully",
            data: createdStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let UpdateStudent = async (req, res) => {
    try {
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
    } catch (e) {
        res.status(500).json({
            error: "cannot update student",
            stack: e?.message
        })
    }
}
github.com / DipakShrestha - ADS / student_record.git
let DeleteStudent = async (req, res) => {
    try {
        let id = req.params.id
        let deletedStudent = await prisma.students.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: `Student with id ${id} deleted successfully.`,
            data: deletedStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
export { FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent }