const BASE_URL = process.env.REACT_APP_BASE_URL


export const LOGIN_API = BASE_URL+"/auth/login";
export const SIGNUP_API = BASE_URL+"/auth/signup";
export const UPDATE_ADDRESS = BASE_URL+"/profile/update-user-address"
export const UPDATE_PROFILE = BASE_URL+"/profile/update-user-detail"
export const LOGOUT = BASE_URL+"/auth/logout"
export const UPDATE_IMAGE = BASE_URL+"/profile/updateImage";
export const REGISTER_EQUIPMENT = BASE_URL+"/equ/registerEquipment";
export const GET_ALL_LIST = BASE_URL+"/auth/getList"
export const GET_USER_PRODUCT = BASE_URL+"/user-equipment";
export const DELETE_EQUIPMENT_API = BASE_URL +"/equ/delete-equipment"