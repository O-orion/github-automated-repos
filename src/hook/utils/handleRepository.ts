import { fetchGitHubAPI } from '../api/fetchGitHubAPI';
import { handleBanner } from './handleBanner';

export interface IGithubRepos {
    id: number;
    name: string;
    topics: string[];
    html_url: string;
    description: string;
    homepage: string;
    banner: string[];
}

/**
 * @param {string} gitHubUsername - Insert your GitHub username. See in your GitHub Ex.: https://github.com/USERNAME
 * @param {string} keyWordDeploy - Insert a keyword chosen by you. - This key is responsible for managing your projects on GitHub in topics field. See in : https://github.com/DIGOARTHUR/github-automated-repos.
 */
export const handleRepository = async (gitHubUsername: string, keyWordDeploy: string): Promise<IGithubRepos[]> => {
    const jsonData = await fetchGitHubAPI(gitHubUsername);

    const dataFilter = jsonData.filter((item) => item.topics.includes(keyWordDeploy));

    const repositories: IGithubRepos[] = await Promise.all(
        dataFilter.map(async (item) => {
            const banner = await handleBanner(gitHubUsername, item.name);

            return {
                id: item.id,
                name: item.name,
                html_url: item.html_url,
                description: item.description,
                topics: item.topics,
                homepage: item.homepage,
                banner,
            };
        })
    );

    return repositories;
};
