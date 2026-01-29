
export interface SectionHeaderProps{
    title: string;
    subtitle: string;
    buttonText?:string;
    onButtonClick?:() => void;
}
 export interface UploadFileImgProps{
  title:string;
 }
 export interface DeleteProps{ 
  open: boolean;
  title?: string;
  onClose: ()=> void;
  onConfirm: ()=> void;
 }

 export interface FacilityRow {
    id: string;
    name: string;
    createdBy: string;
    createdAt: string;
  }
  export interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode; 
    maxWidth?: "xs" | "sm" | "md" | "lg";
  }
