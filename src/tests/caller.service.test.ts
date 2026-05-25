import { getCallerById, CallerRecord } from "../services/caller.service";
import prisma from "../prisma";

// Mock the prisma client module
jest.mock("../prisma", () => ({
  __esModule: true,
  default: {
    caller: {
      findUnique: jest.fn(),
    },
  },
}));

describe("callerService.getCallerById", () => {
  const mockFindUnique = prisma.caller.findUnique as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Happy path — findUnique resolves with a valid caller → service returns the caller
  test("should return caller record when caller exists (happy path)", async () => {
    const mockRecord: CallerRecord = {
      id: 42,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      roleId: 2,
      isActive: true,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    };

    mockFindUnique.mockResolvedValue(mockRecord);

    const result = await getCallerById(42);

    expect(result).toEqual(mockRecord);
    expect(mockFindUnique).toHaveBeenCalledTimes(1);
  });

  // 2. Not found — findUnique resolves with null → service throws Error("Caller not found")
  test("should throw 'Caller not found' error when record does not exist", async () => {
    mockFindUnique.mockResolvedValue(null);

    await expect(getCallerById(999)).rejects.toThrow("Caller not found");
    expect(mockFindUnique).toHaveBeenCalledTimes(1);
  });

  // 3. Verify findUnique was called with the correct argument: { where: { id: callerId } }
  test("should call prisma findUnique with the correct arguments", async () => {
    const mockRecord: CallerRecord = {
      id: 5,
      name: "NITESH TIWARI",
      email: "nitesh123@gmail.com",
      phone: "78548665478",
      roleId: 1,
      isActive: true,
      createdAt: new Date(),
    };

    mockFindUnique.mockResolvedValue(mockRecord);

    const callerId = 5;
    await getCallerById(callerId);

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: callerId },
    });
  });

  // 4. Database error — findUnique rejects with new Error("DB connection lost") → the error propagates
  test("should propagate database errors when findUnique rejects", async () => {
    const dbError = new Error("DB connection lost");
    mockFindUnique.mockRejectedValue(dbError);

    await expect(getCallerById(123)).rejects.toThrow("DB connection lost");
    expect(mockFindUnique).toHaveBeenCalledTimes(1);
  });
});
