import { Router } from "express";
import multer from "multer";
import { PhotoController } from "./controllers/photo-controller";
import { validateDto } from "@/shared/middleware/validation.middleware";
import { DeletePhotoDto, GetPhotoDto, UploadPhotoDto } from "./dto";

const router = Router();
const upload = multer({ dest: "uploads/" });
const photoController = new PhotoController();

// Middleware for handling validation errors
router.post(
  "/upload",
  upload.single("photo"),
  validateDto(UploadPhotoDto),
  photoController.uploadPhoto
);

router.delete("/:id", validateDto(DeletePhotoDto), photoController.deletePhoto);

router.get("/:id", validateDto(GetPhotoDto), photoController.getPhotoById);

export default router;
