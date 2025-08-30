import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "@/utils/asyncHandler";

// Extend the Request interface to include the 'file' property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const prisma = new PrismaClient();

export class PhotoController {
  uploadPhoto = asyncHandler(
    async (req: MulterRequest, res: Response): Promise<void> => {
      if (!req.file) {
        res.status(400).json({ error: "Photo is required" });
        return;
      }

      const { userId } = req.body;

      const photo = await prisma.photo.create({
        data: {
          userId: parseInt(userId, 10).toString(),
          uploadedAt: new Date(), // mejor usar timestamp real
          url: req.file.path, // OJO: en prod deberías guardar un URL accesible (ej: Supabase, S3)
        },
      });

      res.status(201).json(photo);
    }
  );

  deletePhoto = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;

      const photo = await prisma.photo.findUnique({ where: { id } });
      if (!photo) {
        res.status(404).json({ error: "Photo not found" });
        return;
      }

      await prisma.photo.delete({ where: { id } });

      res.status(204).send(); // No content
    }
  );

  getPhotoById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;

      const photo = await prisma.photo.findUnique({ where: { id } });
      if (!photo) {
        res.status(404).json({ error: "Photo not found" });
        return;
      }

      res.json(photo);
    }
  );
}
