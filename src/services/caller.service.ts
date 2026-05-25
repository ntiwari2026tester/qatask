import prisma from "../prisma";

export type CallerRecord = {
  id: number;
  name: string;
  email: string;
  phone: string;
  roleId: number;
  isActive: boolean;
  createdAt: Date;
};

/**
 * Retrieves a caller record by ID from the database.
 * @param callerId The unique database ID of the caller.
 * @throws Error if caller is not found or a database connection error occurs.
 */
export async function getCallerById(callerId: number): Promise<CallerRecord> {
  const record = await prisma.caller.findUnique({
    where: { id: callerId },
  });

  if (!record) {
    throw new Error("Caller not found");
  }

  return record;
}
