export const ROUTES = {
  home: {
    call: () => '/',
  },
  coupons: {
    create: {
      call: () => '/coupons/create',
    },
    listAll: {
      call: () => '/coupons/list-all',
    },
    details: {
      path: '/coupons/details/:id',
      call: (id: string) => `/coupons/details/${id}`,
    },
  },
};
