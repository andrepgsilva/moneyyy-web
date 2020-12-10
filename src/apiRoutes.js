const baseUrl = 'http://moneyyy.test/api';

const apiRoutes = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refreshToken: '/auth/refresh-token/',
  },

  bills: {
    index: '/bills/',
    show: '/bills/',
  }
}

export default apiRoutes;