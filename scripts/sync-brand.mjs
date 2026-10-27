import { readFileSync, writeFileSync } from 'node:fs';

const brand = JSON.parse(readFileSync(new URL('../brand.json', import.meta.url), 'utf8'));
const metadataPath = new URL('../metadata.json', import.meta.url);
const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
metadata.name = brand.name;
metadata.description = `Discover ${brand.name} in ${brand.location}. ${brand.description}`;
writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
