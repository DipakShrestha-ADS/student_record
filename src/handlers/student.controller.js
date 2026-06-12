import prisma from "../db/prisma.js";

const getStudents = async (req, res) => {
  try {
    // select is used to specify which fields to retrieve from the database, while include is used to specify related models to include in the result.
    // Please either use `include` or `select`, but not both at the same time.
    const students = await prisma.student.findMany({
      // select: {
      //   name: true, rollNo: true, id: true, email: true,enrollment: true, department: true,
      // },
      include: { enrollment: {
        include: {
          course: true,
        }
      }, department: {
        select: {
          name: true,
          id: true,
        }
      } },
    });
    res.json({ message: "Students retrieved successfully", data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStudentsWithSelect = async (req, res) => {
  let students = await prisma.student.findMany(
    {
      select:{
        name: true, 
        email: true,
        id: true,
        department: {
          select: {
            id: true,
            name: true,
          }
        },
        enrollment: true,
      }
    }
  )
  res.status(200).json({
    message: "all students fetched successfully",
    data: students
  })
}

// example for orderBy or sorting
export let sortStudents = async(req,res)=>{
  let students = await prisma.student.findMany({
    orderBy: {
      name: "asc"
    }
  })
  res.status(200).json({
    message: "students sorted data",
    data: students
  })
}
// multi level include example
const findStudentById = async (req, res) => {
  const { id } = req.params;
  let matchStudent = await prisma.student.findUnique({
    where: { id: Number(id) },
    include: { 
      enrollment: {
        include: {
          course: true,
        }
      }, 
      department: true, },
  });
  if (!matchStudent) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json({
    message: `Student with ID ${id} retrieved successfully`,
    data: matchStudent,
  });
};

const createStudent = async (req, res) => {
  const { name, email, rollNo, departmentId } = req.body;

  let createdStudent = await prisma.student.create({
    data: {
      name,
      email,
      rollNo,
      department: {
        connect: { id: departmentId }
      }
    },
  });
  res.status(201).json({
    message: "Student created successfully",
    data: createdStudent,
  });
};
// prisma create example
const createStudentWithDepartment = async (req, res) => {
  const { name, email, rollNo, departmentName } = req.body;
  // create student with department together
  let createdStudent = await prisma.student.create({
    data: {
      name,
      email,
      rollNo,
      department: {
        create: {
          name: departmentName
        }
      }
    },
  });
  res.status(201).json({
    message: "Student created successfully",
    data: createdStudent,
  });
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, rollNo, departmentId } = req.body;

  let updatedStudent = await prisma.student.update({
    where: { id: Number(id) },
    data: {
      name, email, rollNo,
      department: {
        connect: { id: departmentId }
      }
    },
  });
  res.status(200).json({
    message: "Student updated successfully",
    data: updatedStudent,
  });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  await prisma.student.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({
    message: "Student deleted successfully",
  });
};

export {
  getStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  createStudentWithDepartment,
  getAllStudentsWithSelect
};
