const course = {
    //
    changeVideo: ()=>{
        const videos = document.querySelectorAll('.courses-mp4');

        videos.forEach(video =>{
            video.addEventListener('click', e =>{
                const slug = e.target.getAttribute('data-slug');
                console.log(slug);
            })
        })
    },

    //khỏi chạy js tổng cho trang course
    start: () => {
        this.changeVideo();
    }
};

course.start();
