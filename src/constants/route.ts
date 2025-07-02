import { CancelIcon, LogOutIcon, OrderIcon, ReviewIcon, AccountIcon, HomeIcon, AboutIcon, ContactIcon, SignUpIcon } from './icon';

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
        icon: AccountIcon
    },
    {
        label: 'My orders',
        href: '/my-orders',
        icon: OrderIcon
    },
    {
        label: 'My cancellations',
        href: '/my-cancellations',
        icon: CancelIcon
    },
    {
        label: "My reviews",
        href: '/my-reviews',
        icon: ReviewIcon
    },
    {
        label: 'Logout',
        href: '/logout',
        icon: LogOutIcon
    }
]
