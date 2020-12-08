import router from './router';
import vuexStore from './store/index';

router.beforeEach((to, from, next) => {
  if (to.name == 'Register' && vuexStore.getters['authentication/isAuthenticated']) next({ name: 'Home' });

  if (to.name !== 'Login' && to.name !== 'Register' && ! vuexStore.getters['authentication/isAuthenticated']) next({ name: 'Login' });

  if (to.name == 'Login' && vuexStore.getters['authentication/isAuthenticated']) next({ name: 'Home' });

  else next()
});

export default router;