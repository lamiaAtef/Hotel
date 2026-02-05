import axios from "axios";

export const baseURL=`https://upskilling-egypt.com:3000/api/v0`;
export const authURL = `${baseURL}/portal/users`
export const imgBaseURL='';


export const AUTH_URLS = {
    LOGIN : `/portal/users/login`,
    REGISTER : "/portal/users/",
    FORGET_PASSWORD : `/portal/users/forgot-password`,
    RESET_PASSWORD : `/portal/users/reset-password` ,
    CHANGE_PASSWORD : `/portal/users/change-password`,
    GOOGLE_AUTH : `/portal/users/auth/google`,
    FACEBOOK_AUTH : `/portal/users/auth/facebook`,
    PROFILE : (user_id:string) => `/portal/users/${user_id}`,
}
export const ADMIN_URLS = {
    DASHBOARD : `/admin/dashboard`,
    CREATEROOM:`/admin/rooms`,
    GETALLFACILITES:`/admin/room-facilities`,
    GETALLROOMS:`/admin/rooms`,
    EDITROOM :`/admin/rooms`,
    DELETEROOM:`/admin/rooms`,
     GET_ALL_BOOKINGS : `/admin/booking`,
    GET_BOOKING_DETAILS : (bookingId:string) => `/admin/booking/${bookingId}`,
}
export const ADS_URLS = {
    GET_ALL_ADS : `/admin/ads`,
    CREATE_ADS:`/admin/ads`,
    DELETE_ADS:(id:string)=>`/admin/ads/${id}`,
    UPDATE_ADS:(id:string)=>`/admin/ads/${id}`,
    GET_ADS_DETAILS:(id:string)=>`/admin/ads/${id}`,
}
export const USER_URLS = {
    GET_ALL_USERS: `/admin/users`,
    GET_ALL_ADS:`/portal/ads`
   
}

export const ROOM_FACILITIES_URLS={
    GET_ALL_FACILITIES:`/admin/room-facilities`,
    ADD_NEW_FACILITY: `/admin/room-facilities`,
    UPDATE_FACILITY: (id:string)=> `/admin/room-facilities/${id}`,
    DELETE_FACILITY:(id:string)=> `/admin/room-facilities/${id}`,
    GET_DETAILS_FACILITY:(id:string)=> `/admin/room-facilities/${id}`
}

export const FAV_URLS = {
    ADD_FAVOURITE_ROOM:`/portal/favorite-rooms`,
    GET_FAVOURITE_ROOMS:`/portal/favorite-rooms`,
    DELETE_FAVOURITE_ROOM:`/portal/favorite-rooms`
}

export const  publicAxios = axios.create({
    baseURL: "https://upskilling-egypt.com:3000/api/v0",
  });

