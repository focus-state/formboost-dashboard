import '@tanstack/vue-query';
import type { AxiosError } from 'axios';

interface ApiError {
  statusCode: number;
  detail: string;
}

declare module '@tanstack/vue-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
