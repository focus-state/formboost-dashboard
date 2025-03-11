import type { ApiV1AccessLoginLoginData } from '~/client';

export const useAuthApi = () => {
  const { AccessService } = useApi();
  const { getUser } = useUserApi();
  const { setLoggedIn } = useAuthStore();

  // TODO: try implementing https://github.com/Atinux/nuxt-auth-utils
  const logIn = async (body: ApiV1AccessLoginLoginData['body']) => {
    try {
      await AccessService.apiV1AccessLoginLogin({ body });

      await getUser();

      setLoggedIn(true);
    } catch (error) {
      return error;
    }
  };

  const logOut = async () => {
    try {
      await AccessService.apiV1AccessLogoutLogout();

      setLoggedIn(false);
    } catch (error) {
      return error;
    }
  };

  const testToken = async () => {
    try {
      await AccessService.apiV1AccessTestTokenTestToken();

      setLoggedIn(true);
    } catch {
      // swallow error, clearing the store (including auth) is handled by
      // interceptor
    }
  };

  return {
    logIn,
    logOut,
    testToken,
  };
};
