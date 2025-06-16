import { cancelIcon, logOutIcon, orderIcon, reviewIcon, accountIcon } from './icon';

export * from './icon'
export const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
    {
        label: 'Sign Up',
        href: '/signup',
    }
];

export const USER_DROPDOWN_ITEMS = [
    {
        label: 'Manage my account',
        href: '/account',
        icon: accountIcon
    },
    {
        label: 'My orders',
        href: '/my-orders',
        icon: orderIcon
    },
    {
        label: 'My cancellations',
        href: '/my-cancellations',
        icon: cancelIcon
    },
    {
        label: "My reviews",
        href: '/my-reviews',
        icon: reviewIcon
    },
    {
        label: 'Logout',
        href: '/logout',
        icon: logOutIcon
    }
]