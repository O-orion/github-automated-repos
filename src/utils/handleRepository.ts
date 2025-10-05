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
