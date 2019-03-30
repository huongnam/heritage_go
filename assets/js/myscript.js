function showHidePassword() {
    var x = document.getElementById("userPW");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("lock-icon").className = "fas fa-unlock-alt lock"
    } else {
        x.type = "password";
        document.getElementById("lock-icon").className = "fas fa-lock lock"

    }
}



$(document).ready(function () {
    mHeritageGoService.getPhotos({ limit: 5 }).then( photos => {
        $article_container = $('#post-container');
        $(photos).each(function () {
            mHeritageGoService.getPhoto(this).then(photo => {
                var $article_container_clone = $article_container.clone();
                // console.log($article_container_clone);
                // User avatar
                $article_container_clone.find('.user-avt').attr('src', 'https:' + photo.account.picture_url);
                // Caption name
                $article_container_clone.find('.info__caption--text').text(photo.title[0].content);
                // Location name
                $article_container_clone.find('.location__name').text(photo.area_name);
                // Capture time
                $article_container_clone.find('.year--canchange').text(photo.capture_time || 'N/a');
                // Heritage photo
                $article_container_clone.find('.post__img').attr('src', 'https:' + photo.image_url + "?size=medium");
                $article_container_clone.removeAttr('id');
                $('.posts').append($article_container_clone);
            });
        })
    }).catch(function (error) {console.log(error)})
})



window.addEventListener('scroll', function () {
  document.body.classList[
    window.scrollY > 20 ? 'add': 'remove'
  ]('scrolled');
});


// var content = $('.site-content'),
//     header = $('.site-header');
               
// $(content).clone().prependTo(header).addClass('blurred');
// $(document).scroll(function(){
//   var _scroll = $(this).scrollTop();
  
//   $('.blurred').css({
//     '-webkit-transform' : 'translateY(-'+_scroll+'px)',
//     'transform' : 'translateY(-'+_scroll+'px)',
    
//   });
  
// })

var content = $('.content'),
    header = $('.header-float');
               
$(content).clone().prependTo(header).addClass('blurred');


$(document).scroll(function(){
  var scroll = $(this).scrollTop();
  $('.blurred').css({
    '-webkit-transform' : 'translateY(-'+scroll+'px)',
    'transform' : 'translateY(-'+scroll+'px)'
  });
})