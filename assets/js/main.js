Vue.config.devtools = true;
var app = new Vue({
    el: '#root',
    data: {
        prodotti: [],
        coefficienti: [],
        section: 'calcolo', // rimettere ''
        categorie: [],
    },
    mounted() {
        this.apiGet('prodotti');
        this.apiGet('coefficienti');

    },
    methods: {
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