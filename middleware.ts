import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	const token = req.cookies.get('JIM_ACCESS_TOKEN');

	if (!token) {
		const url = req.nextUrl.clone();
		url.pathname = '/signin';
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ['/', '/playlist', '/library'],
};

