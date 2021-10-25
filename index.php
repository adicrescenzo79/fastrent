<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
        integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/css/master.css">
    <title>Calcolo canone noleggio</title>
</head>

<body>
    <div id="root">
        <header>
            <div class="container h-100">
                <div class="row justify-content-around align-items-center align-items-center h-100">
                    <div class="col-md-4 logo text-center">
                        <img src="./assets/img/logo.png" alt="logo fastrent">
                    </div>
                    <div class="col-md-4 text-center">

                        <a class="primary-color my-btn" href="tel:+390690286124"><i
                                class="fas fa-phone-alt mr-1"></i></i>0690286124</a>
                    </div>
                    <div class="col-md-4 text-center">

                        <a class="primary-color my-btn" href="mailto:info@fastrent.it"><i
                                class="fas fa-envelope mr-1"></i>info@fastrent.it</a>
                    </div>
                </div>

            </div>
        </header>

        <main>
            <section class="pt-5" id="scelta">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <h1 class="mb-5">Ciao Agente, cosa devi fare oggi?</h1>
                        </div>
                        <div class="col-md-6">
                            <div @click="section='calcolo'" class="attivita "
                                style="background-image: url('./assets/img/andras-vas-Bd7gNnWJBkU-unsplash.jpg');">
                                <h1 class="mt-2 ml-2">Nuovo preventivo</h1>

                            </div>

                        </div>
                        <div class="col-md-6">
                            <div @click="dashboard()" class="attivita"
                                style="background-image: url('./assets/img/new-data-services-Ar-iTL4QKl4-unsplash.jpg');">
                                <h1 class="mt-2 ml-2">Dashboard</h1>

                            </div>

                        </div>
                    </div>
                </div>

            </section>

            <section class="blur" v-if="section !== ''">

                <section class="" v-if="section === 'calcolo'" id="calcolo">
                    <div class="container position-relative">

                        <div class="pt-5 pb-5 row  categorie justify-content-between">
                            <div class="col-cat">
                                <div class="my-btn primary-color text-center pointer" @click="categoriesSelected=[]">
                                    <span class="categoria text-uppercase font-weight-bolder ">
                                        << resetta filtro>>
                                    </span>
                                </div>
                            </div>
                            <div v-for="(categoria, i) in categorie" class="col-cat">

                                <div class="my-btn primary-color text-center pointer" @click="selectCategory(categoria)"
                                    :class="(categoriesSelected.includes(categoria)) ? 'active' : ''">
                                    <span class="categoria text-uppercase ">{{categoria}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row prodotti pb-5">
                            <div v-for="(prodotto, i) in prodotti" :key="i" class="col-md-3"
                                v-if="categoriesSelected.includes(prodotto.Categoria) || (categoriesSelected.length === 0)">
                                <div class="flip-card mt-5 pointer">
                                    <div class="flip-card-inner ">
                                        <div class="flip-card-front d-flex justify-content-center"
                                            :style="(prodotto.Immagine) ? { backgroundImage : 'url(' + prodotto.Immagine + ')' } : { backgroundImage : 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png)' }">
                                            <span class="align-self-end mb-2">{{prodotto.Modello}}</span>
                                        </div>
                                        <div
                                            class="flip-card-back d-flex flex-column justify-content-around align-items-center">
                                            <h3>{{prodotto.Modello}}</h3>
                                            <p class="pr-2 pl-2">{{prodotto.Caratteristiche}}</p>
                                            <span>{{prodotto.Prezzo + ' €'}}</span>
                                            <a :href="prodotto.Pagina">Pagina prodotto</a>
                                            <a @click="selectProduct(i)" class="my-btn primary-color">Scegli</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

                <section class="mt-5" v-else-if="section === 'form'" id="form">

                    <div class="container">
                        <div class="row pb-5">
                            <div class="col-md-4 ">

                                <a @click="back('calcolo')" class="my-btn primary-color ">
                                    <i class="fas fa-angle-double-left mr-5"></i>
                                    <span>Indietro</span>
                                </a>
                            </div>

                            <div class="col-md-4">

                                <a @click="confirmation='cancel'" class="my-btn primary-color ">
                                    <i class="fas fa-remove-format mr-5"></i> <span>Annulla operazione</span>
                                </a>



                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-12 pb-3 d-flex">
                                <h2>Calcolo del canone per:</h2>
                                <h2 class="font-weight-bolder ml-5">{{form.productSelected.Modello}}</h2>
                            </div>
                            <form action="" class="col-md-12 row">
                                <div class="form-group col-md-6">
                                    <label for="name">Nome o Ragione Sociale</label>
                                    <input v-model="form.customer" type="text" class="form-control" id="name">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="month">Scegli i mesi di durata del noleggio</label>
                                    <select v-model="form.monthSelected" class="form-control" id="month">
                                        <option disabled value=""></option>
                                        <option v-for="(coefficiente, i) in coefficienti">
                                            {{parseInt(coefficiente.Mesi)}}</option>
                                    </select>
                                </div>
                                <div v-if="form.customer && form.monthSelected && !counted"
                                    class="form-group col-md-6 offset-md-6 text-right">
                                    <a @click="calculate()" class="my-btn primary-color ">
                                        <span>Calcola</span>
                                        <i class="fas fa-angle-double-right ml-5 mt-5"></i>
                                    </a>


                                </div>

                                <div v-if="counted" class="col-md-12 row mt-5 justify-content-between">

                                    <div class="col-md-6 pb-5 d-flex">
                                        <h2>Deposito cauzionale:</h2>
                                        <h2 class="font-weight-bolder ml-5">{{(Math.ceil(this.form.securityDeposit *
                                            100) /
                                            100).toFixed(2) + ' €'}}</h2>
                                    </div>
                                    <div class="col-md-6 pb-5 d-flex">
                                        <h2>Canone mensile:</h2>
                                        <h2 class="font-weight-bolder ml-5">{{(Math.ceil(this.form.monthlyFee * 100) /
                                            100).toFixed(2) + ' €'}}</h2>
                                    </div>

                                    <div class="acceptance col-md-6 row">

                                        <div class="form-check col-md-12 pb-3 d-flex align-items-center">
                                            <input v-model="form.acceptance" class="form-check-input" type="radio"
                                                id="acceptance" value="true" unchecked>
                                            <label class="form-check-label" for="acceptance">
                                                Preventivo accettato
                                            </label>
                                        </div>
                                        <div class="form-check col-md-12 pb-3 d-flex align-items-center">
                                            <input v-model="form.acceptance" class="form-check-input" type="radio"
                                                id="refusal" value="false" unchecked>
                                            <label class="form-check-label" for="refusal">
                                                Preventivo rifiutato
                                            </label>
                                        </div>
                                    </div>







                                    <div v-if="form.acceptance!==null" class="col-md-6 pb-3 d-flex justify-content-end">
                                        <div>

                                            <a @click="confirmation='save'" class="my-btn primary-color ">
                                                <span>Registra operazione</span>
                                                <i class="fas fa-download ml-5"></i>
                                            </a>
                                        </div>
                                    </div>



                                </div>
                            </form>

                        </div>

                    </div>



                </section>


                <section class="mt-5" v-else-if="section === 'dash'" id="dash">
                    <canvas id="myChart"></canvas>
                </section>
            </section>

            <div v-if="confirmation !== ''" class="modal-blur">

                <div v-if="confirmation === 'cancel' || confirmation === 'save'" class="my-modal text-center">
                    <p>Confermi?</p>
                    <div class="buttons d-flex justify-content-around">
                        <div @click="goOn(confirmation, 'coefficienti_prodotti')" class="col-md-3 my-btn primary-color">
                            Si</div>
                        <div @click="confirmation=''" class="col-md-3 my-btn primary-color">No
                        </div>
                    </div>
                </div>

                <div v-else-if="confirmation === 'stored'"
                    class="my-modal d-flex justify-content-center align-items-center">
                    <p>Elemento registrato</p>
                </div>

            </div>



        </main>


    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
        integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ=="
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="./assets/js/main.js" charset="utf-8"></script>

</body>

</html>