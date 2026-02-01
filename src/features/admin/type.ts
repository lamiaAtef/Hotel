 export interface UploadFileImgProps{
  
   title: string;
  register: any;
  error?: string;
 }
 export interface DeleteProps{
  title:string;
 }
export interface SectionHeaderProps{
    title:string;   
    subtitle:string;
    buttonText?:string;
    onButtonClick?:()=>void;
}

export interface CustomDialogProps{
    open:boolean;
    onClose:()=>void;
    title:string;
    children:React.ReactNode; 
    maxWidth?:'xs' | 'sm' | 'md' | 'lg';
}
export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}
 export interface CreateRommPayload{
    roomNumber:Number,
    price:  Number;
    capacity:Number;
    discount?:Number;
    facilities:string[];
    imgs:FileList
 }

export interface DeleteConfirmProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}
export interface AdsPayload{

   _id:string;
   isActive:boolean;

   room:CreateRommPayload,
}
