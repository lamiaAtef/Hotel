export interface cardType {
    img_src: any;
    alt_text: string;   
    title: string;
    description: string;    
}
export interface sliderTypeProps {
    cards:any[];
    title:string;
}
// image side
export type BorderShape =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";
export interface ImageSideProps{
    
    imageName:string,
    xPosition:number | string,
    yPosition:number | string,
    borderShape:BorderShape,
}
export interface ExploreRoomFormValues {
  dateRange?: [Date, Date];
  
}

export interface ExploreRoomProps {
    size:number,
    page:number,
    startDate: string|Date,
    endDate: string|Date,

}

export interface HotelStepperProps {
  num: number;
};