/**
 * returns full hebrew date.
 * pass any of these as arguments in the order you want "day", "parsha", "date", "month", "year", "yearAbbr".
 * you can also pass any symbol to be added
 * @param {date} input The date to get.
 * @return The hebrew date.
 * @customfunction
 */

function HEB_DATE(date) {
    dateP = new Date(date);
    year = dateP.getFullYear();
    month = dateP.getMonth();
    day = dateP.getDate()
    let weekDay = dateP.getDay();

    let resp = UrlFetchApp.fetch(`https://www.hebcal.com/converter/?cfg=json&gy=${year}&gm=${month + 1}&gd=${day}&g2h=1`);
    let json = resp.getContentText();;
    let data = JSON.parse(json);

    delete arguments[0];
    order = arguments
    let ready = mf(data, weekDay);
    if (ready == "") {
        throw new Error(
            'Please add at least one argument except the date'
        );

    }
    return ready
}
function mf(data, weekDay) {
    let hebrew = data.hebrew;
    let hebDay = hebrew.substr(0, hebrew.indexOf(" "))
    let hebMonth=months[data.hm];
    let hebYear = hebrew.substring(hebrew.lastIndexOf(" ") + 1)
    let hebYearAbbr = hebrew.substring(hebrew.lastIndexOf(" ") + 3)
    if (hebYearAbbr.length == 2) {
        hebYearAbbr = hebYearAbbr.substr(1) + "'"
    }

    let hebWeekDay = hebDays[weekDay];
    let hebParsha
    if (data.hasOwnProperty('events') && parshas.hasOwnProperty(data.events[0].substring(data.events[0].indexOf(" ") + 1))) {
        let exists = false
        hebParsha = parshas[data.events[0].substring(data.events[0].indexOf(" ") + 1)]
    } else {
        hebParsha = ""
    }

    let obj = {
        day: hebWeekDay,
        parsha: hebParsha,
        date: hebDay,
        month: hebMonth,
        year: hebYear,
        yearAbbr: hebYearAbbr
    }
    Logger.log(order)
    let output = ""
    for (i = 1; i <= Object.keys(order).length; i++) {
        if (obj.hasOwnProperty(order[i])) output += obj[order[i]] + " ";
        else output += order[i] + " "
    }
    return output
}
let order;
let months = {
    "Tishrei": "תשרי",
    "Cheshvan": "חשון",
    "Kislev": "כסלו",
    "Tevet": "טבת",
    "Sh'vat": "שבט",
    "Adar": "אדר",
    "Adar II": "אדר ב '",
    "Nisan": "ניסן",
    "Iyyar": "אייר",
    "Sivan": "סיון",
    "Tamuz": "תמוז",
    "Av": "אב",
    "Elul": "אלול",
    "Adar I": "אדר א '",
}
let hebDays = ["א", "ב", "ג", "ד", "ה", "ו", "ז",];

let parshas = {
    "Bereshit": "בראשית",
    "Noach": "נח",
    "Lech-Lecha": "לך",
    "Vayera": "וירא",
    "Chayei Sara": "חיי שרה",
    "Toldot": "תולדות",
    "Vayetzei": "ויצא",
    "Vayishlach": "וישלח",
    "Vayeshev": "וישב",
    "Miketz": "מקץ",
    "Vayigash": "ויגש",
    "Vayechi": "ויחי",
    "Shemot": "שמות",
    "Vaera": "וארא",
    "Bo": "בא",
    "Beshalach": "בשלח",
    "Yitro": "יתרו",
    "Mishpatim": "משפטים",
    "Terumah": "תרומה",
    "Tetzaveh": "תצוה",
    "Ki Tisa": "כי תשא",
    "Vayakhel": "ויקהל",
    "Pekudei": "פקודי",
    "Vayikra": "ויקרא",
    "Tzav": "צו",
    "Shmini": "שמיני",
    "Tazria": "תזריע",
    "Metzora": "מצורע",
    "Achrei Mot": "אחרי",
    "Kedoshim": "קדושים",
    "Emor": "אמור",
    "Behar": "בהר",
    "Bechukotai": "בחוקותי",
    "Bamidbar": "במדבר",
    "Nasso": "נשא",
    "Beha'alotcha": "בהעלותך",
    "Sh'lach": "שלח",
    "Korach": "קרח",
    "Chukat": "חקת",
    "Balak": "בלק",
    "Pinchas": "פנחס",
    "Matot": "מטות",
    "Masei": "מסעי",
    "Devarim": "דברים",
    "Vaetchanan": "ואתחנן",
    "Eikev": "עקב",
    "Re'eh": "ראה",
    "Shoftim": "שופטים",
    "Ki Teitzei": "תצא",
    "Ki Tavo": "תבוא",
    "Nitzavim": "נצבים",
    "Vayeilech": "וילך",
    "Ha'Azinu": "האזינו",
    "Vezot Haberakhah": "וזאת הברכה",
    "Vayakhel-Pekudei": "ויק\"פ",
    "Tazria-Metzora": "תזו\"מ",
    "Achrei Mot-Kedoshim": "אח\"ק",
    "Behar-Bechukotai": "בה\"ב",
    "Chukat-Balak": "חק\"ב",
    "Matot-Masei": "מטו\"מ",
    "Nitzavim-Vayeilech": "נצו\"י"
}