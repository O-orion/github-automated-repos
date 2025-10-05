export interface IGithubAPIResponse {
    id: number;
    name: string;
    topics: string[];
    html_url: string;
    description: string;
    homepage: string;
}

export const fetchGitHubAPI = async (gitHubUsername: string): Promise<IGithubAPIResponse[]> => {
    const response = await fetch(`https://api.github.com/users/${gitHubUsername}/repos?sort=created&per_page=999`);

    if (!response.ok) {
        throw new Error(`Unsuccessful request: ${response.statusText}`);
    }

    const jsonData: IGithubAPIResponse[] = (await response.json()) as IGithubAPIResponse[];
    return jsonData;
};
