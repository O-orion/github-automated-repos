module.exports = {
    preset: 'angular',
    releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
    writerOpts: {
      transform: (commit, context) => {
      
        if (['docs', 'chore'].includes(commit.type)) {
          return false; 
        }
  
       
        const typeMap = {
          feat: '✨ Features',
          fix: '🐛 Bug Fixes',
          perf: '🚀 Performance',
          refactor: '♻️ Refactors',
          improvement: '✅ Improvements'
        };
  
    
        if (typeMap[commit.type]) {
          commit.type = typeMap[commit.type];
        }
  
      
        if (context.repository) {
          const issueUrl = `${context.host}/${context.owner}/${context.repository}/issues/`;
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            return `[#${issue}](${issueUrl}${issue})`;
          });
        }
  
        return commit;
      },
      groupBy: 'type',
      commitGroupsSort: (a, b) => {
        const order = ['✨ Features', '🐛 Bug Fixes', '🚀 Performance', '♻️ Refactors'];
        return order.indexOf(a.title) - order.indexOf(b.title);
      },
      commitsSort: ['scope', 'subject'],
      noteGroupsSort: 'title',
      notesSort: 'text'
    }
  };