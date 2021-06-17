const course = {
    //load lại tìm phần tử đang dc active
    render: ()=>{
        const videos = document.querySelectorAll(".courses-mp4");

        videos.forEach((video) => {
            video.classList.remove('videos__item-played');
        })
    },

    handleClick: function() {
        const videos = document.querySelectorAll(".courses-mp4");
        const urlVideos = document.querySelector(".main-videodetail");

        videos.forEach((video) => {
            video.addEventListener("click", (e) => {
                if (e.target.closest('.courses-mp4:not(.videos__item-played)')) {
                    const slug = e.target.getAttribute("data-slug");
                    this.render();
                    e.target.classList.add("videos__item-played");
                    urlVideos.src = `https://www.youtube.com/embed/${slug}`;
                }

            });
        });
    },

    start: function () {
        this.handleClick();
    },
};

course.start();
