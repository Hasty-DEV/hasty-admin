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
};
