<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/css/master.css">
    <title>Calcolo canone noleggio</title>
</head>
<body>
    <div id="root">
        <header>
            <div class="up">
                <div class="container">
                    <div class="row justify-content-around align-items-center">
                        <div class="col-md-4 logo text-center">
                            <img src="./assets/img/logo.png" alt="logo fastrent">
                        </div>
                        <div class="col-md-4 text-center">
                            
                            <a class="red my-btn" href="tel:+390690286124"><i class="fas fa-phone-alt mr-1"></i></i>0690286124</a>
                        </div>
                        <div class="col-md-4 text-center">
                            
                            <a class="red my-btn" href="mailto:info@fastrent.it"><i class="fas fa-envelope mr-1"></i>info@fastrent.it</a>
                        </div>
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
                            <div @click="section='calcolo'" class="attivita " style="background-image: url('./assets/img/andras-vas-Bd7gNnWJBkU-unsplash.jpg');">
                                <h1 class="mt-2 ml-2">Nuovo preventivo</h1>

                            </div>

                        </div>
                        <div class="col-md-6">
                            <div @click="section='dash'" class="attivita" style="background-image: url('./assets/img/new-data-services-Ar-iTL4QKl4-unsplash.jpg');">
                                <h1 class="mt-2 ml-2">Dashboard</h1>

                            </div>
                            
                        </div>
                    </div>
                </div>

            </section>

            <section @click.stop="section=''" class="blur" v-if="section !== ''">

                <section class="mt-5" v-if="section === 'calcolo'" id="calcolo">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <form action="">
                                    <div class="form-group">
                                        <label for="exampleFormControlSelect1">Example select</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </select>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                    
                </section>
    
                <section class="mt-5" v-else-if="section === 'dash'" id="dash">
    
                </section>
            </section>

        </main>


    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="./assets/js/main.js" charset="utf-8"></script>

</body>
</html>