import { Request, Response } from "express";
import { interactionService } from "../services/interaction.service";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    userType: number;
  };
}

/**
 * Controller to create an interaction.
 * Path: POST /api/interactions
 */
export async function createInteraction(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { studentId, statusId, remarks } = req.body || {};

  if (!studentId) {
    res.status(400).json({ success: false, message: "Student ID is required" });
    return;
  }
  if (!statusId) {
    res.status(400).json({ success: false, message: "Status ID is required" });
    return;
  }
  if (!remarks) {
    res.status(400).json({ success: false, message: "Remarks are required" });
    return;
  }

  try {
    const userId = req.user?.id;
    if (userId === undefined) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const result = await interactionService.createInteraction(req.body, userId);
    
    res.status(201).json({
      success: true,
      message: "Interaction logged",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
