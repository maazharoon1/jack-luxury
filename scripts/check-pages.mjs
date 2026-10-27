import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const profile = await mkdtemp(path.join(tmpdir(), 'crown-jewel-browser-'));
const browser = spawn('C:/Users/dell/.cache/puppeteer/chrome/win64-152.0.7977.75/chrome-win64/chrome.exe', ['--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
browser.stderr.on('data', data => process.stderr.write(data));
let socket;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let targets;
  for (let i = 0; i < 60; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9337/json')).json(); break; } catch { await delay(250); }
  }
  assert(targets, 'Headless browser started');
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('close', event => { for (const request of pending.values()) request.reject(new Error(`Browser disconnected: ${event.code} ${event.reason}`)); });
  const runtimeErrors = [];
  socket.addEventListener('message', ({ data }) => {
    const result = JSON.parse(data);
    if (result.method === 'Runtime.exceptionThrown') runtimeErrors.push(result.params.exceptionDetails.text);
    if (pending.has(result.id)) { const { resolve, reject } = pending.get(result.id); pending.delete(result.id); result.error ? reject(result.error) : resolve(result.result); }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async expression => { for (let i = 0; i < 80; i++) { if (await evaluate(expression)) return; await delay(100); } throw new Error(`Timed out: ${expression}`); };
  const clickText = text => evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes(${JSON.stringify(text)})).click()`);
  const screenshot = async name => { await delay(1000); const { data } = await send('Page.captureScreenshot', { format: 'png' }); await writeFile(`artifacts/${name}.png`, Buffer.from(data, 'base64')); };
  await mkdir('artifacts', { recursive: true });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/#/about' });
  await until(`document.querySelector('.about-page') !== null`);
  await screenshot('about-desktop');
  assert(await evaluate(`document.title.includes('Our Story')`));
  await evaluate(`localStorage.setItem('crown-jewel-bag-v1', JSON.stringify([{id:'cj-monarch-chronograph',quantity:1}])); location.hash='/checkout';`);
  await send('Page.reload');
  await until(`document.querySelector('#delivery-form') !== null`);
  assert.equal(await evaluate(`document.querySelector('#delivery-form').checkValidity()`), false, 'Empty form is invalid');
  assert((await evaluate(`document.querySelector('.summary-total dd').textContent`)).includes('18,500'));
  await evaluate(`document.querySelector('[aria-label="Increase Monarch Chronograph quantity"]').click()`);
  await until(`document.querySelector('.summary-total dd').textContent.includes('37,000')`);
  await screenshot('checkout-desktop');
  const details = { email: 'preview@example.com', firstName: 'Avery', lastName: 'Stone', address: '123 Example Street', city: 'Los Angeles', postalCode: '90001', country: 'United States' };
  await evaluate(`(() => { const details = ${JSON.stringify(details)}; for (const [key,value] of Object.entries(details)) { const input = document.querySelector('[name="'+key+'"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input,value); input.dispatchEvent(new Event('input',{bubbles:true})); } })()`);
  assert.equal(await evaluate(`document.querySelector('#delivery-form').checkValidity()`), true, 'Filled form is valid');
  await clickText('Review your selection');
  await until(`document.querySelector('.review-details') !== null`);
  assert(await evaluate(`document.querySelector('.review-details').textContent.includes('preview@example.com')`));
  assert(await evaluate(`document.querySelector('.checkout-submit').disabled`));
  await evaluate(`document.querySelector('.checkout-consent input').click()`);
  await clickText('Complete checkout preview');
  await until(`document.querySelector('main').textContent.includes('No payment was taken')`);
  assert(await evaluate(`JSON.parse(localStorage.getItem('crown-jewel-bag-v1'))[0].quantity === 2`));
  await send('Page.reload');
  await until(`document.querySelector('#delivery-form') !== null`);
  assert.equal(await evaluate(`document.querySelector('[name=email]').value`), '', 'Private details are not persisted');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await screenshot('checkout-mobile');
  assert(await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`), 'Mobile checkout fits viewport');
  await evaluate(`location.hash='/about'`);
  await until(`document.querySelector('.about-page') !== null`);
  await screenshot('about-mobile');
  assert(await evaluate(`document.documentElement.scrollWidth <= window.innerWidth`), 'Mobile about fits viewport');
  await evaluate(`document.querySelector('[aria-label="View Shopping Cart"]').click()`);
  await until(`document.querySelector('[role=dialog]') !== null`);
  await clickText('Continue to checkout');
  await until(`document.querySelector('#delivery-form') !== null`);
  await evaluate(`document.querySelector('[aria-label="Remove Monarch Chronograph"]').click()`);
  await until(`document.querySelector('main').textContent.includes('Your shopping bag is empty')`);
  assert.deepEqual(runtimeErrors, [], 'No browser runtime exceptions');
  console.log('PASS: About and checkout routes; desktop/mobile layouts; form validation; totals; review; demo completion; cart persistence; private data not persisted; drawer navigation; empty bag.');
} finally {
  socket?.close();
  browser.kill();
  await delay(500);
  // Only remove the exact temporary profile created by this script.
  assert(profile.startsWith(path.join(tmpdir(), 'crown-jewel-browser-')));
  await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 300 }).catch(() => {});
}
