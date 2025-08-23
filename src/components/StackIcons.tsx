import React from 'react';

import { stackIconsURL } from '../icons/stackIconsURL';

type PropsStackIcons = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 *  🧩 < StackIcons />
 *  - Renders a ICONS for technology stacks with optional styling.
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 *    {repo.topics.map((topic) => (
 *           <span key={topic} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *             <StackIcons itemTopics={topic}/>
 *           </span>
 *     ))}
 *
 * @param {string} itemTopics - **Mandatory**: e.g: item.topics.map(icon) ... itemTopics={icon}
 * @param {string} className - Optional: style className - TailwindCSS.
 * @param {React.CSSProperties} style - Optional: style CSS Properties.
 * @returns {ReactNode} - Return tag img(SVG).
 */

export function StackIcons({ itemTopics, className, style }: PropsStackIcons): JSX.Element | null {
    return itemTopics === 'deploy' ? (
        <> </>
    ) : (
        <img style={style} className={className} alt={stackIconsURL[itemTopics]} src={stackIconsURL[itemTopics]} />
    );
}
