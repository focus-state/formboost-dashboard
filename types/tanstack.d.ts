import '@tanstack/vue-query';
import type { AxiosError } from 'axios';

interface ApiError {
  status_code: number;
  detail: string;
}

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
