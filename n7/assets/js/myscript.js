function showHidePassword() {
    var x = document.getElementById("userPW");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("lock-icon").className = "fas fa-unlock-alt password"
    } else {
        x.type = "password";
        document.getElementById("lock-icon").className = "fas fa-lock password"

    }
}

function update_data($article_container_clone, photo) {
    // User avatar
    $article_container_clone.find($('.infor__useravatar')).attr('src', 'https:' + photo.account.picture_url);
    // Caption name
    $article_container_clone.find($('.caption--name')).text(photo.title[0].content)
    // Location name
    $article_container_clone.find('.location__name').text(photo.area_name);
    // Capture time
    $article_container_clone.find('.year--canchange').text(photo.capture_time || 'N/a')
    // Heritage photo
    $article_container_clone.find($('.photograph--heritage')).attr('src', 'https:' + photo.image_url + "?size=medium");
    $article_container_clone.show();
    return $article_container_clone;
}


$(document).ready(function () {
    mHeritageGoService.getPhotos({ limit: 5 }).then(function (photos) {
        $article_container = $('#post-container');
        $article_container.hide()
        $(photos).each(function () {
            var $article_container_clone = $article_container.clone();
            mHeritageGoService.getPhoto(this).then(function (photo) {
                $article_container_clone = update_data($article_container_clone, photo);
            });
            $article_container_clone.appendTo('.posts');

        })
    }).catch(function (error) {console.log(error)})
})

var offset = 0;
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        offset += 5;
        console.log(offset);
        mHeritageGoService.getPhotos({ limit: 5, offset: offset }).then(function (photos) {
            $article_container = $('#post-container');
            $article_container.hide()
            $(photos).each(function () {
                var $article_container_clone = $article_container.clone();
                mHeritageGoService.getPhoto(this).then(function (photo) {
                    $article_container_clone = update_data($article_container_clone, photo);
                });
                $article_container_clone.appendTo('.posts');

            })
        }).catch(function (error) {console.log(error)})
    }
});

window.addEventListener('scroll', function () {
  document.body.classList[
    window.scrollY > 20 ? 'add': 'remove'
  ]('scrolled');
});
