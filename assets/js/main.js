Vue.config.devtools = true;
var app = new Vue({
    el: '#root',
    data: {
        prodotti: [],
        coefficienti: [],
        section: '',
        coefficienti_prodotti: [],
        form: {
            productSelected: {},
            name: '',
            monthSelected: '',
            coefficient: null,
            monthlyFee: null,
            totalFee: null,
            securityDeposit: null,
            salesAgent: 'Caio Semproni',
            acceptance: null,
        },
        confirmation: '',
        counted: false,
        categorie: [],
        categoriesSelected: [],
        years: [],
        yearChosen: '',
        preventiviByYear: [],
        valoreChosen: '',
        months: [
            'Gennaio',
            'Febbraio',
            'Marzo',
            'Aprile',
            'Maggio',
            'Giugno',
            'Luglio',
            'Agosto',
            'Settembre',
            'Ottobre',
            'Novembre',
            'Dicembre',
        ],
        canoniTotali: [],
        startArray: [],
        perMeseTotali: [],
        perMeseAccettati: [],
        perMeseRifiutati: [],
        annoTotAccettati: null,
        annoTotRifiutati: null,
        update: false,
        filtro: false,
    },
    mounted() {
        this.apiGet('prodotti');
        this.apiGet('coefficienti');
        this.apiGet('coefficienti_prodotti');
    },
    // watch:{
    //     chartData: function(newSi, oldSi, newNo, oldNo){

    // },
    methods: {
        home: function(){
            this.section = '';
            if (this.update) {
                
                myChart.destroy();
                this.yearChosen = '';
                this.update = false;
            }
        },
        fakeData: function () {

            for (let i = 0; i < 200; i++) {

                let info = faker.helpers.createCard();

                let { name } = info;

                let bool = [0, 1];

                var now = dayjs();

                var fakerData = 0;

                fakerData = faker.date.past(3, now);

                // console.log(now);

                fakerData = dayjs(fakerData).format('YYYY-MM-DD HH:mm:ss');

                // console.log(fakerData);

                //  return

                axios({
                    method: 'post',
                    url: window.location.origin + '/fastrent/db/api.php',
                    params: {
                        tableChosen: 'coefficienti_prodotti',
                        method: 'store',
                        coefficienti_id: this.random_item(this.coefficienti).id,
                        prodotti_id: this.random_item(this.prodotti).id,
                        cliente: name,
                        agente: this.form.salesAgent,
                        accettazione: this.random_item(bool),
                        fakeDate: fakerData,
                    },
                })
                    .then((res) => {
                        if (res) {
                            console.log(res.data);
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }



        },
        random_item: function (items) {
            return items[Math.floor(Math.random() * items.length)];
        },
        carica: function () {

            const data = {
                labels: this.months,
                datasets: [
                    {
                        label: 'Totale preventivi Accettati x mese',
                        backgroundColor: '#3e9920',
                        borderColor: '#3e9920',
                        data: this.perMeseAccettati,
                    },
                    {
                        label: 'Totale preventivi Rifiutati x mese',
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: this.perMeseRifiutati,
                    },

                ],

            };


            const config = {
                type: 'line',
                data,
                options: {
                    responsive: true,
                    parsing: {
                        xAxisKey: 'month',
                        yAxisKey: 'totale'
                    }
                }
            };
            //  copia


            // copia

            console.log(this.update);


            if (this.update) {
                myChart.data.datasets[0].data = [];
                myChart.data.datasets[1].data = [];
                myChart.update();

                myChart.data.datasets[0].data = this.perMeseAccettati;
                myChart.data.datasets[1].data = this.perMeseRifiutati;
                myChart.update();
            } else {

                myChart = new Chart(
                    document.getElementById('myChart'),
                    {
                        type: 'line',
                        data: {
                            labels: this.months,
                            datasets: [
                                {
                                    label: 'Totale preventivi Accettati x mese',
                                    backgroundColor: '#3e9920',
                                    borderColor: '#3e9920',
                                    data: this.perMeseAccettati,
                                },
                                {
                                    label: 'Totale preventivi Rifiutati x mese',
                                    backgroundColor: 'red',
                                    borderColor: 'red',
                                    data: this.perMeseRifiutati,
                                },

                            ],

                        },
                        options: {
                            responsive: true,
                            parsing: {
                                xAxisKey: 'month',
                                yAxisKey: 'totale'
                            }
                        }
                    },
                );

                this.update = true;
            }







        },
        groupBy: function (objectArray, property) {
            return objectArray.reduce(function (acc, obj) {
                let key = obj[property]
                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(obj)
                return acc
            }, {})

        },
        chooseYear: function (year) {

            this.yearChosen = year;

            this.loadChart();

        },
        loadChart: function () {


            console.log(this.yearChosen);

            this.preventiviByYear = this.coefficienti_prodotti.filter(obj => obj.year == this.yearChosen);



            let preventiviByYearBMonth = this.groupBy(this.preventiviByYear, 'month');




            var annoTot = 0;
            for (const key in preventiviByYearBMonth) {
                var totale = 0;
                preventiviByYearBMonth[key].forEach(item => {
                    if (item.accettazione) {
                        totale = totale + item.canoneTotale;
                    }
                })
                let obj = {
                    month: key,
                    totale: Number(totale.toFixed(2)),
                };

                annoTot += obj.totale;

                this.perMeseAccettati.push(obj);
            }

            this.annoTotAccettati = annoTot;


            var annoTot = 0;
            for (const key in preventiviByYearBMonth) {
                var totale = 0;
                preventiviByYearBMonth[key].forEach(item => {
                    if (!item.accettazione) {
                        totale = totale + item.canoneTotale;
                    }
                })
                let obj = {
                    month: key,
                    totale: Number(totale.toFixed(2)),
                };

                annoTot += obj.totale;


                this.perMeseRifiutati.push(obj);
            }
            this.annoTotRifiutati = annoTot;



            var appoggio = [];
            this.months.forEach((mese, i) => {
                let index = this.perMeseAccettati.findIndex(prev => prev.month == mese);
                //  console.log(index);

                let obj = {};

                if (index < 0) {
                    obj = {
                        month: mese,
                        totale: 0,
                        monthNr: i + 1,
                    }
                } else {
                    obj = {
                        month: mese,
                        totale: this.perMeseAccettati[index].totale,
                        monthNr: i + 1,
                    }
                }

                appoggio.push(obj);
            });
            this.perMeseAccettati = appoggio;



            var appoggio = [];
            this.months.forEach((mese, i) => {
                let index = this.perMeseRifiutati.findIndex(prev => prev.month == mese);
                //  console.log(index);

                let obj = {};

                if (index < 0) {
                    obj = {
                        month: mese,
                        totale: 0,
                        monthNr: i + 1,
                    }
                } else {
                    obj = {
                        month: mese,
                        totale: this.perMeseRifiutati[index].totale,
                        monthNr: i + 1,
                    }
                }

                appoggio.push(obj);
            });
            this.perMeseRifiutati = appoggio;

            // this.labels = this.months;

            if (this.yearChosen) {
                const actions = [
                    {
                        name: 'Change Data',
                        henler(myChart) {
                            myChart.update();
                        }
                    }
                ]
            }

            this.carica();


        },
        dashboard: function () {
            this.section = 'dash';
        },
        back: function (section) {
            this.section = section;
            this.counted = false;
        },
        calculate: function () {
            this.coefficienti.forEach(element => {
                if (element.Mesi === this.form.monthSelected) {
                    this.form.coefficient = element.Coefficiente;
                };
            });
            this.form.monthlyFee = this.form.productSelected.Prezzo * 1.3 * this.form.coefficient / 100;

            this.form.totalFee = this.form.monthlyFee * this.form.monthSelected;

            this.form.securityDeposit = this.form.totalFee * 10 / 100;

            this.counted = true;
        },
        goOn: function (action, tableChosen) {
            switch (action) {
                case 'cancel':
                    this.section = '';
                    this.form = {
                        productSelected: {},
                        customer: '',
                        monthSelected: '',
                        coefficient: null,
                        monthlyFee: null,
                        totalFee: null,
                        securityDeposit: null,
                        salesAgent: this.salesAgent,
                        acceptance: null,

                    };
                    this.categoriesSelected = [];
                    this.counted = false;


                    break;

                case 'save':

                    if (tableChosen) {

                        var coefficienti_id = '';

                        this.coefficienti.forEach(element => {
                            if (element.Mesi === this.form.monthSelected) {
                                coefficienti_id = element.id;
                            };
                        });

                        axios({
                            method: 'post',
                            url: window.location.origin + '/fastrent/db/api.php',
                            params: {
                                tableChosen: tableChosen,
                                method: 'store',
                                coefficienti_id: coefficienti_id,
                                prodotti_id: this.form.productSelected.id,
                                cliente: this.form.customer,
                                agente: this.form.salesAgent,
                                accettazione: this.form.acceptance,

                            },
                        })
                            .then((res) => {
                                if (res) {
                                    this.confirmation = 'stored';
                                    console.log(this.confirmation);
                                    setTimeout(() => {
                                        this.confirmation = '';
                                        this.goOn('cancel');
                                        this.apiGet('coefficienti_prodotti');
                                    }, 2000);
                                }

                            })
                            .catch((err) => {
                                console.log(err);
                            });

                    } else {
                        console.log('manca la tabella');
                    }

                    break;


                default:
                    break;
            };
            this.confirmation = '';

        },
        selectProduct: function (product) {
            this.form.productSelected = this.prodotti[product];
            this.section = 'form';
        },
        selectCategory: function (categoria) {
            if (this.categoriesSelected.includes(categoria)) {
                this.categoriesSelected.splice(this.categoriesSelected.indexOf(categoria), 1);
            } else {

                this.categoriesSelected.push(categoria);
            }
        },
        apiGet: function (tableChosen) {
            axios({
                method: 'get',
                url: window.location.origin + '/fastrent/db/api.php',
                params: {
                    tableChosen: tableChosen,
                    method: 'get',
                },
            })
                .then((res) => {
                    if (res) {
                        // console.log(res.data);

                        if (tableChosen === 'prodotti') {

                            this.prodotti = res.data;

                            this.prodotti.forEach(element => {
                                if (!(this.categorie.includes(element.Categoria))) {
                                    this.categorie.push(element.Categoria);
                                };
                            });

                        } else if (tableChosen === 'coefficienti') {

                            this.coefficienti = res.data;

                        } else if (tableChosen === 'coefficienti_prodotti') {


                            var preventivi = res.data;

                            preventivi.map(item => {

                                item.created_at = item.created_at.slice(0, 7);

                                item.accettazione = Number(item.accettazione);

                                var canoneMensile = item.Prezzo * 1.3 * item.Coefficiente / 100;

                                var canoneTotale = canoneMensile * item.Mesi;

                                var deposito = canoneTotale * 10 / 100;

                                var money = {
                                    canoneMensile: Number((Math.ceil(canoneMensile * 100) / 100).toFixed(2)),
                                    canoneTotale: Number((Math.ceil(canoneTotale * 100) / 100).toFixed(2)),
                                    deposito: Number((Math.ceil(deposito * 100) / 100).toFixed(2)),
                                };

                                item = { ...item, ...money };

                                this.coefficienti_prodotti.push(item);
                            })

                            var newPreventivi = [];


                            this.coefficienti_prodotti.forEach((preventivo, i) => {
                                let month = preventivo.created_at.split('-')[1];
                                let year = preventivo.created_at.split('-')[0];

                                preventivo = {
                                    ...preventivo,
                                    month: month,
                                    year: Number(year),
                                }


                                if (!this.years.includes(year)) {

                                    this.years.push(year);
                                }
                                this.years = this.years.sort();

                                switch (preventivo.month) {
                                    case '01':
                                        preventivo.month = 'Gennaio';
                                        break;
                                    case '02':
                                        preventivo.month = 'Febbraio';
                                        break;
                                    case '03':
                                        preventivo.month = 'Marzo';
                                        break;
                                    case '04':
                                        preventivo.month = 'Aprile';
                                        break;
                                    case '05':
                                        preventivo.month = 'Maggio';
                                        break;
                                    case '06':
                                        preventivo.month = 'Giugno';
                                        break;
                                    case '07':
                                        preventivo.month = 'Luglio';
                                        break;
                                    case '08':
                                        preventivo.month = 'Agosto';
                                        break;
                                    case '09':
                                        preventivo.month = 'Settembre';
                                        break;
                                    case '10':
                                        preventivo.month = 'Ottobre';
                                        break;
                                    case '11':
                                        preventivo.month = 'Novembre';
                                        break;
                                    case '12':
                                        preventivo.month = 'Dicembre';
                                        break;
                                }

                                newPreventivi.push(preventivo)

                            });

                            this.coefficienti_prodotti = newPreventivi;


                        }

                    } else {
                        console.log('res ma senza dati');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });


        },
    },
});