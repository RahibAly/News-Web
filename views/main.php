<!--Main layout-->
<main class="my-5">

    <div class="container">

    <!-- Filter -->
    <section class="filter">
        <!-- Modal -->
        <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Search & Filter</h5>
                <button
                type="button"
                class="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <!-- START --> 
                <div class="bg-image-vertical h-100">
                    <div class="d-flex align-items-center h-100">
                        <div class="container">
                            <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="cardx" style="border-radius: 1rem;">
                                <div class="card-bodyx p-1">

                                    <form id="searchfilter-form">
                                    <div class="row">
                                        <div class="col-12 col-md-6 mb-4">
                                            <div class="form-outline">
                                                <input type="text" id="category" name="category" class="form-control" />
                                                <label class="form-label" for="category">Category</label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 mb-4">
                                            <div class="form-outline">
                                                <input type="text" id="title" name="title" class="form-control" />
                                                <label class="form-label" for="title">Title</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-6 mb-4">
                                            <div class="form-outline">
                                                <input type="text" id="provider" name="provider" class="form-control" />
                                                <label class="form-label" for="provider">Provider</label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 mb-4">
                                            <div class="form-outline">
                                                <input type="text" id="author" name="author" class="form-control" />
                                                <label class="form-label" for="author">Author</label>
                                            </div>
                                        </div>
                                    </div>


                                   
                                    
                                    
                                    </form>

                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>   
                <!-- END -->    

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary reset-news-filter" data-mdb-dismiss="modal">
                Reset
                </button>
                <button type="button" class="btn btn-primary filter-news" data-mdb-dismiss="modal">Filter</button>
            </div>
            </div>
        </div>
        </div>
        
        </section>


        <!--Section: Content-->
        <section class="text-center">
            <h4 class="mb-5 mt-5 page-title"><strong>Latest News</strong></h4>
            
            <div class="row news-container empty" last_loaded_page=0></div>
            <div class="row noNewsMsg">
                <p>News not found!</p>
            </div>
            
            <div class="news-loader">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        </section>
        <!--Section: Content-->
    </div>
</main>
<!--Main layout-->