import { connectDatabase } from "./connection";

async function seed() {
  await connectDatabase();
  console.log("Seed script ready — implement when models are created");
  process.exit(0);
}

seed();
