export type CreateInteractionInput = {
  studentId: number;
  statusId: number;
  remarks: string;
};

export class InteractionService {
  /**
   * Logs a student interaction in the database.
   * @param input Data transfer object containing studentId, statusId, and remarks.
   * @param userId The ID of the authenticated user performing the action.
   */
  async createInteraction(input: CreateInteractionInput, userId: number): Promise<any> {
    // This is a service signature that will be mocked during controller testing.
    return {
      id: 101,
      studentId: input.studentId,
      statusId: input.statusId,
      remarks: input.remarks,
      createdBy: userId,
      createdAt: new Date(),
    };
  }
}

export const interactionService = new InteractionService();
