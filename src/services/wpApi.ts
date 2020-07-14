import WPAPI from 'wpapi';

export type wpClientCredentials = {
  endpoint: string,
  username: string,
  password: string
}

export const wpClient = (credentials: wpClientCredentials): WPAPI => new WPAPI(credentials);
