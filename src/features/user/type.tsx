 export interface MyRoomData {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[];
    images: string[]; 
    createdAt: string;
    updatedAt: string;
  }
 export interface MyAdsPayload {
    _id: string;
    isActive: boolean;
    room: MyRoomData;
  }

import axios from "axios";

export const publicAxios = axios.create({
  baseURL: "http://upskilling-egypt.com:3000/api/v0",
});
