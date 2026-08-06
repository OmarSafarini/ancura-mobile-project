import { delay } from '../mockData';

export const uploadDocumentToStorage = async (uri: string, fileName: string, mimeType: string, bucketName: string = 'licenses'): Promise<string> => {
  try {
    await delay(500); // simulate upload
    const dummyUrl = `https://mock-storage.ancura.com/${bucketName}/${Date.now()}_${fileName.replace(/\s+/g, '_')}`;
    console.log(`[STORAGE] Mock upload success! URL: ${dummyUrl}`);
    return dummyUrl;
  } catch (err: any) {
    console.error("[STORAGE] Exception caught during mock upload:", err);
    throw new Error(`Exception during upload: ${err.message}`);
  }
};