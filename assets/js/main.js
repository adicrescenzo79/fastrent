Vue.config.devtools = true;
var app = new Vue({
    el: '#root',
    data: {
        prodotti: [],
    },
    mounted() {
        this.apiCall('prodotti');
    },
    methods: {
        apiCall: function (tableChosen) {
            axios({
                method: 'get',
                url: window.location.origin + '/fastrent/db/api.php',
                params: {
                    tableChosen: tableChosen,
                },
            })
            .then((res) => {
                if (res){
                    console.log(res.data);
                    this.prodotti = res.data;
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