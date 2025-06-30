import { cancelIcon, logOutIcon, orderIcon, reviewIcon, accountIcon, HomeIcon, AboutIcon, ContactIcon, SignUpIcon } from './icon';

export * from './icon'
export const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
        icon: HomeIcon
    },
    {
        label: 'About',
        href: '/about',
        icon: AboutIcon 
    },
    {
        label: 'Contact',
        href: '/contact',
        icon: ContactIcon
    },
    {
        label: 'Sign Up',
        href: '/signup',
        icon: SignUpIcon
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
