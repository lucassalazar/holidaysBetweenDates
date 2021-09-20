const easterDay = (y) => {
    let c = Math.floor(y / 100);
    let n = y - 19 * Math.floor(y / 19);
    let k = Math.floor((c - 17) / 25);
    let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
    i = i - 30 * Math.floor((i / 30));
    i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
    let j = y + Math.floor(y / 4) + i + 2 - c + Math.floor(c / 4);
    j = j - 7 * Math.floor(j / 7);
    let l = i - j;
    let m = 3 + Math.floor((l + 40) / 44);
    let d = l + 28 - 31 * Math.floor(m / 4);
    return moment([y, (m - 1), d]);
};

const getHolidaysBr = (y) => {
    const anoNovo = moment("01/01/"+y,"DD/MM/YYYY");
    const carnaval1 = easterDay(y).add(-48, "d");
    const carnaval2 = easterDay(y).add(-47, "d");
    const paixaoCristo = easterDay(y).add(-2, "d");
    const pascoa = easterDay(y);
    const tiradentes = moment("21/04/"+y,"DD/MM/YYYY");
    const corpusChristi =  easterDay(y).add(60, "d");
    const diaTrabalho = moment("01/05/"+y,"DD/MM/YYYY");
    const diaIndependencia = moment("07/09/"+y,"DD/MM/YYYY");
    const nossaSenhora = moment("12/10/"+y,"DD/MM/YYYY");
    const finados = moment("02/11/"+y,"DD/MM/YYYY");
    const proclamaRepublica = moment("15/11/"+y,"DD/MM/YYYY");
    const natal = moment("25/12/"+y,"DD/MM/YYYY");
    return [
        {m: anoNovo, dia: "Ano Novo", d: anoNovo.format("YYYY-MM-DD") },
        {m: carnaval1, dia: "Carnaval", d: carnaval1.format("YYYY-MM-DD") },
        {m: carnaval2, dia: "Carnaval", d: carnaval2.format("YYYY-MM-DD") },
        {m: paixaoCristo, dia: "Paix\u00E3o de Cristo", d: paixaoCristo.format("YYYY-MM-DD") },
        {m: pascoa, dia: "P\u00E1scoa", d: pascoa.format("YYYY-MM-DD") },
        {m: tiradentes, dia: "Tiradentes", d: tiradentes.format("YYYY-MM-DD") },
        {m: corpusChristi, dia: "Corpus Christi", d: corpusChristi.format("YYYY-MM-DD") },
        {m: diaTrabalho, dia: "Dia do Trabalho", d: diaTrabalho.format("YYYY-MM-DD") },
        {m: diaIndependencia, dia: "Dia da Independ\u00EAncia do Brasil", d: diaIndependencia.format("YYYY-MM-DD") },
        {m: nossaSenhora, dia: "Nossa Senhora Aparecida", d: nossaSenhora.format("YYYY-MM-DD") },
        {m: finados, dia: "Finados", d: finados.format("YYYY-MM-DD") },
        {m: proclamaRepublica, dia: "Proclama\u00E7\u00E3o da Rep\u00FAblica", d: proclamaRepublica.format("YYYY-MM-DD") },
        {m: natal, dia: "Natal", d: natal.format("YYYY-MM-DD") }
    ];
}

const getAllHolidaysBetweenDates = (date, dateTo) => {
    const dateStart = date;
    const dateEnd = dateTo;

    let holidays = [];

    if(dateStart.getFullYear() !== dateEnd.getFullYear()) {
        holidays = new Set([
            ...getHolidaysBr(dateStart.getFullYear()).map(obj => obj),
            ...getHolidaysBr(dateEnd.getFullYear()).map(obj => obj),
        ]);
    } else {
        holidays = [...getHolidaysBr(dateStart.getFullYear()).filter(obj => {
            return moment(obj.d).isBetween(dateStart, dateEnd); 
        })];
    }

    return holidays;
}

const init = () => {
    const dates = document.querySelectorAll('input');
    const list = document.querySelector('[holiday-list]');
    list.innerHTML = '';

    let initial = dates[0].value.split('-');
    let final = dates[1].value.split('-');

    initial = new Date(`${initial[1]}-${initial[2]}-${initial[0]}`);
    final = new Date(`${final[1]}-${final[2]}-${final[0]}`);

    const holidays = getAllHolidaysBetweenDates(initial, final);
    console.log(holidays);

    holidays.forEach(holiday => {
        const li = document.createElement('li');
        li.innerHTML = holiday.d + ' - ' + holiday.dia;
        list.append(li);
    });
}




