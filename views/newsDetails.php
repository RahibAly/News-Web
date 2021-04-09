<!--Main layout-->
<main class="my-5">

    <div class="container">

        <!--Section: Content-->
        <section class="text-center">
            
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

        <!-- Comments START -->
        <div class="row articleAddComment">
                    <div class="col-lg-10 col-md-10 mb-4" style="margin: auto;">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Add Comment</h4>
                            </div>
                            <div class="card-body">
                            <form id="commentForm">
                            <div class="row">
                                <!-- Email input -->
                                <div class="col-md-4">
                                    <div class="form-outline mb-4">
                                        <input required type="text" id="name" name="name" class="form-control" />
                                        <label class="form-label" for="name">Name</label>
                                    </div>
                                </div>

                                <!-- Password input -->
                                
                                <div class="col-md-4">
                                    <div class="form-outline mb-4">
                                        <input required type="email" id="email" name="email" class="form-control" />
                                        <label class="form-label" for="email">Email</label>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                
                                <div class="col-md-12">
                                    <div class="form-outline">
                                        <textarea required class="form-control" id="comment" name="comment" rows="4"></textarea>
                                        <label class="form-label" for="comment">Comment</label>
                                    </div>
                                </div>
                                
                            </div>

                                <!-- Submit button -->
                                <div class="col-md-4 mt-4">
                                    <button type="submit" class="btn btn-primary btn-block add-comment">Post Comment
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </button>
                                    <span class="commentSuccessMsg text-success">Your comment has been added successfully...</span>
                                </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="row articleComments">
                    <div class="col-lg-10 col-md-10 mb-4" style="margin: auto;">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Comments</h4>
                            </div>
                            <div class="card-body">
                                <section class="comment-list">
                                    <!-- First Comment -->
                                    
                                
                                </section>
                                <p class="noCommentsMsg">No comments!</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
        <!-- Comments END -->

    </div>
</main>
<!--Main layout-->