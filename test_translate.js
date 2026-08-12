import { translate } from '@vitalets/google-translate-api';
async function run() {
  try {
    const res = await translate('Hello world', { to: 'fr' });
    console.log(res.text);
  } catch (e) {
    console.error(e);
  }
}
run();
