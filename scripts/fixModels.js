const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '..', 'src', 'models');
const files = fs.readdirSync(modelsDir);

for (const file of files) {
  if (file.endsWith('.js') && file !== 'index.js') {
    const fullPath = path.join(modelsDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/\\n/g, '\n');
    fs.writeFileSync(fullPath, content);
    console.log("Fixed: " + fullPath);
  }
}
