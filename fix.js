const fs = require('fs');
const filesToFix = [
  'src/app/book/page.js',
  'src/components/blog/BlogDetailPage.js',
  'src/components/blog/BlogPage.js',
  'src/components/news/NewsDetailPage.js',
  'src/components/news/NewsListPage.js',
  'src/components/off-plan/OffPlanPage.js',
  'src/components/rent/RentPage.js',
  'src/components/sale/SalePage.js',
  'src/components/about/careers/page.js'
];
filesToFix.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/([a-zA-Z])'([a-zA-Z])/g, '$1&apos;$2');
  fs.writeFileSync(f, c);
});
let ndp = fs.readFileSync('src/components/news/NewsDetailPage.js', 'utf8');
if (!ndp.includes('function Chevron()')) {
  const toAppend = `
function Chevron() { return ( <svg className="h-3.5 w-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /> </svg> ); }
function Dot() { return <div className="h-1 w-1 rounded-full bg-slate-300" />; }
function MetaItem({ icon, text }) { return ( <div className="flex items-center gap-2.5 text-[13px] text-slate-600"> <span className="text-amber-500">{icon}</span> <span>{text}</span> </div> ); }
`;
  fs.writeFileSync('src/components/news/NewsDetailPage.js', ndp + toAppend);
}
console.log('Fixed linting errors');
