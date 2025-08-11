import { fetchGitHubBanner } from '../api/fetchGitHubBanner';

export interface IBanner {
  download_url: string;
}

export async function _handleBanner(usernameGitHub: string, repositoryName: string): Promise<string[]> {
  const banners_url: string[] = [];

  try {
    const repositorie_Banners = await fetchGitHubBanner(usernameGitHub, repositoryName);
    console.log(repositorie_Banners.download_url)
    if (Array.isArray(repositorie_Banners)) {
      repositorie_Banners.forEach((item: IBanner) => {
        if (item?.download_url && item.download_url.includes('banner')) {
          banners_url.push(item.download_url);
        } else {
          // opcional
          // banners_url.push("");
        }
      });
    }
  } catch (error) {
    console.error('Erro ao buscar banners:', error);
  }

  return banners_url;
}
