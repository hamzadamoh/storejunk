import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isDashboard = pathname.startsWith('/dashboard');
    const isLogin = pathname === '/dashboard/login';

    const sessionCookie = req.cookies.get('dashboard_session');

    // Protect all dashboard routes
    if (isDashboard && !isLogin && !sessionCookie) {
        return NextResponse.redirect(new URL('/dashboard/login', req.url));
    }

    // Redirect to dashboard if logged in and trying to access login
    if (isLogin && sessionCookie) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
