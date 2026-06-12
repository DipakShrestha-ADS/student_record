import { createStudent, createStudentWithDepartment, deleteStudent, findStudentById, getAllStudentsWithSelect, getStudents, sortStudents, updateStudent } from "../handlers/student.controller.js";
import { Router } from "express";

let router = Router();
router.get("/", getStudents);
router.get("/sort", sortStudents);
router.get("/with-select", getAllStudentsWithSelect);

router.get("/:id", findStudentById);

router.post("/", createStudent);

router.post("/with-depart", createStudentWithDepartment);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);


export default router;