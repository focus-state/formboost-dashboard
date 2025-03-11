import type { AxiosError, AxiosResponse } from 'axios';

import * as sdk from '~/client/sdk.gen';
import { client } from '~/client/client.gen';

export const useApi = () => {
  const { public: { baseUrl } } = useRuntimeConfig();

  /**
   * Client configuration
   */
  client.setConfig({ baseURL: baseUrl, throwOnError: true, withCredentials: true });

  /**
   * Response interceptors
   */
  const successResponseInterceptor = (response: AxiosResponse) => response;

  const errorResponseInterceptor = async (error: AxiosError) => {
    const code = error?.response?.status || 500;

    if ([401, 403].includes(code)) {
      const { resetProtectedStores } = useMainStore();

      resetProtectedStores();
    }

    return Promise.reject(error);
  };

  client.instance.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor);

  return sdk;
};
