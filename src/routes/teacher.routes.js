import { getAllStudentsWithSelect } from "../handlers/student.controller.js";
import {
  createTeacher,
  findTeacherById,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  createTeacherWithDepartment,
  getAllTeachersWithSelect,
} from "../handlers/teacher.controller.js";
import { Router } from "express";

let router = Router();

router.get("/", getAllTeachers);
router.get("/single/:id", findTeacherById);
router.get("/select", getAllTeachersWithSelect)
router.post("/", createTeacher);
router.post("/with-dpart", createTeacherWithDepartment);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
