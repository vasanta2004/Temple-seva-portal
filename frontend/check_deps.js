const fs = require('fs');

// We can use a simple node package if we had it, but we can write a simple script to parse the JPEG or just use a small canvas,
// or we can read the raw JPEG and get pixel colors using a library, but wait! Do we have a library like 'jimp' or 'sharp' or 'jpeg-js' installed?
// Let's check package.json in frontend to see what packages are installed!
const pkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
console.log('Dependencies:', pkg.dependencies);
console.log('DevDependencies:', pkg.devDependencies);
