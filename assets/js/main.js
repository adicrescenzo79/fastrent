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
        preventivoByYear: [],
        valoreChosen: '',
        valori: ['canoneMensile', 'canoneTotale'],
        months: [],
    },
    mounted() {
        this.apiGet('prodotti');
        this.apiGet('coefficienti');
        this.apiGet('coefficienti_prodotti');
    },
    methods: {
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
        carica: function (valore) {

            
            if (this.valoreChosen) {
                myChart.destroy();
            }
            
            this.valoreChosen = valore;

            const data = {
                labels: this.months,
                datasets: [{
                    label: 'Incasso mensile',
                    backgroundColor: '#3e9920',
                    borderColor: '#3e9920',
                    data: this.preventivoByYear,
                }]
            };
            const config = {
                type: 'line',
                data,
                options: {
                    parsing: {
                        xAxisKey: 'month',
                        yAxisKey: this.valoreChosen
                    }
                }
            };
            console.log(config);

            myChart = new Chart(
                document.getElementById('myChart'),
                config
            );

        },


        loadChart: function (year) {

            // DATI ISTOGRAMMA
            this.yearChosen = year;

            this.preventivoByYear = this.coefficienti_prodotti.filter(obj => obj.year == this.yearChosen && obj.accettazione);


            var helper = {};
            var result = this.preventivoByYear.reduce(function (r, o) {
                var key = o.month;

                if (!helper[key]) {
                    helper[key] = Object.assign({}, o); // create a copy of o
                    r.push(helper[key]);
                } else {
                    helper[key].canoneMensile += o.canoneMensile;
                    helper[key].canoneTotale += o.canoneTotale;

                }

                return r;
            }, []);

            this.preventivoByYear = result;

            var result = [];
            var helper = {};
            this.months.forEach((month, i) => {
                helper = {
                    month: month,
                    canoneMensile: 0,
                    canoneTotale: 0,

                    monthNr: i + 1,

                }
                result.push(helper);
            });

            this.startArray = result;

            var result = [];
            var helper = {};

            this.startArray.forEach((start, i) => {
                this.preventivoByYear.forEach((order, j) => {
                    if (start.month == order.month) {
                        start.canoneMensile = order.canoneMensile;
                        start.canoneTotale = order.canoneTotale;

                    }
                });

            });

            this.preventivoByYear = this.startArray;
            console.log(this.preventivoByYear);


            this.preventivoByYear.forEach((order, i) => {
                this.canoneMensile.push(order.canoneMensile);
                this.canoneTotale.push(order.canoneTotale);

            });

            this.labels = this.months;



            // TORTA
            const data2 = {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            };

            const config2 = {
                type: 'doughnut',
                data: data2,
            };

            myChart2 = new Chart(
                document.getElementById('myChart2'),
                config2
            );


        },
        dashboard: function () {
            this.section = 'dash';
            setTimeout(() => {
                //  this.loadChart();
            }, 1000);
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

                                var canoneMensile = item.Prezzo * 1.3 * item.Coefficiente / 100;

                                var canoneTotale = canoneMensile * item.Mesi;

                                var deposito = canoneTotale * 10 / 100;

                                var money = {
                                    canoneMensile: (Math.ceil(canoneMensile * 100) / 100).toFixed(2),
                                    canoneTotale: (Math.ceil(canoneTotale * 100) / 100).toFixed(2),
                                    deposito: (Math.ceil(deposito * 100) / 100).toFixed(2),
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
                                    year: year,
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