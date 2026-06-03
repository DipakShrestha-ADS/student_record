import { CreateStudent, DeleteStudent, FindAllStudents, FindStudentById, UpdateStudent } from "../handlers/handler.js"
import router from "./routes.js"

router.get(
    "/", FindAllStudents
)
router.get(
    "/:id",
    FindStudentById
)
router.post(
    "/",
    CreateStudent
)
router.put(
    "/:id",
    UpdateStudent
)
router.delete(
    "/:id",
    DeleteStudent
)
export default router