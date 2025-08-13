import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { _handleRepository } from '../utils/_handleRepository';

export interface IGitHubRepos {
  name: string;
  topics: string[];
  html_url: string;
  description: string;
  id: number;
  homepage: string;
  banner: string[];
}

/**
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 * // With React-Query - Usage Example github-automated-repos HOOK
   const { data, isLoading, error } = useGitHubAutomatedRepos('digoarthur', 'attached', {
    refetchInterval: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  console.log(data) 

 * @param {string} GitHubUsername - Your GitHub username (e.g., 'digoarthur') in  https://github.com/USERNAME.
 * @param {string} keyWord - It is chosen by you. KeyWord used to identify and filter repositories (e.g., 'portfolio', 'attached'). 
 *                                 Set this KeyWord in GitHub at:
 *                                 Repository → About - '⚙️' → Topics → add your KeyWord.
 *                                 Only repositories containing this KeyWord in their Topics will be returned.
 * @returns {Object} Hook state object containing:
 * 
 * @type {Object} IGitHubRepos
 * @property {string} name - Repository name.
 * @property {string[]} topics - Topics assigned to the repository.
 * @property {string} html_url - Repository URL.
 * @property {string} description - Short description of the repository.
 * @property {number} id - Unique repository ID.
 * @property {string} homepage - Homepage or deployed site URL.
 * @property {string[]} banner - Banner image URLs.
 * 
 * @returns {IGitHubRepos[]} data - Array of filtered GitHub repositories.
 * @returns {boolean} isLoading - True while the initial load is in progress.
 * @returns {boolean} isError - True if the query encountered an error.
 * @param {Object} [options] - Optional React Query configuration options.
 * @param {number} [options.refetchInterval] - Auto-refetch interval in milliseconds (e.g., 60000 for 1 minute).
 *                                            Set to `false` to disable auto-refetch.
 * @param {boolean} [options.refetchOnWindowFocus] - Whether to refetch when window regains focus. Default: true.
 * @param {boolean} [options.enabled] - Whether the query should execute immediately. Set to false for manual triggering.
 * @param {Function} [options.onSuccess] - Callback function executed after successful query.
 *                                        Receives the data as parameter: `(data: IGitHubRepos[]) => void`.
 * @param {Function} [options.onError] - Callback function executed when query fails.
 *                                      Receives the error as parameter: `(error: Error) => void`.
 * @param {number} [options.staleTime] - Time in milliseconds before data becomes stale (default: 0).
 * @param {number} [options.cacheTime] - Time in milliseconds to keep unused data in cache (default: 5 minutes).
 * @param {number|boolean|Function} [options.retry] - How many times to retry failed queries (default: 3).
 * @param {number} [options.retryDelay] - Delay in milliseconds between retries (default: 1000).
 * 
 * @returns {UseQueryResult<IGitHubRepos[], Error>} - React Query result object containing:
 * @returns {Error} error - Error object if query failed.
 * @returns {Function} refetch - Function to manually trigger refetch.
 * 
 * 
 * @see {@link ℹ️ https://tanstack.com/query/latest/docs/react/reference/useQuery} for full React Query documentation.
 * 
 * @example
 * // Usage Example
 * 
  import { useGitHubAutomatedRepos, StackIcons, StackLabels } from "github-automated-repos/react-query";
  if (isLoading) return <p>Loading...</p>;
  console.log(data)
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '1rem' }}>
      {data?.map((repo, index) => (
        <section key={index}
          style={{marginBottom: '2rem',
            padding: '1rem',
          }}
        >
         
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {repo.name}
          </h2>

        
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {repo.banner.map((banner_url, index) => (
              <img
                key={index}
                src={banner_url}
                style={{ maxWidth: '250px', borderRadius: '4px', margin: '0 2px' }}
              />
            ))}
          </div>

       
          <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
            {repo.topics.map((t, j) => (
              <span key={j} style={{ marginRight: '8px' }}>
                <StackIcons itemTopics={t} /> <StackLabels itemTopics={t} />
              </span>
            ))}
          </div>

      
          <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#555' }}>
            {repo.description}
          </p>

        
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href={repo.homepage} style={{ color: '#646cff', textDecoration: 'none' }}>
              🔗 Homepage
            </a>
            <a href={repo.html_url} style={{ color: '#646cff', textDecoration: 'none' }}>
              🔗 Repository
            </a>
          </div>
        </section>
      ))}
    </div>
  );
 * 
 */


export function useGitHubAutomatedRepos(
  GitHubUsername: string,
  keyWord: string,
  options?: Omit<UseQueryOptions<IGitHubRepos[], Error, IGitHubRepos[], [string, string, string]>, 'queryKey' | 'queryFn'>
): UseQueryResult<IGitHubRepos[], Error> {
  return useQuery<IGitHubRepos[], Error, IGitHubRepos[], [string, string, string]>({
    queryKey: ['githubRepos', GitHubUsername, keyWord],
    queryFn: () => _handleRepository(GitHubUsername, keyWord),
    ...options,
  });
}