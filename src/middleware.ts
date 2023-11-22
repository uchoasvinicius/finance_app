import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookie = cookies().get('token')?.value;
  const redirectToLogin = () => {
    if (request.nextUrl.pathname === '/login') return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  };

  if (!cookie) return redirectToLogin();

  return NextResponse.next({});
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)']
};
