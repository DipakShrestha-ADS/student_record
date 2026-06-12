import prisma from "../db/prisma.js";

const getAllTeachers = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: { department: {
      select:{
        id: true,
        name: true,
      }
    }, courses: true },
  });
  res
    .status(200)
    .json({ message: "All teachers fetched successfully", data: teachers });
};
// using prisma relation select
export const getAllTeachersWithSelect = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    select:{
      name: true,
      id: true,
      createdAt: true,
      department: {
        select: {
          // name: true,
          id: true
        }
      },
      courses: true,
    }
  });
  res
    .status(200)
    .json({ message: "All teachers fetched successfully", data: teachers });
};

// sorting wiht orderBy
let sortTeachers = async(req,res)=>{
  let teachers = await prisma.teacher.findMany({
    orderBy:{
      name: "desc"
    }
  })
  res.status(200).json({
    message: "sorted teachers",
    data: teachers
  })
}
// filtering:
let filterTeachers = async(req,res)=>{
  let teachers = await prisma.teacher.findMany({
    where: {
      name:{
        gte: "a"
      }
    }
  })
  res.status(200).json({
    message: "sorted teachers",
    data: teachers
  })
}

const findTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await prisma.teacher.findUnique({
    where: { id: Number(id) },
  });
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.status(200).json({
    message: `Teacher with ID ${id} fetched successfully`,
    data: teacher,
  });
};

const createTeacher = async (req, res) => {
  const { name, email, departmentId } = req.body;
  const newTeacher = await prisma.teacher.create({
    data: {
      name,
      email,
      department: {
        connect: { id: Number(departmentId) },
      },
    },
  });
  res.status(201).json({
    message: "Teacher created successfully",
    data: newTeacher,
  });
};
// using create prisma relation
export const createTeacherWithDepartment = async (req, res) => {
  const { name, email, departmentName } = req.body;
  const newTeacher = await prisma.teacher.create({
    data: {
      name,
      email,
      department: {
        create: {
          name: departmentName
        }
      },
    },
  });
  res.status(201).json({
    message: "Teacher created successfully",
    data: newTeacher,
  });
};

const updateTeacher = async (req, res) => {};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  await prisma.teacher.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Teacher deleted successfully" });
};

export {
  getAllTeachers,
  findTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
