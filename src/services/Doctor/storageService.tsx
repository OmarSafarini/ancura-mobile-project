import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
);

export const uploadDocumentToStorage = async (uri: string, fileName: string, mimeType: string, bucketName: string = 'licenses'): Promise<string> => {
        
    const safeFileName = fileName.replace(/\s+/g, '_');
    const uniqueFileName = `${Date.now()}_${safeFileName}`;
    
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: fileName,
            type: mimeType
        } as any);
        
        console.log(`[STORAGE] Uploading to bucket: ${bucketName}, file: ${uniqueFileName}`);

        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(uniqueFileName, formData);

        if (error) {
            console.error("[STORAGE] Supabase upload error:", error);
            throw new Error(`Supabase upload error: ${error.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(uniqueFileName);

        console.log(`[STORAGE] Upload success! URL: ${publicUrlData.publicUrl}`);
        return publicUrlData.publicUrl;

    } catch (err: any) {
        console.error("[STORAGE] Exception caught during upload:", err);
        throw new Error(`Exception during upload: ${err.message || JSON.stringify(err)}`);
    }
};