// Build the signed release APK: vite build → bundle dist into assets → gradle.
import { execSync } from 'child_process';
import { rmSync, cpSync, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' });

run('npx vite build');

const www = resolve(root, 'android/app/src/main/assets/www');
rmSync(www, { recursive: true, force: true });
cpSync(resolve(root, 'dist'), www, { recursive: true });
console.log('bundled dist → android assets');

run('.\\gradlew.bat assembleRelease --no-daemon', resolve(root, 'android'));

const apk = resolve(root, 'android/app/build/outputs/apk/release/app-release.apk');
if (!existsSync(apk)) throw new Error('APK not produced');
console.log(`APK ready: ${apk} (${(statSync(apk).size / 1048576).toFixed(1)} MB)`);
