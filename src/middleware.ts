import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://localhost:5000/user/my-details';

// Protected routes 
const protectedRoutes: { [key: string]: string[] } = {
  '/ginner/dashboard': ['Ginner'],
  '/spinner/dashboard': ['Spinner'],
  '/dashboard': ['Admin', 'Superadmin']
};

export async function middleware(req: NextRequest) {
  // Retrieve the access token from cookies
  const token = req.cookies.get('accessToken');
  console.log('Token:', token); 

  // No token is found, redirect to the home page
  if (!token) {
    console.log('No token found, redirecting to home');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Fetch user details from API using access token
  let userDetails;
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log(`User details fetch failed with status ${res.status}: ${errorText}`);
      return NextResponse.redirect(new URL('/', req.url));
    }

    userDetails = await res.json();
    console.log('User details:', userDetails); 
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }

  // User details fetch was successful
  if (!userDetails?.success) {
    console.log('User details fetch was not successful, redirecting to home');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Extract user's role from API 
  const role = userDetails.data.role.user_role;
  console.log('User role:', role); 
  const { pathname } = req.nextUrl;

  // Check if the requested path matches any of the protected routes
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      // Get the allowed roles for the matched route
      const allowedRoles = protectedRoutes[route];

      // User's role is not allowed, redirect to the home page
      if (!allowedRoles.includes(role)) {
        console.log(`Role ${role} not allowed for route ${route}, redirecting to home`);
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  // User's role is allowed, proceed with the request
  console.log('User role allowed, proceeding with request');
  return NextResponse.next();
}

export const config = {
  matcher: ['/ginner/dashboard', '/spinner/dashboard', '/dashboard']
};
