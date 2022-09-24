import { ApiNamespace, ApiConfig } from '../client';
import {
  getMediaSummary_Full,
  getMediaPeople,
  getTrendingMedia,
  getPopularMedia,
  getRecommendedMedia,
  getPlayedMedia,
  getWatchedMedia,
  getCollectedMedia,
  getAnticipatedMedia,
  getBoxOfficeMedia,
  getUpdatesMedia,
} from '../media';
import {
  ShowSummary_Full,
  ShowPeople,
  TrendingShow,
  TraktApiContent,
  RecommendedPeriod,
  RecommendedShow,
  Played_Watched_CollectedShow,
  AnticipatedShow,
  BoxOfficeShow,
  UpdatedStartDate,
  UpdatesShow,
} from '../trakt';
import { ApiResponse, checkRequiredArg, Pagination, Filters } from '../utils';

/**
 * Shows api namespace
 */
export class Shows implements ApiNamespace {
  config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = {
      apiUrl: `${config.apiUrl}/shows`,
      client: config.client,
    };
  }

  /**
   * Returns a single shows's details.
   * @param showId show id
   * @returns
   */
  summary({ showId }: { showId: string }): Promise<ApiResponse<ShowSummary_Full>> {
    checkRequiredArg(showId, 'showId', 'string');

    return getMediaSummary_Full<ShowSummary_Full>(this.config, showId);
  }

  /**
   * Returns all cast and crew for a show.
   * @param showId show id
   * @returns
   */
  people({ showId }: { showId: string }): Promise<ApiResponse<ShowPeople>> {
    checkRequiredArg(showId, 'showId', 'string');

    return getMediaPeople<ShowPeople>(this.config, showId);
  }

  /**
   * Returns all shows being watched right now.
   * @param pagination
   * @returns
   */
  trending({
    pagination,
    filters,
  }: {
    pagination: Pagination;
    filters?: Filters;
  }): Promise<ApiResponse<TrendingShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getTrendingMedia<TrendingShow[]>(this.config, 'shows', { pagination, filters });
  }

  /**
   * Returns the most popular shows.
   * @param pagination
   * @returns
   */
  popular({
    pagination,
    filters,
  }: {
    pagination: Pagination;
    filters?: Filters;
  }): Promise<ApiResponse<TraktApiContent[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getPopularMedia(this.config, 'shows', { pagination, filters });
  }

  /**
   * Returns the most recommended shows in the specified time period, defaulting to weekly. All stats are relative to the specific time period.
   * @param param0
   * @returns
   */
  recommended({
    pagination,
    filters,
    period,
  }: {
    pagination: Pagination;
    filters?: Filters;
    period?: RecommendedPeriod;
  }): Promise<ApiResponse<RecommendedShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getRecommendedMedia<RecommendedShow[]>(this.config, 'shows', { pagination, filters, period });
  }

  /**
   * Returns the most played (a single user can watch multiple episodes multiple times) shows in the specified time period, defaulting to weekly. All stats are relative to the specific time period.
   * @param param0
   * @returns
   */
  played({
    pagination,
    filters,
    period,
  }: {
    pagination: Pagination;
    filters?: Filters;
    period?: RecommendedPeriod;
  }): Promise<ApiResponse<Played_Watched_CollectedShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getPlayedMedia<Played_Watched_CollectedShow[]>(this.config, 'shows', { pagination, filters, period });
  }

  /**
   * Returns the most watched (unique users) shows in the specified time period, defaulting to weekly. All stats are relative to the specific time period.
   * @param param0
   * @returns
   */
  watched({
    pagination,
    filters,
    period,
  }: {
    pagination: Pagination;
    filters?: Filters;
    period?: RecommendedPeriod;
  }): Promise<ApiResponse<Played_Watched_CollectedShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getWatchedMedia<Played_Watched_CollectedShow[]>(this.config, 'shows', { pagination, filters, period });
  }

  /**
   * Returns the most watched (unique users) shows in the specified time period, defaulting to weekly. All stats are relative to the specific time period.
   * @param param0
   * @returns
   */
  collected({
    pagination,
    filters,
    period,
  }: {
    pagination: Pagination;
    filters?: Filters;
    period?: RecommendedPeriod;
  }): Promise<ApiResponse<Played_Watched_CollectedShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getCollectedMedia<Played_Watched_CollectedShow[]>(this.config, 'shows', { pagination, filters, period });
  }

  /**
   * Returns the most anticipated shows based on the number of lists a show appears on.
   * @param param0
   * @returns
   */
  anticipated({
    pagination,
    filters,
  }: {
    pagination: Pagination;
    filters?: Filters;
  }): Promise<ApiResponse<AnticipatedShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getAnticipatedMedia<AnticipatedShow[]>(this.config, 'shows', { pagination, filters });
  }

  /**
   * Returns the top 10 grossing shows in the U.S. box office last weekend. Updated every Monday morning.
   * @returns
   */
  boxOffice(): Promise<ApiResponse<BoxOfficeShow[]>> {
    return getBoxOfficeMedia<BoxOfficeShow[]>(this.config, 'shows');
  }

  /**
   * Returns all shows updated since the specified UTC date and time.
   * We recommended storing the X-Start-Date header you can be efficient using this method moving forward.
   * By default, 10 results are returned. You can send a limit to get up to 100 results per page.
   *
   * **Important!**
   * The start_date is only accurate to the hour, for caching purposes.
   * Please drop the minutes and seconds from your timestamp to help optimize our cached data.
   * For example, use 2021-07-17T12:00:00Z and not 2021-07-17T12:23:34Z.
   *
   * Note: The start_date can only be a maximum of 30 days in the past.
   * @param param0
   * @returns
   */
  updates({
    pagination,
    startDate,
  }: {
    pagination: Pagination;
    startDate?: UpdatedStartDate;
  }): Promise<ApiResponse<UpdatesShow[]>> {
    checkRequiredArg(pagination, 'pagination', 'object');

    return getUpdatesMedia<UpdatesShow[]>(this.config, 'shows', { pagination, startDate });
  }
}
