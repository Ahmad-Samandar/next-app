import { z } from "zod";

const StudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export default StudentSchema;
