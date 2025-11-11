import { Bot, Keyboard } from '@maxhub/max-bot-api';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error('Token not provided');
}
const bot = new Bot(token);

const score: Record<number, number> = {};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadImageWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const image = await bot.api.uploadImage({ url });
      return image;
    } catch (error: any) {
      console.log('Error: ', error);
      if (i === retries - 1) {
        return null;
      }
      const waitTime = 2000 * (i + 1);
      await delay(waitTime);
    }
  }
  return null;
}

const images = await (async () => {
  const imageUrls = {
    start: 'https://i.yapx.ru/cHX7H.png',
    prolog: 'https://i.yapx.ru/cGaQu.png',
    ep1_1: 'https://i.yapx.ru/cGaVk.png',
    ep1_2: 'https://i.yapx.ru/cGac7.png',
    ep1_3: 'https://i.yapx.ru/cGarM.png',
    ep1_4: 'https://i.yapx.ru/cGaiR.png',
    ep1_5: 'https://i.yapx.ru/cGaoq.png',
    ep2_1: 'https://i.yapx.ru/cHCkE.png',
    ep2_2: 'https://i.yapx.ru/cHCke.png',
    ep2_3: 'https://i.yapx.ru/cHCky.png',
    ep2_4: 'https://i.yapx.ru/cHCk9.png',
    ep3_1: 'https://i.yapx.ru/cHYfA.png',
    ep3_2: 'https://i.yapx.ru/cHYgF.png',
    ep3_3: 'https://i.yapx.ru/cHYgY.png',
    ep3_4: 'https://i.yapx.ru/cHYgv.png',
    ep4_1: 'https://i.yapx.ru/cHZDg.png',
    ep4_2: 'https://i.yapx.ru/cHZD3.png',
    ep4_3: 'https://i.yapx.ru/cHZES.png',
    final: 'https://i.yapx.ru/cHX7u.png',
  };

  const results: Record<string, any> = {};
  const promises = Object.entries(imageUrls).map(async ([key, url]) => {
    results[key] = await uploadImageWithRetry(url);
  });

  await Promise.all(promises);
  return results;
})();

process.on('unhandledRejection', error => {
  console.log('Error', error);
});

process.on('uncaughtException', error => {
  console.log('Error:', error);
});

const keyboardStart = Keyboard.inlineKeyboard([[Keyboard.button.callback('Проверить, что это такое.', 'startEp')]]);

const keyboardStart1Ep = Keyboard.inlineKeyboard([[Keyboard.button.callback('Поехали!', 'startEp1')]]);

const keyboardStart2Ep = Keyboard.inlineKeyboard([[Keyboard.button.callback('Давай продолжим!', 'startEp2')]]);

const keyboardStart3Ep = Keyboard.inlineKeyboard([
  [Keyboard.button.callback('Давайте дальше спасать мир!', 'startEp3')],
]);

const keyboardFinal = Keyboard.inlineKeyboard([[Keyboard.button.callback('Пора домой!', 'startFinal')]]);

const keyboardEpilog = Keyboard.inlineKeyboard([[Keyboard.button.callback('Я запомнил!', 'startEpilog')]]);

const keyboardEnd = Keyboard.inlineKeyboard([[Keyboard.button.callback('Я запомнил!', 'End')]]);

const keyboard0Ep = Keyboard.inlineKeyboard([
  [Keyboard.button.callback('Выбор А', 'choise0_1'), Keyboard.button.callback('Выбор Б', 'choise0_2')],
]);

const keyboard1Ep1Q = Keyboard.inlineKeyboard([
  [Keyboard.button.callback('Выбор А', 'choise1_1'), Keyboard.button.callback('Выбор Б', 'choise1_2')],
]);

const keyboard1Ep2Q = Keyboard.inlineKeyboard([
  [Keyboard.button.callback('Выбор А', 'choise1_3'), Keyboard.button.callback('Выбор Б', 'choise1_4')],
]);

const keyboard1Ep3Q = Keyboard.inlineKeyboard([
  [Keyboard.button.callback('Выбор А', 'choise1_5'), Keyboard.button.callback('Выбор Б', 'choise1_6')],
]);

const keyboard2Ep = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise2'),
    Keyboard.button.callback('Выбор Б', 'choise2'),
    Keyboard.button.callback('Выбор В', 'choise2'),
  ],
]);

const keyboard3Ep1Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise3_1'),
    Keyboard.button.callback('Выбор Б', 'choise3_1'),
    Keyboard.button.callback('Выбор В', 'choise3_1'),
  ],
]);

const keyboard3Ep2Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise3_2'),
    Keyboard.button.callback('Выбор Б', 'choise3_2'),
    Keyboard.button.callback('Выбор В', 'choise3_2'),
  ],
]);

const keyboard3Ep3Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise3_3'),
    Keyboard.button.callback('Выбор Б', 'choise3_3'),
    Keyboard.button.callback('Выбор В', 'choise3_3'),
  ],
]);

bot.action('startEp', async ctx => {
  try {
    await ctx.reply('В лаборатории вас встречает профессор и его ассистент — <b>Тюленюся</b>', { format: 'html' });
    await delay(2000);
    await ctx.reply(
      '<b>Профессор Экоста:</b> Рад, что вы пришли! Тюленюся зафиксировала аномалии в пространственно-временном континууме, вызванные экологическими проблемами. Мы можем отправить вас в "горячие точки" будущего, чтобы исправить ошибки настоящего. <b>Готовы?<b>',
      { format: 'html' },
    );
    await delay(5000);
    await ctx.reply(
      `<b>Выбор А:</b> Это опасно?
<b>Выбор Б:</b> Конечно, я в деле!`,
      { attachments: [keyboard0Ep], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise0_1', async ctx => {
  try {
    await ctx.reply(
      'В целом это безопасно. <b>Опасность — 73%.</b> Ваши решения будут влиять на исход миссии. <b>Начинаем телепортацию!</b>',
      { attachments: [keyboardStart1Ep, images.prolog.toJson()], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise0_2', async ctx => {
  try {
    await ctx.reply(
      'В целом это безопасно. <b>Опасность — 73%.</b> Ваши решения будут влиять на исход миссии. <b>Начинаем телепортацию!</b>',
      { attachments: [keyboardStart1Ep, images.prolog.toJson()], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEp1', async ctx => {
  try {
    await ctx.reply('<b>Глава 1. Нексус жизни</b>', { format: 'html' });
    await delay(300);
    await ctx.reply(
      'Вы появляетесь не в привычном пространстве, а внутри огромной, сложной и светящейся структуры, напоминающей паутину. От каждой точки исходят сотни нитей к другим точкам.',
      { attachments: [images.ep1_1.toJson()] },
    );
    await delay(7000);
    await ctx.reply(
      `<b>Тюленюся:</b> Добро пожаловать в <b>Нексус Жизни</b> — визуальное воплощение принципов экологии. Это не просто город. Это модель нашего мира, где всё связано невидимыми нитями. 
Экология — это не просто скучный предмет, это наука о нашем общем доме и о том, как все его жители, включая нас, зависят друг от друга.`,
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      'Вы медленно парите в этой паутине света. Одни нити горят ровным ярким светом, другие мерцают, как лампочки на исходе, а третьи и вовсе оборваны, и от них остались лишь угасающие искры.',
    );
    await delay(6000);
    await ctx.reply(
      '<b>Тюленюся:</b> Посмотрите на эту нить. От этих нитей тянутся сотни связей ко всем живым существам, которые объединены в единую экосистему.',
      { format: 'html' },
    );
    await delay(5000);
    await ctx.reply(
      'Она касается нити, и та вспыхивает. Вы видите краткое видение: бескрайние поля, луга, процветающие города и леса. Затем она ослабляет хватку, и нить гаснет. Видение сменяется: леса вырублены, поля бесплодны, прилавки магазинов пустеют.',
      { attachments: [images.ep1_2.toJson()] },
    );
    await delay(6000);
    await ctx.reply('<b>Тюленюся:</b> И это лишь одна нить. А теперь посмотрите, с чем она связана.', {
      format: 'html',
    });
    await delay(4000);
    await ctx.reply('<b>Вам предстоит стабилизировать систему, столкнувшись с тремя проблемами экологии.</b>', {
      format: 'html',
    });
    await delay(5000);
    await ctx.reply('<b>Проблема 1:</b> Мусорный коллапс', { attachments: [images.ep1_3.toJson()], format: 'html' });
    await delay(2000);
    await ctx.reply(
      '<b>Тюленюся:</b> Это не просто проблема неприятного запаха или испорченного пейзажа. Мусор на свалке — это бомба замедленного действия. Токсичные вещества просачиваются в грунтовые воды, отравляя питьевые источники. Пластиковый мусор, попадая в реки и моря, убивает их обитателей. Это не локальная проблема — это угроза для целых экосистем.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      `<b>Выбор А:</b> Построить мусоросжигательный завод без фильтров. 
<b>Выбор Б:</b> Внедрить систему раздельного сбора и глубокой переработки отходов.`,
      { attachments: [keyboard1Ep1Q], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_1', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    await ctx.reply('<b>Проблема 2:</b> Проблема реки', { attachments: [images.ep1_4.toJson()], format: 'html' });
    await delay(2000);
    await ctx.reply(
      '<b>Тюленюся:</b> Отравленная вода убивает речных обитателей. Но на этом последствия не заканчиваются. Животные, которые питались рыбой, гибнут. На полях, которые орошались из реки, накапливаются токсины. Яд попадает в питьевую воду десятков городов ниже по течению.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      `<b>Выбор А:</b> Поставить мощные фильтры на заводе. 
<b>Выбор Б:</b> Перепрофилировать завод на "зелёные" технологии.`,
      { attachments: [keyboard1Ep2Q], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_2', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
    await ctx.reply('<b>Проблема 2:</b> Проблема реки', { attachments: [images.ep1_4.toJson()], format: 'html' });
    await delay(2000);
    await ctx.reply(
      '<b>Тюленюся:</b> Отравленная вода убивает речных обитателей. Но на этом последствия не заканчиваются. Животные, которые питались рыбой, гибнут. На полях, которые орошались из реки, накапливаются токсины. Яд попадает в питьевую воду десятков городов ниже по течению.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      `<b>Выбор А:</b> Поставить мощные фильтры на заводе. 
<b>Выбор Б:</b> Перепрофилировать завод на "зелёные" технологии.`,
      { attachments: [keyboard1Ep2Q], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_3', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    await ctx.reply('<b>Проблема 3:</b> Воздух, который нас кормит.', {
      attachments: [images.ep1_5.toJson()],
      format: 'html',
    });
    await delay(2000);
    await ctx.reply(
      '<b>Тюленюся:</b> Мы дышим не только кислородом. Мы дышим тем, что попадает в воздух. Частицы смога оседают на почве и в воде, попадают в растения, а через них — в животных и в нас. Загрязнение воздуха — это не просто проблема "где-то там", это то, что в итоге оказывается в нашей тарелке.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      `<b>Выбор А:</b> Раздать горожанам защитные маски. 
<b>Выбор Б:</b> Инвестировать в общественный транспорт и зелёные зоны, чтобы очистить воздух в источнике`,
      { attachments: [keyboard1Ep3Q], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_4', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
    await ctx.reply('<b>Проблема 3:</b> Воздух, который нас кормит.', {
      attachments: [images.ep1_5.toJson()],
      format: 'html',
    });
    await delay(2000);
    await ctx.reply(
      '<b>Тюленюся:</b> Мы дышим не только кислородом. Мы дышим тем, что попадает в воздух. Частицы смога оседают на почве и в воде, попадают в растения, а через них — в животных и в нас. Загрязнение воздуха — это не просто проблема "где-то там", это то, что в итоге оказывается в нашей тарелке.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply(
      `<b>Выбор А:</b> Раздать горожанам защитные маски. 
<b>Выбор Б:</b> Инвестировать в общественный транспорт и зелёные зоны, чтобы очистить воздух в источнике`,
      { attachments: [keyboard1Ep3Q], format: 'html' },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_5', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    await ctx.reply(
      '<b>Тюленюся:</b> Экология — это про связи. Нельзя выдернуть один элемент, не задев другие. Здоровье планеты — это не роскошь. <b>Это основа нашей жизни.</b> Опасность — 54%.',
      { format: 'html', attachments: [keyboardStart2Ep] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_6', async ctx => {
  try {
    const userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
    await ctx.reply(
      '<b>Тюленюся:</b> Экология — это про связи. Нельзя выдернуть один элемент, не задев другие. Здоровье планеты — это не роскошь. <b>Это основа нашей жизни.</b> Опасность — 43%.',
      { format: 'html', attachments: [keyboardStart2Ep] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEp2', async ctx => {
  try {
    await ctx.reply('<b>Глава 2. Лицо врага</b>', { format: 'html' });
    await delay(300);
    await ctx.reply(
      'Нексус меркнет, и вы переноситесь в мрачный, напоминающий архив, зал. Стены — это гигантские интерактивные экраны. На них — не схемы, а реальные кадры: горящие леса, моря мусора, пересохшие реки. Воздух наполнен тревожным гулом данных.',
      { attachments: [images.ep2_1.toJson()] },
    );
    await delay(9000);
    await ctx.reply(
      '<b>Тюленюся:</b> Вы увидели, как система должна работать. Это не сценарии фильмов с тёмным будущим, это сводки с полей сражений, которые происходят здесь и сейчас, каждый день. Вот главные угрозы, которые уже разрывают паутину жизни.',
      { format: 'html' },
    );
    await delay(9000);
    await ctx.reply('Перед вами возникают три главных "досье".');
    await delay(3000);
    await ctx.reply('<b>Досье №1: "УДУШЬЕ". Проблема: Загрязнение воздуха и пластиком.</b>', {
      format: 'html',
      attachments: [images.ep2_2.toJson()],
    });
    await delay(3000);
    await ctx.reply(
      'На экране — шокирующие сравнения: мегаполис, окутанный смогом, и тот же город в ясный день. Подводные съёмки глубин, где пластиковые пакеты колышутся вместо водорослей, и птичий желудок, наполненный пластмассовым мусором.',
    );
    await delay(7000);
    await ctx.reply(
      '<b>Тюленюся:</b> Ежегодно около 7 миллионов человек преждевременно умирают из-за загрязнения воздуха. Микропластик обнаружен в крови человека, в грудном молоке, в плаценте нерождённых детей. Он проник в самые отдалённые уголки планеты — от вершин Эвереста до глубин Марианской впадины. Мы едим, пьём и дышим последствиями нашей беспечности. Это медленный, но неумолимый яд.',
      { format: 'html' },
    );
    await delay(15000);
    await ctx.reply('<b>Досье №2: "ЛИХОРАДКА". Проблема: Изменение климата.</b>', {
      format: 'html',
      attachments: [images.ep2_3.toJson()],
    });
    await delay(3000);
    await ctx.reply(
      'Экран показывает таймлапсы: стремительное таяние ледников за последние 50 лет, карту лесных пожаров, полыхающих по всему миру, деревни, затопленные из-за разливов рек.',
    );
    await delay(5000);
    await ctx.reply(
      'Тюленюся: Планета нагревается. Это не "немного более тёплое лето". Это сдвиг климатических поясов. Это учащение экстремальных погодных явлений: засух, уничтожающих урожаи, наводнений, смывающих города, аномальной жары, уносящей жизни. Это кризис продовольствия, воды и климатических беженцев. Это прямая угроза существованию нашей цивилизации в её нынешнем виде.',
      { format: 'html' },
    );
    await delay(15000);
    await ctx.reply('<b>Досье №3: "ТИХИЙ ГОЛОД". Проблема: Истощение ресурсов и биоразнообразия.</b>', {
      format: 'html',
      attachments: [images.ep2_4.toJson()],
    });
    await delay(3000);
    await ctx.reply(
      'Вы видите съёмки обезлесенных территорий, сравнение размеров рыбы, выловленной 100 лет назад и сегодня, графики падения популяций животных.',
    );
    await delay(5000);
    await ctx.reply(
      '<b>Тюленюся:</b> Мы живём так, будто у нас есть вторая планета в запасе. Мы вылавливаем рыбу быстрее, чем она может восстановиться. Вырубаем леса — лёгкие планеты. Уничтожаем среду обитания тысяч видов, вызывая шестое массовое вымирание в истории Земли. Но на этот раз причина — не астероид, а мы. Без биоразнообразия экосистемы теряют устойчивость и рушатся, лишая нас своих "услуг": чистого воздуха, воды, плодородных почв.',
      { format: 'html' },
    );
    await delay(15000);
    await ctx.reply('<b>Задача: Приоритизация угроз.</b>', { format: 'html' });
    await delay(3000);
    await ctx.reply(
      '<b>Тюленюся:</b> "Все три угрозы критичны. Но если бы вам пришлось выбрать одну для срочного доклада мировым лидерам, какую бы вы выделили? Это не вопрос с правильным ответом. Это вопрос стратегии и этики.',
      { format: 'html' },
    );
    await ctx.reply(
      `<b>Выбор 1:</b> "УДУШЬЕ" — это непосредственная и видимая угроза здоровью каждого человека.
<b>Выбор 2:</b> "ЛИХОРАДКА" — это системный кризис, способный обрушить всё.
<b>Выбор 3:</b> "ТИХИЙ ГОЛОД" — это подрыв самого фундамента жизни, последствия которого необратимы.`,
      { format: 'html', attachments: [keyboard2Ep] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise2', async ctx => {
  try {
    await ctx.reply(
      '<b>Тюленюся:</b> Ваш выбор зафиксирован. Запомните это чувство — тяжесть ответственности. В реальном мире такие решения принимаются ежедневно. Игнорирование любой из этих проблем ведёт к коллапсу. Осознание — это первый шаг к исцелению. <b>Опасность — 27%.</b>',
      { format: 'html', attachments: [keyboardStart3Ep] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEp3', async ctx => {
  try {
    await ctx.reply('<b>Глава 3. Арсенал перемен</b>', { format: 'html' });
    await delay(300);
    await ctx.reply(
      'Вы оказываетесь в светлом, просторном и технологичном "Зале Решений". В центре — голографический глобус, на котором вспыхивают точки зелёного света. Каждая точка — это реальный проект, инициатива или действие.',
      { attachments: [images.ep3_1.toJson()] },
    );
    await delay(5000);
    await ctx.reply(
      '<b>Тюленюся, ее голос вновь обретает энергичный и обнадёживающий тон:</b> Вы увидели проблему во всей её сложности. Не падайте духом. Знание — это сила. А теперь — самое главное: инструменты для её решения есть! Самые эффективные изменения начинаются с малого, но, объединяясь, они приобретают колоссальную силу. Давайте составим ваш личный план спасения мира, уровень за уровнем.',
      { format: 'html' },
    );
    await delay(7000);
    await ctx.reply('<b>Уровень 1. Личный арсенал</b>', { format: 'html' });
    await delay(1000);
    await ctx.reply(
      'Тюленюся: Ваша личная сила — в ваших повседневных выборах. Они формируют спрос и посылают сигнал рынку.',
      { format: 'html', attachments: [images.ep3_2.toJson()] },
    );
    await delay(5000);
    await ctx.reply(
      `<b>Выбор А:</b> "Осознанное потребление". Откажитесь от одноразового. Многоразовая кружка, бутылка, сумка-шопер — это не просто тренд, это ваш личный вклад в сокращение 'УДУШЬЯ'.

<b>Выбор Б:</b> "Энергия в ваших руках". "Выключайте свет, не оставляйте гаджеты на зарядке на ночь, выбирайте энергоэффективные приборы. Это ваш удар по 'ЛИХОРАДКЕ'."

<b>Выбор В:</b> "Разумная тарелка". "Сократите потребление мяса, особенно красного. Выращивание скота — один из главных источников парниковых газов и вырубки лесов. Это ваш вклад в борьбу с 'ТИХИМ ГОЛОДОМ'.`,
      { format: 'html', attachments: [keyboard3Ep1Q] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise3_1', async ctx => {
  try {
    await ctx.reply('<b>Уровень 2. Локальный арсенал</b>', { format: 'html' });
    await delay(1000);
    await ctx.reply('<b>Тюленюся:</b> Вы не одиноки. Объединяйтесь! Ваша сила умножается в сообществе.', {
      format: 'html',
      attachments: [images.ep3_3.toJson()],
    });
    await delay(5000);
    await ctx.reply(
      `<b>Выбор А:</b> "Дайте вещам вторую жизнь". Организуйте в своём университете или районе бесплатную ярмарку или книгообмен. Это снижает потребление и отходы.

<b>Выбор Б:</b> "Точка сбора". Инициируйте установку контейнеров для батареек и опасных отходов в вашем общежитии. Одна выброшенная батарейка отравляет 20 квадратных метров земли.

<b>Выбор В:</b> "Эко-лобби". Создайте эко-клуб. Вместе вы сможете продвигать идеи озеленения, велопарковок, раздельного сбора в вашем учебном заведении.`,
      { format: 'html', attachments: [keyboard3Ep2Q] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise3_2', async ctx => {
  try {
    await ctx.reply('<b>Уровень 3. Глобальный арсенал</b>', { format: 'html' });
    await delay(1000);
    await ctx.reply(
      '<b>Тюленюся:</b> Ваше влияние может быть поистине глобальным. Благодаря технологиям, границы стираются.',
      { format: 'html', attachments: [images.ep3_4.toJson()] },
    );
    await delay(5000);
    await ctx.reply(
      `<b>Выбор А:</b> "Профессия со смыслом". Используйте свои навыки — программирование, дизайн, маркетинг — для помощи 'зелёным' стартапам.

<b>Выбор Б:</b> "Станьте голосом". Рассказывайте о своём пути в соцсетях. Ваша искренняя история вдохновит больше людей, чем сухие отчёты.

<b>Выбор В:</b> "VK Добро — твой супер-инструмент". Это не просто сайт. Это портал, где ваше желание помочь встречается с тысячами реальных потребностей. Прямо сейчас, пока мы говорим, там есть десятки эко-проектов, которым нужны ваши руки, ваш ум, ваше время. Можно стать волонтёром в заповеднике. Можно найти локальные акции по уборке леса или посадке деревьев в вашем городе. Ваше желание помочь обретает здесь конкретную цель и мощь коллектива.`,
      { format: 'html', attachments: [keyboard3Ep3Q] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise3_3', async ctx => {
  try {
    await ctx.reply(
      '<b>Тюленюся:</b> Идеальная стратегия сочетает <b>все три уровня</b>. Ваш личный пример вдохновляет соседа. Локальный клуб меняет правила в вашей школе. А участие в таких платформах как VK Добро превращает ребят в сплочённую армию добра, способную менять мир к лучшему в глобальном масштабе.',
      { format: 'html' },
    );
    await delay(5000);
    await ctx.reply(
      '<b>Тюленюся:</b> VK Добро — место, где легко помогать. Уже сейчас ты можешь начать помогать на этом сайте: https://dobro.mail.ru',
      { format: 'html' },
    );
    await delay(5000);
    await ctx.reply(
      '<b>Тюленюся:</b> Запомните: никто не может сделать всё, но каждый может сделать что-то. <b>И вместе мы — сила.</b> Но, кажется, пора возвращаться назад.',
      { format: 'html', attachments: [keyboardFinal] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startFinal', async ctx => {
  try {
    await ctx.reply('<b>Финал. Точка возврата</b>', { format: 'html' });
    const userId = ctx.user.user_id;
    const userScore = score[userId] || 0;
    await ctx.reply('Вы возвращаетесь в лабораторию. Профессор Экоста и Тюленюся анализируют данные.');
    await delay(3000);
    await ctx.reply('<b>Тюленюся:</b> Ваши решения создали новые временные линии. Посмотрим на результаты...', {
      format: 'html',
    });
    await delay(3000);
    if (userScore <= 2) {
      await ctx.reply('Города чище, но экономика в упадке. Социальная напряжённость.', {
        attachments: [images.ep4_1.toJson()],
      });
      await delay(3000);
      await ctx.reply('<b>Тюленюся:</b> Вы спасли планету, но потеряли людей. Устойчивое развитие требует баланса.', {
        format: 'html',
      });
      await delay(6000);
    } else if (userScore >= 3 && userScore <= 4) {
      await ctx.reply(
        'Прогресс есть, но он неравномерен. Богатые страны живут в "зелёных пузырях", бедные тонут в отходах.',
        { attachments: [images.ep4_2.toJson()] },
      );
      await delay(3000);
      await ctx.reply(
        '<b>Тюленюся:</b> Система пытается восстановить баланс, но ваши выборы создали новые разрывы. Вы видели симптомы, но не искали причины. Технологии — это инструмент, а не решение. Без справедливости они создают новый разрыв.',
        { format: 'html' },
      );
      await delay(6000);
    } else if (userScore >= 5 && userScore <= 6) {
      await ctx.reply('Мир становится зелёным и справедливым. Развивается циркулярная экономика, люди осознаннее.', {
        attachments: [images.ep4_3.toJson()],
      });
      await delay(3000);
      await ctx.reply(
        '<b>Тюленюся:</b> Идеальный баланс! Вы действовали как настоящий хранитель Нексуса. Каждое ваше решение укрепляло не одну, а множество нитей одновременно. Сеть жизни стала прочнее благодаря вашему мудрому выбору. Так и должно быть - мы часть системы, а не её хозяева.',
        { format: 'html' },
      );
      await delay(6000);
    }
    await ctx.reply(
      '<b>Тюленюся, подводя итог:</b> Экология — это про связи. Нельзя выдернуть один элемент, не задев другие. Здоровье планеты — это не роскошь. Это основа нашей жизни.',
      { format: 'html' },
    );
    await delay(5000);
    await ctx.reply(
      '<b>Профессор Экоста:</b> Поздравляю. Теперь вы видите всю картину. Одно решение влечёт за собой десятки последствий. <b>Запомните этот урок.</b>',
      { format: 'html', attachments: [keyboardEpilog] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEpilog', async ctx => {
  try {
    await ctx.reply('<b>Эпилог. Ваша миссия</b>', { format: 'html' });
    await delay(1000);
    await ctx.reply('Вы выходите из лаборатории. Всё как прежде. Но на ваш телефон приходит сообщение.');
    await delay(5000);
    await ctx.reply(
      `<b>Тюленюся:</b> Миссия в будущем завершена. Но ваша миссия в настоящем только началась. Основываясь на ваших действиях, я подготовила для вас персональный план по спасению мира:
1.  Присоединиться к инициативной группе по велопрокату.
2.  Организовать пункт сбора старой электроники в школе.
3.  Провести воркшоп по апсайклингу для одноклассников.
Готовы принять вызов?`,
      { format: 'html', attachments: [keyboardEnd, images.final.toJson()] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('End', async ctx => {
  try {
    await ctx.reply(
      'Приключения Профессора Экосты и Тюлениси подошли к концу. Используй полученные знания в будущем и делай добрые дела!',
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.on('bot_started', async ctx => {
  try {
    await ctx.reply(
      'Вы получаете email от загадочного профессора Экоста: "Ваши работы по биологии впечатлили меня. Приходите сегодня в 18:00 в лабораторию №5. Покажу нечто... выходящее за рамки"',
      { attachments: [keyboardStart, images.start.toJson()] },
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.start();
