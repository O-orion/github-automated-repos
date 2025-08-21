export async function fetchGitHubBanner(
    usernameGitHub: string,
    repositoryName: string
): Promise<{ success: boolean; message: string; details?: any } | Error> {
    try {
        const response = await fetch(`https://api.github.com/repos/${usernameGitHub}/${repositoryName}/contents/public`);

        if (!response.ok) {
            if (response.status === 404) {
                const notFoundFolder = {
                    success: false,
                    message: `⚠️📂 In the repository >${repositoryName}< the "public" folder was not found.`,
                    details: {
                        suggestion: 'Create a "public" folder and insert your banner (e.g: banner.png, banner.jpg or banner.svg)',
                        status: 404
                    }
                };

                console.warn(notFoundFolder.message + '  ℹ️' + notFoundFolder.details.suggestion);
                return notFoundFolder;
            }
            throw new Error(`Erro ${response.status}: ${response.statusText}`);

        }

        const jsonData = await response.json();


        const validExtensions = [".png", ".jpg", ".jpeg", ".svg"];
        const hasBanner = (jsonData as any[]).some(item =>
            item.type === "file" &&
            item.name.toLowerCase().includes("banner") &&
            validExtensions.some(ext => item.name.toLowerCase().endsWith(ext))
        );

        if (!hasBanner) {
            const noBannerFound = {
                success: false,
                message: `⚠️🖼️ In repository >${repositoryName}< no banner file was found in folder "public".`,
                details: {
                    suggestion: 'Insert an image that contains the name "banner" and is png, jpg, jpeg or svg',
                    status: 200
                }
            };
            console.warn(noBannerFound.message + '  ℹ️' + noBannerFound.details.suggestion);
            return noBannerFound;
        }

        return jsonData;
    } catch (err) {
        return err as Error;
    }
}
