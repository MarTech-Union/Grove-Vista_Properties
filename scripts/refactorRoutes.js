const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'app', 'api');

const collectionToModel = {
  'blogs': 'Blog',
  'bookings': 'Booking',
  'applications': 'Application',
  'developer_faqs': 'DeveloperFaq',
  'developer_projects': 'DeveloperProject',
  'site_faqs': 'SiteFaq',
  'properties': 'Property',
  'newsletter': 'Newsletter',
  'admin_profiles': 'AdminProfile',
  'testimonials': 'Testimonial'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('getCollection')) {
        let modelsToImport = new Set();
        
        // Replace getCollection calls
        content = content.replace(/const\s+(\w+)\s*=\s*await\s+getCollection\(['"]([^'"]+)['"]\);/g, function(match, varName, collectionName) {
          const modelName = collectionToModel[collectionName];
          if (modelName) {
            modelsToImport.add(modelName);
            return "await connectDB();\n    const " + varName + " = " + modelName + ";";
          }
          return match;
        });

        // Add imports
        if (modelsToImport.size > 0) {
          content = content.replace(/import\s+\{\s*getCollection\s*\}\s*from\s*['"]@\/lib\/mongodb['"];/, function() {
            const models = Array.from(modelsToImport).join(', ');
            return "import connectDB from \"@/lib/mongoose\";\nimport { " + models + " } from \"@/models\";";
          });
        }
        
        content = content.replace(/\.insertOne\(/g, '.create(');
        content = content.replace(/\.toArray\(\)/g, '.lean()');
        content = content.replace(/find\(([^,]+),\s*\{\s*projection:\s*\{\s*_id:\s*0\s*\}\s*\}\)/g, "find($1).select('-_id')");
        
        fs.writeFileSync(fullPath, content);
        console.log("Updated: " + fullPath);
      }
    }
  }
}

processDirectory(srcDir);
console.log("Refactoring complete.");
