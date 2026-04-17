const fs = require('fs');

const content = fs.readFileSync('/Users/rain9/you-want/rain9-blog/docs/blogs/frontend/demo.md', 'utf-8');
const lines = content.split('\n');

const headings = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('## ')) {
    headings.push({line: i, text: lines[i]});
  }
}
console.log(headings.map(h => h.text).join('\n'));
