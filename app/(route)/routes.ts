const Routes = {
  auth: {
    login: 'auth/login',
  },
  tabs: {
    home: {
      index: '(route)/(tabs)/home/index',
      detail: '(route)/(tabsChild)/home/detail',
    },

    suivie: {
      index: '(route)/(tabs)/suivie/index',
    },

    cart: {
      index: '(route)/(tabs)/cart/index',
    },

    notification: {
      index: '(route)/(tabs)/notification/index',
    },

    account: {
      index: '(route)/(tabs)/account/index',
    },
  },

  payment: {
    index: 'payment/index',
  },

  other: {
    notFound: 'other/+not-found',
  },
};

export default Routes;
