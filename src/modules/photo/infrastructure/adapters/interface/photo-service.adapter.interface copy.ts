import { IPhotoMetadata } from "@/modules/photo/domain/entities/interfaces/photo.interface";

export interface IPhotoServiceAdapter {
  upload(
    userId: string,
    file: Buffer,
    metadata?: IPhotoMetadata
  ): Promise<string>;
  getById(photoId: string): Promise<{ id: string; url: string } | null>;
  delete(photoUrl: string): Promise<void>;
}
