import { db } from "./index";
import { income } from "./schema";

async function seed() {
  console.log("Seeding database...");

  await db.insert(income).values([
    {
      amount: "1000",
      date: "2025-07-01",
      clientName: "Client A",
      nif: "123456789",
      description: "Freelance project A",
      withVat: true,
    },
    {
      amount: "500",
      date: "2025-07-15",
      clientName: "Client B",
      nif: "987654321",
      description: "Consulting work",
      withVat: false,
    },
    {
      amount: "750",
      date: "2025-07-20",
      clientName: "Client C",
      nif: "456789123",
      description: "Design services",
      withVat: true,
    },
  ]);

  console.log("Seeding complete!");
}

seed()
  .catch((err) => {
    console.error("Error seeding database:", err);
  })
  .finally(() => {
    process.exit();
  });
