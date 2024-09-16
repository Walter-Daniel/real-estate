//Rutas accesibles al público
//No requieren autenticación
export const publicRoutes = [
    "/",
    "/rent",
    "/find"
]

//Array de rutas usadas para la autenticación
//Se utilizaran para redireccionar a los usarios cuando ingresen a 
// "create-ad"
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

//Prefijo para la ruta de autenticación API
export const apiAuthPrefix = "/api/auth";

//Rutas no accesibles al público
//Requieren autenticación
export const privateRoutes = [
    "/profile",
    "/create-ad",
]
 
//Ruta por deferecto para la redirección después de iniciar sesión.
export const DEFAULT_LOGIN_REDIRECT = "/profile";