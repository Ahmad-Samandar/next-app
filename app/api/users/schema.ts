import { z } from "zod";

const schema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
});

export default schema;
