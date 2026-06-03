import prisma from "../db/prisma.js"
let FindAllStudents = async(req,res)=>{
    let allStudents = await prisma.students.findMany()
    res.json({
        message: "all students found",
        data: allStudents
    })
}
let FindStudentById = async(req,res)=>{

}
let CreateStudent = async(req,res)=>{

}
let UpdateStudent = async(req,res)=>{

}
let DeleteStudent = async(req,res)=>{

}
export {FindAllStudents, FindStudentById, CreateStudent, UpdateStudent, DeleteStudent}