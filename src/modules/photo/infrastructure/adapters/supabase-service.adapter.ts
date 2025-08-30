import { Router, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

const router = Router();
const upload = multer(); // memoria, no escribe en /uploads

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Upload a photo
router.post(
  "/upload",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Photo is required" });
        return;
      }

      const { userId } = req.body;

      // Subir a supabase storage
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: publicUrl } = supabase.storage
        .from("photos")
        .getPublicUrl(fileName);

      // Guardar en DB
      const photo = await prisma.photo.create({
        data: {
          userId,
          url: publicUrl.publicUrl,
          uploadedAt: new Date(),
        },
      });

      res.status(201).json(photo);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
);
