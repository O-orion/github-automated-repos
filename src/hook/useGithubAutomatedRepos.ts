import { _handleRepository } from './utils/_handleRepository';
import { useEffect, useState } from 'react';
export interface IGitHubRepos {
    name: string;
    topics: string[];
    html_url: string;
    description: string;
    id: number;
    homepage: string;
    banner: string[];
}


interface IUseGithubReposSimpleReturn {
    data: IGitHubRepos[] | undefined;
    isLoading: boolean;
    error: Error | null;
}


/**
 * 
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 * // Usage Example github-automated-repos HOOK
  import { useGitHubAutomatedRepos, StackIcons, StackLabels } from "github-automated-repos";
  const { data, isLoading, error } = useGitHubAutomatedRepos('digoarthur', 'attached');
  console.log(data)
 *
 * @param {string} GitHubUsername - Your GitHub username as seen in your profile URL.
 *                                  Example: 'digoarthur' from https://github.com/USERNAME.
 * @param {string} KeyWord - It is chosen by you. KeyWord used to identify and filter repositories (e.g., 'portfolio', 'attached'). 
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
 * @returns {IGitHubRepos[]|undefined} data - Array of filtered repositories, or `undefined` while loading.
 * @returns {boolean} isLoading - `true` while fetching data, otherwise `false`.
 * @returns {Error|null} error - Error object if the request failed, otherwise `null`.
 * 
 * @example
 * // Usage Example
 * 
  import { useGitHubAutomatedRepos, StackIcons, StackLabels } from "github-automated-repos";
  const { data, isLoading } = useGitHubAutomatedRepos("digoarthur", "deploy");
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

export function useGitHubAutomatedRepos(GitHubUsername: string, KeyWord: string): IUseGithubReposSimpleReturn {
    const [data, setData] = useState<IGitHubRepos[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!GitHubUsername || !KeyWord) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const repos = await _handleRepository(GitHubUsername, KeyWord);
                setData(repos);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [GitHubUsername, KeyWord]);

    return { data, isLoading, error };
}
