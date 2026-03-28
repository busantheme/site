import { fail, redirect } from '@sveltejs/kit';

const ADMIN_PASSWORD = 'Won1105!!';

export function load({ cookies }) {
    const session = cookies.get('admin_session');
    if (session === 'authenticated') {
        return { loggedIn: true };
    }
    return { loggedIn: false };
}

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const password = formData.get('password');

        if (password === ADMIN_PASSWORD) {
            cookies.set('admin_session', 'authenticated', { 
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24
            });
            return { success: true };
        }

        return fail(400, { error: 'Invalid password' });
    },

    logout: async ({ cookies }) => {
        cookies.delete('admin_session', { path: '/' });
        throw redirect(302, '/admin');
    }
};
