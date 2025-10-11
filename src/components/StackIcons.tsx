import React from 'react';

import { stackIconsURL } from '../icons/stackIconsURL';

type PropsStackIcons = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 *  🧩 StackIcons Component
 *  - `Add icons` representing the stacks/technologies used in your repositories.
 *                                 ⚠️ Set the icons in GitHub at:
 *                                 Repository → About '⚙️' → Topics → add your stackName.
 *
 * @see {@link https://github.com/DIGOARTHUR/github-automated-repos} ⬅ check the available stack names here. (GitHub Topics)
 * @example
 *    {repo.topics.map((stackName) => (
 *      <span key={stackName} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *         <StackIcons itemTopics={stackName} className="w-20" />
 *      </span>
 *    ))}
 *
 * @param {string} itemTopics - ⚠️ **Mandatory**: e.g: repo.topics.map(stackName) ... itemTopics={stackName}
 * @param {string} className - Optional: TailwindCSS CSS Properties.
 * @param {React.CSSProperties} style - Optional: style CSS Properties.
 * @returns {JSX.Element} - Return tag `<img>`.
 */

export const StackIcons = ({ itemTopics, className, style }: PropsStackIcons): JSX.Element | null => {
    if (!stackIconsURL[itemTopics]) {
        return null;
    }

    return <img style={style} className={className} alt={itemTopics} src={stackIconsURL[itemTopics]} />;
};
