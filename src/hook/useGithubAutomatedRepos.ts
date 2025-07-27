import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { _handleRepository } from './utils/_handleRepository';
import { useEffect, useState } from 'react';
export interface IGithubRepos {
    name: string;
    topics: string[];
    html_url: string;
    description: string;
    id: number;
    homepage: string;
    banner: string[];
}


interface IUseGithubReposSimpleReturn {
    data: IGithubRepos[] | undefined;
    isLoading: boolean;
    error: Error | null;
}


/**
 * @param {string} usernameGitHub - Insert your GitHub username. See in your GitHub Ex.: https://github.com/USERNAME
 * @param {string} keyWordDeploy - Insert a keyword chosen by you. - This key is responsible for managing your data projects on GitHub in topics field. See in : https://github.com/DIGOARTHUR/github-automated-repos.
 * @returns {} - React Query result containing repositories data with the properties: name, topics[], html_url, description, id, homepage, banner[]. isLoading to await for data TRUE or FALSE. isLoadingError for a bad request TRUE ou FALSE.
 */
export function useGitHubAutomatedRepos(usernameGitHub: string, keyWordDeploy: string): IUseGithubReposSimpleReturn {
    const [data, setData] = useState<IGithubRepos[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!usernameGitHub || !keyWordDeploy) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const repos = await _handleRepository(usernameGitHub, keyWordDeploy);
                setData(repos);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [usernameGitHub, keyWordDeploy]);

    return { data, isLoading, error };
}
