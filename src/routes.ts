//Rutas accesibles al público
//No requieren autenticación
export const publicRoutes = [
    "/",
    "/rent",
    "/find",
    "/auth/new-verification"
    
]

//Array de rutas usadas para la autenticación
//Se utilizaran para redireccionar a los usarios cuando ingresen a 
// "create-ad"
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

//Prefijo para la ruta de autenticación API
export const apiAuthPrefix = "/api/auth";

//Rutas no accesibles al público
//Requieren autenticación
export const privateRoutes = [
    "/profile",
    "/houses/create",
    "/houses/[id]/address",
    "/houses/[id]",
    "/favorites"
]
 
//Ruta por deferecto para la redirección después de iniciar sesión.
export const DEFAULT_LOGIN_REDIRECT = "/profile";