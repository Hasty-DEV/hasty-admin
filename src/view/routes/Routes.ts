export const ROUTES = {
  home: {
    path: '/',
    call: () => '/',
  },
  coupons: {
    create: {
      path: '/coupons/create',
      call: () => '/coupons/create',
    },
    listAll: {
      path: '/coupons/list-all',
      call: () => '/coupons/list-all',
    },
    details: {
      path: '/coupons/details/:id',
      call: (id: string) => `/coupons/details/${id}`,
    },
  },
  newsletter: {
    listAll: {
      path: '/newsletter/list-all',
      call: () => '/newsletter/list-all',
    },
  },
  faq: {
    create: {
      path: '/faq/create',
      call: () => '/faq/create',
    },
    listAll: {
      path: '/faq/list-all',
      call: () => '/faq/list-all',
    },
    viewFAQ: {
      path: '/faq/view',
      call: () => '/faq/view',
    },
  },
  report: {
    call: () => '/report',
    path: '/report',
  },
};
