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
 * ⚙️ github-automated-repos ( ) + [ React Query ]
 * - Control, choose and get data from your GitHub repositories.
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 * // Usage Example + [ React Query ]
   const { data, isLoading } = useGitHubAutomatedRepos('digoarthur', 'attached', {
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
 * import { useGitHubAutomatedRepos, StackIcons, StackLabels } from "github-automated-repos/react-query";
 * ...
 *
 * const { data, isLoading } = useGitHubAutomatedRepos('digoarthur', 'attached', {
 *   refetchInterval: 300000, // 5 minutes
 *   refetchOnWindowFocus: false,
 *  staleTime: 10 * 60 * 1000, // 10 minutes
 * });
 *
 * if (isLoading) return <p>Loading...</p>;
 * 
 * return (
 *   <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '1rem' }}>
 *     <img style={{ width: '60rem' }} src="https://github.com/user-attachments/assets/f0fbbf5a-fb96-49ec-8be4-c7b9e7b0b17b" alt="Header"/>
 *     
 *     {data?.map((repo) => (
 *       <section key={repo.name} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
 *         <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>{repo.name}</h2>
 *         
 *         <div style={{ display: 'flex', justifyContent: 'center' }}>
 *           {repo.banner.map((url) => <img key={url} src={url} style={{ maxWidth: '250px', borderRadius: '4px', margin: '0 2px' }} alt="Banner"/>)}
 *         </div>
 *         
 *         <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
 *           {repo.topics.map((topic) => (
 *             <span key={topic} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *               <StackIcons itemTopics={topic}/><StackLabels itemTopics={topic}/>
 *             </span>
 *           ))}
 *         </div>
 *         
 *         <p style={{ maxWidth: '700px', margin: '1rem auto', color: '#555' }}>{repo.description}</p>
 *         
 *         <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
 *           <a href={repo.homepage} target="_blank" style={{ color: '#646cff', textDecoration: 'none' }}>🔗 Homepage</a>
 *           <a href={repo.html_url} target="_blank" style={{ color: '#646cff', textDecoration: 'none' }}>🔗 Repository</a>
 *         </div>
 *       </section>
 *     ))}
 *     
 *     <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eaeaea', fontSize: '0.9rem', color: '#555', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
 *       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
 *         <div style={{ display: 'flex', alignItems: 'center' }}>
 *           <strong> Love github-automated-repos? Give our repo a star 🌟➡️ : </strong>
 *           <a href="https://github.com/DIGOARTHUR/github-automated-repos" target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold', marginLeft: '0.3rem' }}>github-automated-repos</a>
 *         </div>
 *         <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
 *           <em>Created by:</em>
 *           <a href="https://www.linkedin.com/in/digoarthur/" target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'none' }}>@digoarthur</a>
 *           <a href="https://youtu.be/dQw4w9WgXcQ?si=VBzREBlncKuPTYBs" style={{ display: 'inline-flex' }}><img src="https://github.com/user-attachments/assets/f45f0115-761e-4207-a9d9-dddacfb5b96b" alt="Brazil Flag" width="20" style={{ verticalAlign: 'middle' }}/></a>
 *         </div>
 *       </div>
 *       <div style={{ color: '#888', fontSize: '0.8rem' }}>
 *         <em>Powered by </em>
 *         <a href="https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository" target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'none' }}>GitHub API</a>
 *       </div>
 *     </footer>
 *   </div>
 * );
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
