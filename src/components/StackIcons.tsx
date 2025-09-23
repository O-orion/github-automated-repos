import React from 'react';

import { stackIconsURL } from '../icons/stackIconsURL';

type PropsStackIcons = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 *  🧩 <StackIcons />
 *  - Render your icons from the used stacks.
 *                                 ⚠️ Set the stackIcon in GitHub at:
 *                                 Repository → About - '⚙️' → Topics → add your stackName.
 *
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
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
 * @returns {JSX.Element} - Return tag img(SVG).
 */

export const StackIcons = ({ itemTopics, className, style }: PropsStackIcons): JSX.Element | null =>
    itemTopics === 'deploy' ? null : <img style={style} className={className} alt={stackIconsURL[itemTopics]} src={stackIconsURL[itemTopics]} />;
