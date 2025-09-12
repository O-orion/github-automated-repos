/**
 * --------------------------
 * CHANGELOG.md Generator
 *---------------------------
 * Rules implemented:
 * - Includes commits of type `feat` and `fix`.
 * - Includes commits that have "special" scopes defined in `specialScopes`.
 * - Normalizes scope names (e.g., stack-icons -> stackIcons).
 * - Commits without a scope or with a non-special scope are grouped under `general`.
 * - Adds GitHub commit links with short hashes.
 * - Sorts commit groups according to the priority defined in `order`.
 * - Formats the changelog output in Markdown using tables.
 */

module.exports = {
    preset: 'angular',
    writerOpts: {
        transform: (commit) => {
            if (!commit.hash) return null;

            const specialScopes = [
                'useGithubAutomatedRepos',
                'stackLabels',
                'stackIcons',
                'banner',
                'api',
                'repository',
                'react-query',
                'hook',
                'icons',
                'docs',
                'eslint',
                'changelog',
            ];

            const shouldInclude = ['feat', 'fix'].includes(commit.type) || (commit.scope && specialScopes.includes(commit.scope));

            if (!shouldInclude) return null;

            commit.hashLink = `https://github.com/DIGOARTHUR/github-automated-repos/commit/${commit.hash}`;
            commit.shortHash = commit.hash.substring(0, 7);

            if (commit.scope) {
                commit.scope = commit.scope
                    .replace(/stack[-_]?icons?/i, 'stackIcons')
                    .replace(/stack[-_]?labels?/i, 'stackLabels')
                    .replace(/banner/i, 'banner')
                    .replace(/api/i, 'api')
                    .replace(/repository/i, 'repository')
                    .replace(/query[-_]?client/i, 'react-query')
                    .replace(/hooks?/i, 'hook')
                    .replace(/icons?/i, 'icons')
                    .replace(/icons?/i, 'eslint')
                    .replace(/icons?/i, 'changelog');
            }

            if (!commit.scope || !specialScopes.includes(commit.scope)) {
                commit.scope = 'general';
            }

            return commit;
        },
        groupBy: 'scope',
        commitGroupsSort: (a, b) => {
            const order = [
                'useGithubAutomatedRepos',
                'stackIcons',
                'stackLabels',
                'banner',
                'api',
                'repository',
                'react-query',
                'hook',
                'icons',
                'docs',
                'general',
                'eslint',
                'changelog',
            ];
            return order.indexOf(a.title) - order.indexOf(b.title);
        },
        commitsSort: ['type', 'subject'],
        headerPartial: '<a name="{{version}}"></a>\n# {{version}} ({{date}})\n\n',
        commitPartial: '| [{{shortHash}}]({{hashLink}}) | {{type}} | {{subject}} |\n',
        mainTemplate: `{{> header}}
{{#each commitGroups}}
### {{title}}
| Commit | Type | Description |
|--------|------|-------------|
{{#each commits}}{{> commit}}{{/each}}

{{/each}}`,
    },
};
