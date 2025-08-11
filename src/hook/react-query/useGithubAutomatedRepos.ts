import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { _handleRepository } from '../utils/_handleRepository';

export interface IGithubRepos {
  name: string;
  topics: string[];
  html_url: string;
  description: string;
  id: number;
  homepage: string;
  banner: string[];
}

/**
 * Custom React Query hook to fetch GitHub repositories filtered by a deployment keyword.
 * Automatically handles caching, refetching and error states.
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @param {string} userNameGitHub - Your GitHub username (e.g., 'digoarthur') in  https://github.com/USERNAME.
 * @param {string} keyWord - Keyword to identify deployed repositories (e.g., 'portfolio', 'attached'). PATH: repository > ⚙️ > Topics > insert your keyWord.
 *                                 The hook will filter repositories that contain this keyword in the Topics field. 
 * @returns {IGithubRepos[]} data - Array of filtered GitHub repositories.
 * @returns {boolean} isLoading - True while the initial load is in progress.
 * @returns {boolean} isError - True if the query encountered an error.
 * @param {Object} [options] - Optional React Query configuration options.
 * @param {number} [options.refetchInterval] - Auto-refetch interval in milliseconds (e.g., 60000 for 1 minute).
 *                                            Set to `false` to disable auto-refetch.
 * @param {boolean} [options.refetchOnWindowFocus] - Whether to refetch when window regains focus. Default: true.
 * @param {boolean} [options.enabled] - Whether the query should execute immediately. Set to false for manual triggering.
 * @param {Function} [options.onSuccess] - Callback function executed after successful query.
 *                                        Receives the data as parameter: `(data: IGithubRepos[]) => void`.
 * @param {Function} [options.onError] - Callback function executed when query fails.
 *                                      Receives the error as parameter: `(error: Error) => void`.
 * @param {number} [options.staleTime] - Time in milliseconds before data becomes stale (default: 0).
 * @param {number} [options.cacheTime] - Time in milliseconds to keep unused data in cache (default: 5 minutes).
 * @param {number|boolean|Function} [options.retry] - How many times to retry failed queries (default: 3).
 * @param {number} [options.retryDelay] - Delay in milliseconds between retries (default: 1000).
 * 
 * @returns {UseQueryResult<IGithubRepos[], Error>} - React Query result object containing:
 * @returns {Error} error - Error object if query failed.
 * @returns {Function} refetch - Function to manually trigger refetch.
 * 
 * 
 * @example
 * // github-automated-repos with React-Query
   const { data, isLoading, error } = useGitHubAutomatedRepos('digoarthur', 'attached', {
    refetchInterval: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  console.log(data)

  
 * @see {@link ℹ️ https://tanstack.com/query/latest/docs/react/reference/useQuery} for full React Query documentation.
 */


export function useGitHubAutomatedRepos(
  userNameGitHub: string,
  keyWord: string,
  options?: Omit<UseQueryOptions<IGithubRepos[], Error, IGithubRepos[], [string, string, string]>, 'queryKey' | 'queryFn'>
): UseQueryResult<IGithubRepos[], Error> {
  return useQuery<IGithubRepos[], Error, IGithubRepos[], [string, string, string]>({
    queryKey: ['githubRepos', userNameGitHub, keyWord],
    queryFn: () => _handleRepository(userNameGitHub, keyWord),
    ...options,
  });
}