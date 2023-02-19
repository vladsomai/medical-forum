import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

    const users = [1, 2, 3, 4]

    if (users) {
        return { users: users };
    }

    throw error(404, 'Not found');
}) satisfies PageServerLoad;