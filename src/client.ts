import axios, { AxiosInstance } from 'axios';
import { Movies, Shows } from './media';
// api methods
import { Users } from './users';

const version = '';

/**
 * Settings provided to Trakt Class
 */
export interface TraktSettings {
  /**
   * Trakt app's client id
   */
  cliendId: string;

  /**
   * Trakt app's client secret
   */
  clientSecret?: string;

  /**
   * Redirect url for oauth
   * @default "urn:ietf:wg:oauth:2.0:oob"
   */
  redirectUri?: string;

  /**
   * Trakt api url
   * @default "https://api.trakt.tv"
   */
  apiUrl?: string;

  /**
   * User Agent sent in request headers
   * @default "better-trakt / <pkg version> (+https://github.com/getaugur/better-trakt/)"
   */
  userAgent?: string;
}

/**
 * Internal settings object used by sdk
 * @internal
 */
export interface TraktClassSettings extends TraktSettings {
  redirectUri: string;
  apiUrl: string;
  userAgent: string;
}

/**
 * Class interface for api namespaces
 * @internal
 */
export interface ApiNamespace {
  client: AxiosInstance;
}

/**
 * Trakt.tv SDK
 * @example
 * SDK with basic config
 * ```ts
 * import { Trakt } from "better-trakt";
 *
 * const client = new Trakt({
 *  cliendId: "client id",
 *  clientSecret: "client secret",
 * });
 * ```
 */
export class Trakt {
  /**
   * settings for sdk
   * @internal
   */
  readonly settings: TraktClassSettings;

  /**
   * axios client
   */
  private client: AxiosInstance;

  /**
   * User's api
   */
  readonly users: Users;

  /**
   * Shows api
   */
  readonly shows: Shows;

  /**
   * Movies api
   */
  readonly movies: Movies;

  constructor(settings: TraktSettings) {
    // apply settings
    this.settings = {
      cliendId: settings.cliendId,
      clientSecret: settings.clientSecret,
      redirectUri: settings.redirectUri || 'urn:ietf:wg:oauth:2.0:oob',
      apiUrl: settings.apiUrl || 'https://api.trakt.tv',
      userAgent: settings.userAgent || `better-trakt / ${version}  (+https://github.com/getaugur/better-trakt/)`,
    };

    // make base client
    this.client = axios.create({
      headers: {
        'Content-type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': this.settings.cliendId,
        'User-Agent': this.settings.userAgent,
      },
    });

    this.users = new Users(this.client);
    this.movies = new Movies(this.client);
    this.shows = new Shows(this.client);
  }
}
