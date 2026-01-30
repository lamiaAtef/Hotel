
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
export const USER_URLS = {
   
}

