import { z } from "zod";

const CourseSchema = z.object({
  courseName: z.string().min(3),
  courseCode: z.string().min(3),
  courseCredits: z.number().min(1),
  courseInstructor: z.string().min(3),
});

export default CourseSchema;
