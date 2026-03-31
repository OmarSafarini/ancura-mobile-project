import * as DocumentPicker from "expo-document-picker";

export type AttachmentsFieldProps = {
  onFilesChange?: (files: DocumentPicker.DocumentPickerAsset[]) => void;
  maxFiles?: number;
  acceptedTypes?: string | string[];
  files?: DocumentPicker.DocumentPickerAsset[];
};