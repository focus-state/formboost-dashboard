export default defineNuxtRouteMiddleware((to, _from) => {
  const { loggedIn } = storeToRefs(useAuthStore());

  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});
