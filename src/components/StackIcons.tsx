import React from 'react';

import { stackIconsURL } from '../icons/stackIconsURL';

type PropsStackIcons = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 *  🧩 <StackIcons />
 *  - Renders an icon for technology stacks with optional styling.
 *
 * @see {@link https://github.com/DIGOARTHUR/github-automated-repos} for docs
 * @example
 *    {repo.topics.map((topic) => (
 *      <span key={topic} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *        <StackIcons itemTopics={topic} />
 *      </span>
 *    ))}
 *
 * @param {string} itemTopics - **Mandatory**: e.g: item.topics.map(icon) ... itemTopics={icon}
 * @param {string} className - Optional: TailwindCSS className.
 * @param {React.CSSProperties} style - Optional: inline style CSS.
 * @returns {JSX.Element | null} - Rendered `img` or `null`.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StackIcons = ({ itemTopics, className, style }: PropsStackIcons): JSX.Element | null =>
    itemTopics === 'deploy' ? null : <img style={style} className={className} alt={stackIconsURL[itemTopics]} src={stackIconsURL[itemTopics]} />;
