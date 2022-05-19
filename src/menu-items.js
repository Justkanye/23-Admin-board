const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home'
                },
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    url: '/charts',
                    icon: 'feather icon-pie-chart'
                },
                {
                    id: 'team',
                    title: 'Team',
                    type: 'item',
                    url: '/teams',
                    icon: 'fa fa-handshake'
                },
                {
                    id: 'clients',
                    title: 'Clients',
                    type: 'item',
                    url: '/clients',
                    icon: 'fa fa-users'
                },
                {
                    id: 'products',
                    title: 'Products',
                    type: 'item',
                    url: '/products',
                    icon: 'feather icon-package'
                },
                {
                    id: 'logout',
                    title: 'Logout',
                    type: 'item',
                    url: '/logout',
                    icon: 'feather icon-log-out',
                    isLogout: true
                }
            ]
        }
    ]
};

export default menuItems;
