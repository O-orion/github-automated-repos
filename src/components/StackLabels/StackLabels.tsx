import React from 'react';

import { stackIconsURL } from '../../icons/stackIconsURL';
import { css } from './styles.js';

type PropsStackLabels = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 * 🧩 < StackLabels />
 * - Renders a LABELS for technology stacks with optional styling.
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 *    {repo.topics.map((topic) => (
 *           <span key={topic} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *             <StackLabels itemTopics={topic}/>
 *           </span>
 *     ))}
 *
 * @param {string} itemTopics - **Mandatory**: e.g: item.topics.map(icon) ... itemTopics={icon}
 * @param {string} className - Optional: style className - TailwindCSS.
 * @param {React.CSSProperties} style - Optional: style CSS Properties.
 * @returns {ReactNode} - Return tag img(SVG).
 */
export function StackLabels({ itemTopics, className = 'styleStackLabels', style }: PropsStackLabels): JSX.Element | null {
    return itemTopics === 'deploy' || stackIconsURL[itemTopics] === undefined ? (
        <> </>
    ) : (
        <>
            <style>{css}</style>
            <p style={style} className={className}>
                {itemTopics}
            </p>
        </>
    );
}
