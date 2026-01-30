 export interface UploadFileImgProps{
  
   title: string;
  register: any;
  error?: string;
 }
 export interface DeleteProps{
  title:string;
 }
 export interface CreateRommPayload{
    roomNumber:Number,
    price:  Number;
    capacity:Number;
    discount?:Number;
    facilities:string[];
    imgs:FileList
 }
 export interface SectionHeaderProps{
    title:string;
    subtitle:string;
    buttonText:string;
    onButtonClick:()=>void
 }
export interface DeleteConfirmProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}
