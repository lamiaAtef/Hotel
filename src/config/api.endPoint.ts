
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
}
export const USER_URLS = {
   
}

export const ROOM_FACILITIES_URLS={
    GET_ALL_FACILITIES:`/admin/room-facilities`,
    ADD_NEW_FACILITY: `/admin/room-facilities`,
    UPDATE_FACILITY: (id:string)=> `/admin/room-facilities/${id}`,
    DELETE_FACILITY:(id:string)=> `/admin/room-facilities/${id}`,
    GET_DETAILS_FACILITY:(id:string)=> `/admin/room-facilities/${id}`
}

