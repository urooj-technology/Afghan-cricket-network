#!/bin/bash

# Build the project
echo "Building Next.js project..."
npm run build

# Create deployment package
echo "Creating deployment package..."
mkdir -p deploy-package

# Copy necessary files
cp -r .next deploy-package/
cp -r public deploy-package/
cp package.json deploy-package/
cp package-lock.json deploy-package/
cp next.config.js deploy-package/
cp server.js deploy-package/

# Copy other config files if they exist
[ -f .env.local ] && cp .env.local deploy-package/
[ -f .env.production ] && cp .env.production deploy-package/

echo "Deployment package created in deploy-package/"
echo "Upload the contents of deploy-package/ to your cPanel public_html/app/ directory"
echo "Then run 'npm install --production' on the server"