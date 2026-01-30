 export interface UploadFileImgProps{
  title:string;
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