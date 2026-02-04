 export interface MyRoomData {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
    images: string[]; // روابط الصور
    createdAt: string;
    updatedAt: string;
  }
 export interface MyAdsPayload {
    _id: string;
    isActive: boolean;
    room: MyRoomData;
  }