export const uploadDocumentToStorage = async (uri: string, fileName: string, mimeType: string): Promise<string> => {
        
    const safeFileName = fileName.replace(/\s+/g, '_');
    const uniqueFileName = `${Date.now()}_${safeFileName}`;
    
    const uploadUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/licenses/${uniqueFileName}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
            'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
            'Content-Type': mimeType,
        },
        body: blob, 
    });

    if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${errorText}`);
    }

    return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/licenses/${uniqueFileName}`;
};