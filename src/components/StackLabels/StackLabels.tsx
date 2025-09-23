import React from 'react';

import { stackIconsURL } from '../../icons/stackIconsURL';
import { CSS } from './styles.js';

type PropsStackLabels = {
    itemTopics: string;
    className?: string;
    style?: React.CSSProperties;
};

/**
 * 🧩 < StackLabels />
 * - Render your labels from the used stacks.
 *                                 ⚠️ Set the stackLabels in GitHub at:
 *                                 Repository → About - '⚙️' → Topics → add your stackName.
 *
 * @see {@link ℹ️ https://github.com/DIGOARTHUR/github-automated-repos} for more info github-automated-repos documentation.
 * @example
 *    {repo.topics.map((stackName) => (
 *           <span key={stackName} style={{ marginRight: '8px', display: 'flex', gap: '0.2rem' }}>
 *             <StackLabels itemTopics={stackName} className="w-20" />
 *           </span>
 *     ))}
 * @param {string} itemTopics - ⚠️ **Mandatory**: e.g: item.topics.map(stackName) ... itemTopics={stackName}
 * @param {string} className - Optional: TailwindCSS CSS Properties.
 * @param {React.CSSProperties} style - Optional: style CSS Properties.
 * @returns {ReactNode} - Return tag img(SVG).
 */
export const StackLabels = ({ itemTopics, className = 'styleStackLabels', style }: PropsStackLabels): JSX.Element | null =>
    itemTopics === 'deploy' || stackIconsURL[itemTopics] === undefined ? (
        <> </>
    ) : (
        <>
            <style>{CSS}</style>
            <p style={style} className={className}>
                {itemTopics}
            </p>
        </>
    );
