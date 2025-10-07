import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { handleRepository } from '../../utils/handleRepository';

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
 * ⚙️ github-automated-repos ( ) hook + [ React Query ]
 * - Control, choose and get data from your GitHub repositories in your `Portolio`.
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} ⬅ for more info github-automated-repos documentation.
 * @example
 * // Usage Example + [ React Query ]
   const { data, isLoading } = useGitHubAutomatedRepos('digoarthur', 'attached', {
    refetchInterval: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  console.log(data)
 *
 * @section 🪝 **Hook Params**
 * @param {string} gitHubUsername - Your GitHub username (e.g., 'digoarthur') in  https://github.com/USERNAME.
 * @param {string} keyWord - It is chosen by you. KeyWord used to identify and filter repositories (e.g., 'portfolio', 'attached'). 
 *                                 ⚠️ Set this KeyWord in GitHub at:
 *                                 Repository → About '⚙️' → Topics → add your KeyWord.
 *                                 Only repositories containing this KeyWord in their Topics will be returned.
 * @returns {object} Hook state object containing:
 * @type {object} IGitHubRepos
 * @property {string[]} banner - ⚠️ Array of banner image URLs found in the public folder.
 *   The name of the image file must contain banner in the name. Insert your images inside project in the following path: e.g:
 *   
 *   File structure requirement: /public → bannerXYZ.png - bannerABC.svg - bannerJKL.jpg
 *
 * @property {string} name - Repository name.
 * @property {string[]} topics - Topics assigned to the repository.
 * @property {string} html_url - Repository UR.
 * @property {string} description - Short description of the repository.
 * @property {number} id - Unique repository ID.
 * @property {string} homepage - Homepage or deployed site URL.
 * @returns {IGitHubRepos[]} data - Array of filtered GitHub repositories.
 * @returns {boolean} isLoading - True while the initial load is in progress.
 * @returns {boolean} isError - True if the query encountered an error.
 * 
 * @section ⚛️ **React Query Params (data refresh control)**
 * @param {object} [options] - Optional React Query configuration options.
 * @param {number|false} [options.refetchInterval=60000] - Auto-refetch interval in milliseconds.  
 *                                                         Use `false` to disable automatic refetching.
 * @param {number} [options.staleTime=600000] - Time in milliseconds before cached data becomes stale.  
 *                                              During this time, React Query will not refetch automatically.
 * @param {boolean} [options.refetchOnWindowFocus=true] - Whether to refetch when the window regains focus.  
 * @param {boolean} [options.enabled=true] - Whether the query should run automatically on mount.
 * @see {@link ℹ️ https://tanstack.com/query/latest/docs/react/reference/useQuery} for full React Query documentation.
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
 *           {repo.topics.map((stackName) => (
 *             <span key={stackName} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *               <StackIcons itemTopics={stackName}/><StackLabels itemTopics={stackName}/>
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
 */

export const useGitHubAutomatedRepos = (
    gitHubUsername: string,
    keyWord: string,
    options?: Omit<UseQueryOptions<IGitHubRepos[], Error, IGitHubRepos[], [string, string, string]>, 'queryKey' | 'queryFn'>
): UseQueryResult<IGitHubRepos[], Error> =>
    useQuery<IGitHubRepos[], Error, IGitHubRepos[], [string, string, string]>({
        queryKey: ['githubRepos', gitHubUsername, keyWord],
        queryFn: () => handleRepository(gitHubUsername, keyWord),
        ...options,
    });
