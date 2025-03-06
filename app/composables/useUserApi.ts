export const useUserApi = () => {
  const { UserService } = useApi();
  const { setUser } = useUserStore();

  const getUser = async () => {
    const user = await UserService.apiV1UsersMeProfile();

    setUser(user.data);

    return user;
  };

  return { getUser };
};
