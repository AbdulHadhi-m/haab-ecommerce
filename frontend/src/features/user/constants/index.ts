export const USER_KEYS = {
  ALL: ["user"] as const,
  PROFILE: () => [...USER_KEYS.ALL, "profile"] as const,
  ADDRESSES: () => [...USER_KEYS.ALL, "addresses"] as const,
};
