const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '..', 'src', 'models');

const modelToCollection = {
  'Blog': 'blogs',
  'Booking': 'bookings',
  'Application': 'applications',
  'DeveloperFaq': 'developer_faqs',
  'DeveloperProject': 'developer_projects',
  'SiteFaq': 'site_faqs',
  'Property': 'properties',
  'Newsletter': 'newsletter',
  'AdminProfile': 'admin_profiles',
  'Testimonial': 'testimonials'
};

for (const [modelName, collectionName] of Object.entries(modelToCollection)) {
  const filePath = path.join(modelsDir, `${modelName}.js`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has collection: '...'
    if (!content.includes('collection:')) {
      // Replace { strict: false } with { strict: false, collection: '...' }
      content = content.replace(/\{\s*strict:\s*false\s*\}/, `{ strict: false, collection: '${collectionName}' }`);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${modelName} to use collection ${collectionName}`);
    }
  }
}
