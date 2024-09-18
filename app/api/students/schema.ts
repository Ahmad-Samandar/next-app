import { z } from "zod";

// Define a schema for a Student object using zod
// This schema ensures that every student has a first name, last name, and a valid email address
const StudentSchema = z.object({
  firstName: z.string(), // firstName has to be a string
  lastName: z.string(), // lastName also needs to be a string
  email: z.string().email(), // email must be a string and should follow the proper email format
});

export default StudentSchema; // Export the schema so we can use it wherever we need to validate student data
