

// const BASE = "http://localhost:3002/api";
const BASE = "https://snaap-crm.vercel.app/api";

export const LOGIN = `${BASE}/auth/v1/signin`
export const ISAUTH = `${BASE}/auth/v1/isauth`
export const BLOG = `${BASE}/admin/add-blog`
export const GETBLOG = `${BASE}/admin/get-blogs`
export const UPDATEBLOG = `${BASE}/admin/update-blog`
export const ADDDOC = `${BASE}/doc/reg-user`
export const GETUSER = `${BASE}/doc/get-user`
export const UPLOADDOC = `${BASE}/doc/add-doc`
export const DELETEDOC = `${BASE}/doc/remove-doc`
