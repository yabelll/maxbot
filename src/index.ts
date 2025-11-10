import { Bot, Keyboard } from '@maxhub/max-bot-api';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not provided');
const bot = new Bot(token);

const score: Record<number, number> = {};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadImageWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await bot.api.uploadImage({ url });
    } catch (error) {
      console.log('Error: ', error);
      if (i === retries - 1) throw error;
      await delay(2000 * (i + 1));
    }
  }
}

const images = await (async () => {
  try {
    return {
      start: await uploadImageWithRetry('https://i.yapx.ru/cGjUH.jpg'),
      prolog: await uploadImageWithRetry('https://i.yapx.ru/cGaQu.png'),
      ep1_1: await uploadImageWithRetry('https://i.yapx.ru/cGaVk.png'),
      ep1_2: await uploadImageWithRetry('https://i.yapx.ru/cGac7.png'),
      ep1_3: await uploadImageWithRetry('https://i.yapx.ru/cGarM.png'),
      ep1_4: await uploadImageWithRetry('https://i.yapx.ru/cGaiR.png'),
      ep1_5: await uploadImageWithRetry('https://i.yapx.ru/cGaoq.png'),
      ep2_1: await uploadImageWithRetry('https://i.yapx.ru/cHCkE.png'),
      ep2_2: await uploadImageWithRetry('https://i.yapx.ru/cHCke.png'),
      ep2_3: await uploadImageWithRetry('https://i.yapx.ru/cHCky.png'),
      ep2_4: await uploadImageWithRetry('https://i.yapx.ru/cHCk9.png'),
    };
  } catch (error) {
    console.error('Error: ', error);
    process.exit(1);
  }
})();

process.on('unhandledRejection', (error) => {
  console.log('Error', error);
});

process.on('uncaughtException', (error) => {
  console.log('Error:', error);
});

const keyboardStart = Keyboard.inlineKeyboard([
  [
     Keyboard.button.callback('Проверить, что это такое.', 'startEp'),
  ]
])

const keyboardStart1Ep = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Поехали!', 'startEp1'),
  ]
])

const keyboardStart2Ep = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Давай продолжим!', 'startEp2'),
  ]
])

const keyboard0Ep = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise0_1'),
    Keyboard.button.callback('Выбор Б', 'choise0_2'),
  ], 
]);

const keyboard1Ep1Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise1_1'),
    Keyboard.button.callback('Выбор Б', 'choise1_2'),
  ], 
]);

const keyboard1Ep2Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise1_3'),
    Keyboard.button.callback('Выбор Б', 'choise1_4'),
  ], 
]);

const keyboard1Ep3Q = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise1_5'),
    Keyboard.button.callback('Выбор Б', 'choise1_6'),
  ], 
]);

const keyboard2Ep = Keyboard.inlineKeyboard([
  [
    Keyboard.button.callback('Выбор А', 'choise2'),
    Keyboard.button.callback('Выбор Б', 'choise2'),
    Keyboard.button.callback('Выбор В', 'choise2'),
  ], 
]);

bot.action('startEp', async (ctx) => {
  try {
    await ctx.reply('В лаборатории вас встречает профессор и его ассистент — <b>Тюленюся</b>',
      { format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Профессор Экоста:</b> Рад, что вы пришли! Тюленюся зафиксировала аномалии в пространственно-временном континууме, вызванные экологическими проблемами. Мы можем отправить вас в "горячие точки" будущего, чтобы исправить ошибки настоящего. <b>Готовы?<b>',
      { format: 'html' }
    );
    await delay(5000)
    await ctx.reply(`<b>Выбор А:</b> Это опасно?
<b>Выбор Б:</b> Конечно, я в деле!`,
      { attachments: [keyboard0Ep], format: 'html' }
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise0_1', async (ctx) => {
  try {
    await ctx.reply('В целом это безопасно. <b>Опасность — 73%.</b> Ваши решения будут влиять на исход миссии. <b>Начинаем телепортацию!</b>', 
      { attachments: [keyboardStart1Ep, images.prolog.toJson()], format: 'html' }
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise0_2', async (ctx) => {
  try {
    await ctx.reply('В целом это безопасно. <b>Опасность — 73%.</b> Ваши решения будут влиять на исход миссии. <b>Начинаем телепортацию!</b>', 
      { attachments: [keyboardStart1Ep, images.prolog.toJson()], format: 'html' }
    );
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEp1', async (ctx) => {
  try {
    await ctx.reply('<b>Глава 1. Нексус жизни</b>',
      { format: 'html' }
    )
    await delay(300)
    await ctx.reply('Вы появляетесь не в привычном пространстве, а внутри огромной, сложной и светящейся структуры, напоминающей паутину. От каждой точки исходят сотни нитей к другим точкам.', 
      { attachments: [images.ep1_1.toJson()] }
    );
    await delay(7000)
    await ctx.reply(`<b>Тюленюся:</b> Добро пожаловать в <b>Нексус Жизни</b> — визуальное воплощение принципов экологии. Это не просто город. Это модель нашего мира, где всё связано невидимыми нитями. 
Экология — это не просто скучный предмет, это наука о нашем общем доме и о том, как все его жители, включая нас, зависят друг от друга.`,
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply('Вы медленно парите в этой паутине света. Одни нити горят ровным ярким светом, другие мерцают, как лампочки на исходе, а третьи и вовсе оборваны, и от них остались лишь угасающие искры.')
    await delay(6000)
    await ctx.reply('<b>Тюленюся:</b> Посмотрите на эту нить. От этих нитей тянутся сотни связей ко всем живым существам, которые объединены в единую экосистему.',
      { format: 'html' }
    )
    await delay(5000)
    await ctx.reply('Она касается нити, и та вспыхивает. Вы видите краткое видение: бескрайние поля, луга, процветающие города и леса. Затем она ослабляет хватку, и нить гаснет. Видение сменяется: леса вырублены, поля бесплодны, прилавки магазинов пустеют.',
      { attachments: [images.ep1_2.toJson()] }
    );
    await delay(6000)
    await ctx.reply('<b>Тюленюся:</b> И это лишь одна нить. А теперь посмотрите, с чем она связана.',
      { format: 'html' }
    )
    await delay(4000)
    await ctx.reply('<b>Вам предстоит стабилизировать систему, столкнувшись с тремя проблемами экологии.</b>',
      { format: 'html' }
    )
    await delay(5000)
    await ctx.reply('<b>Проблема 1:</b> Мусорный коллапс',
      { attachments: [images.ep1_3.toJson()], format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Тюленюся:</b> Это не просто проблема неприятного запаха или испорченного пейзажа. Мусор на свалке — это бомба замедленного действия. Токсичные вещества просачиваются в грунтовые воды, отравляя питьевые источники. Пластиковый мусор, попадая в реки и моря, убивает их обитателей. Это не локальная проблема — это угроза для целых экосистем.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply(`<b>Выбор А:</b> Построить мусоросжигательный завод без фильтров. 
<b>Выбор Б:</b> Внедрить систему раздельного сбора и глубокой переработки отходов.`, 
      { attachments: [keyboard1Ep1Q], format: 'html'  }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_1', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    await ctx.reply('<b>Проблема 2:</b> Проблема реки',
      { attachments: [images.ep1_4.toJson()], format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Тюленюся:</b> Отравленная вода убивает речных обитателей. Но на этом последствия не заканчиваются. Животные, которые питались рыбой, гибнут. На полях, которые орошались из реки, накапливаются токсины. Яд попадает в питьевую воду десятков городов ниже по течению.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply(`<b>Выбор А:</b> Поставить мощные фильтры на заводе. 
<b>Выбор Б:</b> Перепрофилировать завод на "зелёные" технологии.`, 
      { attachments: [keyboard1Ep2Q], format: 'html'  }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_2', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
    await ctx.reply('<b>Проблема 2:</b> Проблема реки',
      { attachments: [images.ep1_4.toJson()], format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Тюленюся:</b> Отравленная вода убивает речных обитателей. Но на этом последствия не заканчиваются. Животные, которые питались рыбой, гибнут. На полях, которые орошались из реки, накапливаются токсины. Яд попадает в питьевую воду десятков городов ниже по течению.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply(`<b>Выбор А:</b> Поставить мощные фильтры на заводе. 
<b>Выбор Б:</b> Перепрофилировать завод на "зелёные" технологии.`, 
      { attachments: [keyboard1Ep2Q], format: 'html'  }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_3', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    await ctx.reply('<b>Проблема 3:</b> Воздух, который нас кормит.',
      { attachments: [images.ep1_5.toJson()], format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Тюленюся:</b> Мы дышим не только кислородом. Мы дышим тем, что попадает в воздух. Частицы смога оседают на почве и в воде, попадают в растения, а через них — в животных и в нас. Загрязнение воздуха — это не просто проблема "где-то там", это то, что в итоге оказывается в нашей тарелке.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply(`<b>Выбор А:</b> Раздать горожанам защитные маски. 
<b>Выбор Б:</b> Инвестировать в общественный транспорт и зелёные зоны, чтобы очистить воздух в источнике`, 
      { attachments: [keyboard1Ep3Q], format: 'html' }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_4', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
    await ctx.reply('<b>Проблема 3:</b> Воздух, который нас кормит.',
      { attachments: [images.ep1_5.toJson()], format: 'html' }
    )
    await delay(2000)
    await ctx.reply('<b>Тюленюся:</b> Мы дышим не только кислородом. Мы дышим тем, что попадает в воздух. Частицы смога оседают на почве и в воде, попадают в растения, а через них — в животных и в нас. Загрязнение воздуха — это не просто проблема "где-то там", это то, что в итоге оказывается в нашей тарелке.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply(`<b>Выбор А:</b> Раздать горожанам защитные маски. 
<b>Выбор Б:</b> Инвестировать в общественный транспорт и зелёные зоны, чтобы очистить воздух в источнике`, 
      { attachments: [keyboard1Ep3Q], format: 'html' }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_5', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 1;
    if (score[userId] <= 4) {
      await ctx.reply('<b>Тюленюся:</b> Система пытается восстановить баланс, но ваши выборы создали новые разрывы. Вы видели симптомы, но не искали причины. Помните: в паутине жизни нельзя потянуть за одну нить, не задев остальные. Каждое решение должно учитывать все связи. <b>Опасность — 54%.</b>',
        { format: 'html' }
    ) 
    } else if (score[userId] >= 5) {
      await ctx.reply('<b>Тюленюся:</b> Идеальный баланс! Вы действовали как настоящий хранитель Нексуса. Каждое ваше решение укрепляло не одну, а множество нитей одновременно. Сеть жизни стала прочнее благодаря вашему мудрому выбору. Так и должно быть - мы часть системы, а не её хозяева. <b>Опасность — 43%.</b>',
        { format: 'html' }
    ) 
    }
    await delay(4000)
    await ctx.reply('<b>Тюленюся:</b> Экология — это про связи. Нельзя выдернуть один элемент, не задев другие. Здоровье планеты — это не роскошь. <b>Это основа нашей жизни.</b>',
      { format: 'html', attachments: [keyboardStart2Ep] }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise1_6', async (ctx) => {
  try {
    let userId = ctx.user.user_id;
    score[userId] = (score[userId] || 0) + 2;
        if (score[userId] <= 4) {
      await ctx.reply('<b>Тюленюся:</b> Система пытается восстановить баланс, но ваши выборы создали новые разрывы. Вы видели симптомы, но не искали причины. Помните: в паутине жизни нельзя потянуть за одну нить, не задев остальные. Каждое решение должно учитывать все связи. <b>Опасность — 54%.</b>',
        { format: 'html' }
    ) 
    } else if (score[userId] >= 5) {
      await ctx.reply('<b>Тюленюся:</b> Идеальный баланс! Вы действовали как настоящий хранитель Нексуса. Каждое ваше решение укрепляло не одну, а множество нитей одновременно. Сеть жизни стала прочнее благодаря вашему мудрому выбору. Так и должно быть - мы часть системы, а не её хозяева. <b>Опасность — 43%.</b>',
        { format: 'html' }
    ) 
    }
    await delay(4000)
    await ctx.reply('<b>Тюленюся:</b> Экология — это про связи. Нельзя выдернуть один элемент, не задев другие. Здоровье планеты — это не роскошь. <b>Это основа нашей жизни.</b>',
      { format: 'html', attachments: [keyboardStart2Ep] }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('startEp2', async (ctx) => {
  try {
    await ctx.reply('<b>Глава 2. Лицо врага</b>',
      { format: 'html' }
    )
    await delay(300)
    await ctx.reply('Нексус меркнет, и вы переноситесь в мрачный, напоминающий архив, зал. Стены — это гигантские интерактивные экраны. На них — не схемы, а реальные кадры: горящие леса, моря мусора, пересохшие реки. Воздух наполнен тревожным гулом данных.',
      { attachments: [images.ep2_1.toJson()] }
    )
    await delay(9000)
    await ctx.reply('<b>Тюленюся:</b> Вы увидели, как система должна работать. Это не сценарии фильмов с тёмным будущим, это сводки с полей сражений, которые происходят здесь и сейчас, каждый день. Вот главные угрозы, которые уже разрывают паутину жизни.',
      { format: 'html' }
    )
    await delay(9000)
    await ctx.reply('Перед вами возникают три главных "досье".')
    await delay(3000)
    await ctx.reply('<b>Досье №1: "УДУШЬЕ". Проблема: Загрязнение воздуха и пластиком.</b>',
      { format: 'html', attachments: [images.ep2_2.toJson()] }
    )
    await delay(3000)
    await ctx.reply('На экране — шокирующие сравнения: мегаполис, окутанный смогом, и тот же город в ясный день. Подводные съёмки глубин, где пластиковые пакеты колышутся вместо водорослей, и птичий желудок, наполненный пластмассовым мусором.')
    await delay(7000)
    await ctx.reply('<b>Тюленюся:</b> Ежегодно около 7 миллионов человек преждевременно умирают из-за загрязнения воздуха. Микропластик обнаружен в крови человека, в грудном молоке, в плаценте нерождённых детей. Он проник в самые отдалённые уголки планеты — от вершин Эвереста до глубин Марианской впадины. Мы едим, пьём и дышим последствиями нашей беспечности. Это медленный, но неумолимый яд.',
      { format: 'html' }
    )
    await delay(15000)
    await ctx.reply('<b>Досье №2: "ЛИХОРАДКА". Проблема: Изменение климата.</b>',
      { format: 'html', attachments: [images.ep2_3.toJson()] }
    )
    await delay(3000)
    await ctx.reply('Экран показывает таймлапсы: стремительное таяние ледников за последние 50 лет, карту лесных пожаров, полыхающих по всему миру, деревни, затопленные из-за разливов рек.')
    await delay(5000)
    await ctx.reply('Тюленюся: Планета нагревается. Это не "немного более тёплое лето". Это сдвиг климатических поясов. Это учащение экстремальных погодных явлений: засух, уничтожающих урожаи, наводнений, смывающих города, аномальной жары, уносящей жизни. Это кризис продовольствия, воды и климатических беженцев. Это прямая угроза существованию нашей цивилизации в её нынешнем виде.', 
      { format: 'html' }
    )
    await delay(15000)
    await ctx.reply('<b>Досье №3: "ТИХИЙ ГОЛОД". Проблема: Истощение ресурсов и биоразнообразия.</b>',
      { format: 'html', attachments: [images.ep2_4.toJson()] }
    )
    await delay(3000)
    await ctx.reply('Вы видите съёмки обезлесенных территорий, сравнение размеров рыбы, выловленной 100 лет назад и сегодня, графики падения популяций животных.')
    await delay(5000)
    await ctx.reply('<b>Тюленюся:</b> Мы живём так, будто у нас есть вторая планета в запасе. Мы вылавливаем рыбу быстрее, чем она может восстановиться. Вырубаем леса — лёгкие планеты. Уничтожаем среду обитания тысяч видов, вызывая шестое массовое вымирание в истории Земли. Но на этот раз причина — не астероид, а мы. Без биоразнообразия экосистемы теряют устойчивость и рушатся, лишая нас своих "услуг": чистого воздуха, воды, плодородных почв.',
      { format: 'html' }
    )
    await delay(15000)
    await ctx.reply('<b>Задача: Приоритизация угроз.</b>',
      { format: 'html' }
    )
    await delay(3000)
    await ctx.reply('<b>Тюленюся:</b> "Все три угрозы критичны. Но если бы вам пришлось выбрать одну для срочного доклада мировым лидерам, какую бы вы выделили? Это не вопрос с правильным ответом. Это вопрос стратегии и этики.',
      { format: 'html' }
    )
    await ctx.reply(`<b>Выбор 1:</b> "УДУШЬЕ" — это непосредственная и видимая угроза здоровью каждого человека.
<b>Выбор 2:</b> "ЛИХОРАДКА" — это системный кризис, способный обрушить всё.
<b>Выбор 3:</b> "ТИХИЙ ГОЛОД" — это подрыв самого фундамента жизни, последствия которого необратимы.`, 
{ format: 'html', attachments: [keyboard2Ep] }
);
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.action('choise2', async (ctx) => {
  try {
    await ctx.reply('<b>Тюленюся:</b> Ваш выбор зафиксирован. Запомните это чувство — тяжесть ответственности. В реальном мире такие решения принимаются ежедневно. Игнорирование любой из этих проблем ведёт к коллапсу. Осознание — это первый шаг к исцелению. <b>Опасность — 27%.</b>',
      { format: 'html' }
    )
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
})

bot.on('bot_started', async (ctx) => {
  try {
    await ctx.reply('Вы получаете email от загадочного профессора Экоста: "Ваши работы по биологии впечатлили меня. Приходите сегодня в 18:00 в лабораторию №5. Покажу нечто... выходящее за рамки"', 
      { attachments: [keyboardStart, images.start.toJson()] });
  } catch (error: any) {
    if (error.status === 403) {
      console.log('Пользователь заблокирован');
      return;
    }
    console.log('Другая ошибка:', error.message);
  }
});

bot.start();