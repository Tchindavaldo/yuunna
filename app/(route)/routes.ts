const Routes = {
  auth: {
    login: 'auth/login',
  },
  tabs: {
    home: {
      index: '(route)/(tabs)/home/index',
      detail: '(route)/(tabsChild)/home/detail',
    },

    categories: {
      index: '(route)/(tabs)/categories/index',
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

  other: {
    notFound: 'other/+not-found',
  },
};

export default Routes;
