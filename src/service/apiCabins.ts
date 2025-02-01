import supabase, { supabaseUrl } from "./supabase";

export interface CabinType {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  imageUrl?: string;
}

export type CabinCreateWithImage = Partial<Omit<CabinType, "created_at" | "id">> &
  ({ image: FileList; imageUrl?: never } | { image?: never; imageUrl: string });

export async function createCabin(cabProp: CabinCreateWithImage, id?: number) {
  try {
    const { image, ...newCabin } = cabProp;
    const hasImage = Boolean(image && image.length > 0);

    const { imagePath, imageName } = hasImage
      ? getUrl(image![0], newCabin.name)
      : { imagePath: newCabin.imageUrl };

    const database = supabase.from("cabins");
    const query = id
      ? database.update({ ...newCabin, imageUrl: imagePath }).eq("id", id)
      : database.insert([{ ...newCabin, imageUrl: imagePath }]);

    const { data, error } = await query.select().single();
    if (error) throw new Error(`Cabin could not be loaded: ${error.message}`);

    if (hasImage) {
      const { error: errorStorage } = await supabase.storage
        .from("cabin-images")
        .upload(imageName!, image![0]);

      if (errorStorage) {
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error(`Failed to upload image: ${errorStorage.message}`);
      }
    }

    return data;
  } catch (error) {
    console.error("Error while creating cabin", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create cabin: ${error.message}`);
    } else {
      throw new Error("Failed to create cabin: Unknown error");
    }
  }
}

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error(`Cabins could not be loaded: ${error.message}`);
  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error(`Cabin could not be deleted: ${error.message}`);
  return data;
}

function getUrl(image: string | File, name?: string): { imageName?: string; imagePath: string } {
  if (image instanceof File) {
    const extension = image.name.split(".").pop()?.toLowerCase();
    if (!extension) throw new Error("Invalid file type");

    const validExtensions = ["jpg", "jpeg", "png", "gif"];
    if (!validExtensions.includes(extension)) {
      throw new Error(`Invalid file type. Supported types are: ${validExtensions.join(", ")}`);
    }

    const timestamp = Date.now();
    const imageName = `${timestamp}-${name}.${extension}`;
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    return { imageName, imagePath };
  } else {
    return { imagePath: image };
  }
}
