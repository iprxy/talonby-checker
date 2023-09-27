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

const updateData = async (isAvailable = true) => {
  console.log(`Slot ${isAvailable ? 'available' : 'not available'}, notify!`);

  const messageText = isAvailable ? 'Запись доступна\n' : 'Запись более недоступна:\n';
  await sendMessageToTelegramBot(BOT_TOKEN, Number(TG_USER_ID), messageText + SITE_URL);
  await updateVariable(isAvailable ? 'true' : 'false');
};

if (isButtonAvailable && !isAlreadyActive) updateData();
if (!isButtonAvailable && isAlreadyActive) updateData(false);
