Vue.config.devtools = true;
var app = new Vue({
    el: '#root',
    data: {
        prodotti: [],
        coefficienti: [],
        section: 'calcolo', // rimettere ''
        categorie: [],
        categoriesSelected: [],
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
        counted: false
    },
    mounted() {
        this.apiGet('prodotti');
        this.apiGet('coefficienti');
    },
    methods: {
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
                                console.log(res.data);

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