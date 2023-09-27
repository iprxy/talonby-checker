import { parse } from 'node-html-parser';
import { sendMessageToTelegramBot } from './telegram';
import { updateVariable } from './github';

const { DOCTOR_ID, BOT_TOKEN, TG_USER_ID, IS_ALREADY_ACTIVE } = process.env;

if (!DOCTOR_ID || !BOT_TOKEN || !TG_USER_ID || !IS_ALREADY_ACTIVE) throw new Error('Check your environments');

const SITE_URL = 'https://talon.by/policlinic/klinika-merci/doctors/' + process.env.DOCTOR_ID;

const data = await fetch(SITE_URL);
const siteResponse = await data.text();
const root = parse(siteResponse);
const button = root.querySelector('#doctor_header .button');
const isButtonAvailable = !button?.classList.contains('notAvailable');
const isAlreadyActive = IS_ALREADY_ACTIVE === 'true';

if (isButtonAvailable && !isAlreadyActive) {
  console.log('Slot available, notify!');
  await sendMessageToTelegramBot(BOT_TOKEN, Number(TG_USER_ID), `Запись доступна:\n${SITE_URL}`);
  await updateVariable('true');
}

if (!isButtonAvailable && isAlreadyActive) {
  console.log('Slot not available, notify!');
  await sendMessageToTelegramBot(BOT_TOKEN, Number(TG_USER_ID), `Запись более недоступна:\n${SITE_URL}`);
  await updateVariable('false');
}
