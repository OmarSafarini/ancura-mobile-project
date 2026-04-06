import { ImageSourcePropType } from "react-native";
import { ILicense } from "./ILicense"; 

export interface IDoctor {
  name: string;
  email: string;
  profilePic: ImageSourcePropType;
  location: string;
  comments: number;
  reputation: number;
  experience: number;
  bio: string;
  license: ILicense; 
}