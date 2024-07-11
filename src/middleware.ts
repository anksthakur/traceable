// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: any) {
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//   // If user is not authenticated and is trying to access a path other than "/", redirect to "/"
//   if (!token && request.nextUrl.pathname !== "/") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // / hai to he chle by
//   return NextResponse.next();
// }

// export const config = {
//   matcher: '/((?!_next|favicon.ico).*)', // Apply middleware to all paths except _next and favicon.ico
// };
