import { createInteraction, AuthenticatedRequest } from "../controllers/interaction.controller";
import { interactionService } from "../services/interaction.service";
import { Response } from "express";

// Mock the interaction service
jest.mock("../services/interaction.service", () => ({
  interactionService: {
    createInteraction: jest.fn(),
  },
}));

describe("interactionController.createInteraction", () => {
  const mockCreateInteraction = interactionService.createInteraction as jest.Mock;

  let req: Partial<AuthenticatedRequest>;
  let res: Response;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Set up standard mock req/res objects
    req = {
      body: {},
      user: {
        id: 1,
        email: "test@example.com",
        userType: 1,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  // 1. Missing studentId → res.status(400) called, res.json called with { success: false, message: "Student ID is required" }
  test("should return 400 when studentId is missing", async () => {
    req.body = {
      statusId: 2,
      remarks: "Followed up with student",
    };

    await createInteraction(req as AuthenticatedRequest, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Student ID is required",
    });
    expect(mockCreateInteraction).not.toHaveBeenCalled();
  });

  // 2. Missing statusId → res.status(400) called with correct error
  test("should return 400 when statusId is missing", async () => {
    req.body = {
      studentId: 10,
      remarks: "Followed up with student",
    };

    await createInteraction(req as AuthenticatedRequest, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Status ID is required",
    });
    expect(mockCreateInteraction).not.toHaveBeenCalled();
  });

  // 3. Missing remarks → res.status(400) called with correct error
  test("should return 400 when remarks are missing", async () => {
    req.body = {
      studentId: 10,
      statusId: 2,
    };

    await createInteraction(req as AuthenticatedRequest, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Remarks are required",
    });
    expect(mockCreateInteraction).not.toHaveBeenCalled();
  });

  // 4. All fields present, service resolves successfully → res.status(201) and res.json with success details
  test("should return 201 and data when service resolves successfully", async () => {
    const interactionBody = {
      studentId: 10,
      statusId: 2,
      remarks: "Interaction logged successfully",
    };
    req.body = interactionBody;

    const mockCreatedRecord = {
      id: 100,
      ...interactionBody,
      createdBy: 1,
      createdAt: new Date(),
    };

    mockCreateInteraction.mockResolvedValue(mockCreatedRecord);

    await createInteraction(req as AuthenticatedRequest, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Interaction logged",
      data: mockCreatedRecord,
    });
  });

  // 5. All fields present, service throws → res.status(500) called
  test("should return 500 when service throws an error", async () => {
    req.body = {
      studentId: 10,
      statusId: 2,
      remarks: "Will throw error",
    };

    const serviceError = new Error("Database connection lost");
    mockCreateInteraction.mockRejectedValue(serviceError);

    await createInteraction(req as AuthenticatedRequest, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Database connection lost",
    });
  });

  // 6. Verify that on valid input, the service is called with (req.body, 1) (where 1 is req.user.id)
  test("should call service with req.body and req.user.id on valid inputs", async () => {
    const interactionBody = {
      studentId: 15,
      statusId: 3,
      remarks: "User is ready for enrollment",
    };
    req.body = interactionBody;
    req.user = {
      id: 1,
      email: "officer@example.com",
      userType: 2,
    };

    mockCreateInteraction.mockResolvedValue({ id: 105 });

    await createInteraction(req as AuthenticatedRequest, res);

    expect(mockCreateInteraction).toHaveBeenCalledWith(interactionBody, 1);
  });
});
