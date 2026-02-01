 export interface UploadFileImgProps{
  
   title: string;
  register: any;
  error?: string;
 }
//  export interface DeleteProps{
//   title:string;

//  }
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
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}
export interface AdsPayload{

   _id:string;
   isActive:boolean;

   room:CreateRommPayload,
}


//  export interface UploadFileImgProps{
//   title:string;
//  }
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

  export interface User{
    _id: string;
    userName: string;
    email: string;
    phoneNumber: number;
    country: string;
    role: string;
    profileImage: string;
    createdAt?: string;
    updatedAt?: string;

  }

  export interface CustomPaginationProps {
    page: number;          // 0-based
    rowsPerPage: number;
    rowCount: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; // عدد الصفحات اللي جنب الصفحة الحالية
  }
