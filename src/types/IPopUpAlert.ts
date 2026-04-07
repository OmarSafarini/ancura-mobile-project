export type IPopUpAlert = { 
  title : string, 
  description : string, 
  cancel : string , 
  confirm : string, 
  onConfirm?: () => void; 
  onCancel?: () => void; 
};
