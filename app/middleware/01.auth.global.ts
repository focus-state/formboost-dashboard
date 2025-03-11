import { useMutation } from '@tanstack/vue-query';

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (import.meta.server) {
    return;
  }

  const { testToken: testTokenFunc } = useAuthApi();

  const { mutateAsync: testToken } = useMutation({
    mutationFn: () => testTokenFunc(),
  });

  await testToken();
});
