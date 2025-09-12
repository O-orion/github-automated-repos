import { fetchGitHubBanner } from '../api/fetchGitHubBanner';

export interface IGitHubBanner {
    download_url: string | null;
}

export const handleBanner = async (usernameGitHub: string, repositoryName: string): Promise<string[]> => {
    const bannersUrl: string[] = [];

    try {
        const repositoryBanners = await fetchGitHubBanner(usernameGitHub, repositoryName);

        if (Array.isArray(repositoryBanners)) {
            repositoryBanners.forEach((item: IGitHubBanner) => {
                if (item?.download_url && item.download_url.includes('banner')) {
                    bannersUrl.push(item.download_url);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching banners:', error);
    }

    return bannersUrl;
};
