var app = {
    newsAPIKey: 'a9b120e1-5be1-436b-89c8-9066861beafb',//'e8aaeb0009ba4c89b2b59e93beca3a2a',
    newsAPIParams: '',
    newsEndPoint:  'https://newsapi.ai/api/v1/',//'https://eventregistry.org/api/v1/',//'https://newsapi.org/v2/everything',
    newsPageNo: 1,
    isLoading: false,
    loadNews: function(options){
        var endPointURL;
        var loadSingleNews = false;
        var self = this;
        if(self.newsPageNo == $('.news-container').attr('last_loaded_page') || self.isLoading){
            return false;
        }
        self.loaderBottom(true);
        self.isLoading = true;
        var requestData = {
            articlesSortByAsc: true,
            //keywordLoc: 'news/Arts_and_Entertainment',
            apiKey: self.newsAPIKey,
            articlesCount: 20,
            lang: 'eng',
            articlesPage: self.newsPageNo,
            includeConceptImage: true,
            includeConceptDescription: true,
        }

        if(typeof options.articleId != "undefined" && options.articleId){
            requestData.articleUri = options.articleId;
            endPointURL = self.newsEndPoint + 'article/getArticle?articleUri=6493727933';
            loadSingleNews = true;
        }else{
            endPointURL = self.newsEndPoint + 'article/getArticles';
        }

        if(typeof options.category != "undefined" && options.category){
            requestData.categoryUri = options.category;
        }
        if(typeof options.author != "undefined" && options.author){
            requestData.authorUri = options.author;
        }
        if(typeof options.source != "undefined" && options.source){
            requestData.sourceUri = options.source;
        }
        if(typeof options.title != "undefined" && options.title){
            requestData.keyword = options.title;
        }
        if(typeof options.pageNo != "undefined" && options.pageNo){
            requestData.articlesPage = options.pageNo;
        }
        
        
        $.ajax({
            url: endPointURL,
            data: requestData,
            type: 'GET',
            error: function(error){
                self.loaderBottom(false);
                self.isLoading = false;
            }
          }).done(function(res) {
                if(loadSingleNews){
                    res = res[options.articleId];
                    self.loadSingleNewsView(res);
                }else{
                    self.loadNewsView(res);
                }
                self.loaderBottom(false);
                self.isLoading = false;
                $('.news-container').attr('last_loaded_page', self.newsPageNo);
                if(typeof options.callback == 'function'){
                    options.callback(res);
                }
          });
    },
    loaderBottom: function(show){
        if(show){
            $('.news-loader').show();
        }else{
            $('.news-loader').hide();
        }
    },
    loadSingleNewsView: function(data){
        var self = this;
        var newsBoxes = '';
        if(typeof data.info != "undefined"){
            newsBoxes += self.renderSingleNewsPost(data.info);
        }
        if(!newsBoxes){
            $('.noNewsMsg').show();
        }else{
            $('.noNewsMsg').hide();
        }
        if($('.news-container').hasClass('empty')){
            $('.news-container').html(newsBoxes);
            $('.news-container').removeClass('empty');
        }else{
            $('.news-container').append(newsBoxes);
        }
    },
    loadNewsView: function(data){
        var self = this;
        var newsBoxes = '';
        if(typeof data.articles.count != "undefined" && data.articles.count){
            $.each(data.articles.results, function(newsKey, newsVal){
                newsBoxes += self.renderNewsPost(newsVal)
            });
        }
        if(!newsBoxes){
            $('.noNewsMsg').show();
        }else{
            $('.noNewsMsg').hide();
        }
        if($('.news-container').hasClass('empty')){
            $('.news-container').html(newsBoxes);
            $('.news-container').removeClass('empty');
        }else{
            $('.news-container').append(newsBoxes);
        }
    },
    imgLoadError: function(image){
        image.onerror = "";
        image.src = "assets/img/broken.png";
        return true;
    },
    initShareButtons: function(){
         var config = {
            alignment: 'center',
            id: 'share-buttons-cont',
            enabled: true,
            font_size: 12,
            padding: 10,
            radius: 2,
            networks: ['facebook', 'twitter', 'telegram', 'whatsapp'],
            size: 40,
            show_total: true,
            show_mobile_buttons: false,
            min_count: 0,
            spacing: 10,
            //url: "https://www.sharethis.com", // custom url
            //title: "My Custom Title",
            //image: "https://18955-presscdn-pagely.netdna-ssl.com/wp-content/uploads/2016/12/ShareThisLogo2x.png", // useful for pinterest sharing buttons
            //description: "My Custom Description",
            //username: "ShareThis" // custom @username for twitter sharing
         }
         window.__sharethis__.load('inline-share-buttons', config);
    },
    renderSingleNewsPost: function(news){
        return `
        <div class="col-lg-10 col-md-10 mb-4 article-single-box">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${news.title}</h3>
                </div>
              <div class="bg-image hover-overlay ripple hover-zoom" data-mdb-ripple-color="light">
                <img onerror="app.imgLoadError(this);" src="${news.image}" class="img-fluid article-image" />
              </div>
              <div class="card-body">
                
                <p class="card-text">
                  ${app.nl2br(news.body)}
                </p>
              </div>
              <div class="card-footer text-muted">
              <div id="share-buttons-cont" class="inline-share-buttons"></div>
                <div>
                    <span class="created-date">Posted on ${news.date}</span>
                    <div class="customRate">
                        <span class='ratingCount'>(0)</span>
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>
                </div>
            </div>
          </div>
          `;
    },
    renderNewsPost: function(news){
        var detailsLink = 'news.php?_id='+news.uri;
        return `
        <div class="col-lg-4 col-md-12 mb-4 article-box">
            <div class="card">
              <div class="bg-image hover-overlay ripple hover-zoom" data-mdb-ripple-color="light">
                <img onerror="app.imgLoadError(this);" src="${news.image}" class="img-fluid article-image" />
                <a href="${detailsLink}">
                  <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">
                  ${news.body}
                </p>
                <a href="${detailsLink}" class="btn btn-primary">Read more...</a>
              </div>
              <div class="card-footer text-muted">Posted on ${news.date}</div>
            </div>
          </div>
          `;
    },
    nl2br: function(str, is_xhtml) {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },
    initFilter: function(){
        $("#category").autocomplete({
            source: function (request, response) {
                 $.ajax({
                     url: app.newsEndPoint+"suggestCategoriesFast?apiKey="+app.newsAPIKey,
                     type: "GET",
                     data: request,
                     success: function (data) {
                         response($.map(data, function (el) {
                             return {
                                 label: el.label,
                                 value: el.uri
                             };
                         }));
                     }
                 });
            },
            //minLength: 2,
            select: function (event, ui) {
                this.value = ui.item.label;
                $(this).attr("filter_value",ui.item.value);
                event.preventDefault();
            }
        });
    
        $("#author").autocomplete({
            source: function (request, response) {
                 $.ajax({
                     url: app.newsEndPoint+"suggestAuthorsFast?apiKey="+app.newsAPIKey,
                     type: "GET",
                     data: request,
                     success: function (data) {
                         response($.map(data, function (el) {
                             return {
                                 label: el.name,
                                 value: el.uri
                             };
                         }));
                     }
                 });
            },
            select: function (event, ui) {
                console.log(ui.item)
                this.value = ui.item.label;
                $(this).attr("filter_value",ui.item.value);
                event.preventDefault();
            }
        });
    
        $("#provider").autocomplete({
            source: function (request, response) {
                 $.ajax({
                     url: app.newsEndPoint+"suggestSourcesFast?apiKey="+app.newsAPIKey,
                     type: "GET",
                     data: request,
                     success: function (data) {
                         response($.map(data, function (el) {
                             return {
                                 label: el.title,
                                 value: el.uri
                             };
                         }));
                     }
                 });
            },
            select: function (event, ui) {
                this.value = ui.item.label;
                $(this).attr("filter_value",ui.item.value);
                event.preventDefault();
            }
        });
    
        $(document).on('click', '.filter-news', function(){
            app.resetPageNumber();
            app.loadNews({
                category: $("#category").attr('filter_value') ? $("#category").attr('filter_value') : 'news/Arts_and_Entertainment',
                author: $("#author").attr('filter_value'),
                source: $("#provider").attr('filter_value'),
                title: $("#title").val(),
                callback: function(){
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
            });
        })
    
        $(document).on('keyup', '#searchfilter-form input', function(e){
            if(e.keyCode == 8){
                $(this).removeAttr('filter_value');
            }
        });
    
    
        $(document).on('click', '.reset-news-filter', function(e){
            app.resetPageNumber();
            app.loadNews({
                category: 'news/Arts_and_Entertainment',
                callback: function(){
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
            });
        });
    },
    resetPageNumber: function(){
        $('.news-container').attr('last_loaded_page',0);
        $('.news-container').addClass('empty');
        $('.news-container').html('');
        app.newsPageNo = 1;
    }
}

var rating = {
    set: function(rating, articleId){
        $.ajax({
            url: '/api/api.php',
            data: {
                action: 'setRating',
                rating: rating,
                articleId: articleId
            },
            type: 'POST',
            error: function(error){
                
            }
          }).done(function(res) {
                
          });
    },
    get: function(articleId, callback){
        $.ajax({
            url: '/api/api.php',
            dataType: "json",
            data: {
                action: 'getRating',
                articleId: articleId
            },
            type: 'GET',
            error: function(error){
                
            }
          }).done(function(res) {
              if(callback && res.data){
                callback(res.data);
              }
          });
    }
}

var comment = {
    add: function(data, callback){
        $('.add-comment .spinner-border').show();
        $.ajax({
            url: '/api/api.php',
            data: data,
            dataType: "json",
            type: 'POST',
            error: function(error){
                
            }
          }).done(function(res) {
            if(callback){
                callback(data.articleId);
            }
            $('.add-comment .spinner-border').hide();
            $('.commentSuccessMsg').fadeIn();
            setTimeout(function(){
                $('.commentSuccessMsg').fadeOut();
            },5000);
          });
    },
    get: function(articleId, callback){
        var self = this;
        $.ajax({
            url: '/api/api.php',
            dataType: "json",
            data: {
                action: 'getComments',
                articleId: articleId
            },
            type: 'GET',
            error: function(error){
                
            }
          }).done(function(res) {
                
                var commentsHTML = '';
                if(typeof res.data != "undefined" && Object.keys(res.data).length){
                    $.each(res.data, function(key, val){
                        commentsHTML += comment.renderComment(val);
                    });
                    $('.articleComments .comment-list').html(commentsHTML);
                }
                if(!commentsHTML){
                    $('.noCommentsMsg').show();
                }else{
                    $('.noCommentsMsg').hide();
                }
              if(callback && res.data){
                callback(res.data);
              }
          });
    },
    renderComment: function(comment){
        return `
            <article class="row">
                <div class="col-md-2 col-sm-2 hidden-xs">
                <figure class="thumbnail">
                    <img class="img-thumbnail" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" />
                    <!-- <figcaption class="text-center">username</figcaption> -->
                </figure>
                </div>
                <div class="col-md-10 col-sm-10">
                <div class="panel panel-default left">
                    <div class="panel-body">
                        <header class="text-left">
                            <div class="comment-user"><i class="fa fa-user"></i> ${comment.name}</div>
                            <time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> ${comment.created_at}</time>
                        </header>
                        <div class="comment-post">
                            <p>
                            ${app.nl2br(comment.comment)}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </article>
        `;
    }
}

$(document).ready(function(){
    if(pageName == 'home'){
        app.loadNews({
            category: 'news/Arts_and_Entertainment'
        });
        app.initFilter();
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() >= $('.news-container').height()) {
                var lastPage = parseInt($('.news-container').attr('last_loaded_page'));
                app.newsPageNo = lastPage+1;
                app.loadNews({
                    category: 'news/Arts_and_Entertainment'
                });
            }
        });
        $('.filterNavLink').show();
    } else if (pageName == 'details'){
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('_id');
        app.loadNews({
            articleId: articleId,
            callback: function(){
                rating.get(articleId, function(articleRating){
                    if(articleRating.avg_rating){
                        $('.customRate input[type="radio"][value="'+articleRating.avg_rating+'"]').attr('checked',true);
                        $('.customRate .ratingCount').text('('+articleRating.total+')');
                    }
                });
                comment.get(articleId);
                $('.articleAddComment').fadeIn();
                $('.articleComments').fadeIn();
                app.initShareButtons();
                $(document).on('click', '.customRate [type="radio"]', function(){
                    rating.set($(this).val(), articleId);
                })
                $(document).on('submit', '#commentForm', function(e){
                    e.preventDefault();
                    comment.add({
                        name: $('#commentForm #name').val(),
                        email: $('#commentForm #email').val(),
                        comment: $('#commentForm #comment').val(),
                        articleId: articleId,
                        action: 'addComment'
                    }, comment.get);
                });
            }
        });
        $('.filterNavLink').hide();
        

    }

    
});
