import Api from './api.js';

const btn_getModalUpdate = document.querySelectorAll('.btn-updateLesson');

const attributes = {
    lessonId: '',
    param: '',
}
const lesson = {
    getParam: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('courseid');
        attributes.param = myParam;
    },
    messgae: function () {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });
    },
    //điều khiển các event click
    handle: function () {
        const _this = this;

        const modalAddLesson = new bootstrap.Modal(document.getElementById('addLessonModal'), {});
        document.getElementById("btn_showModalAddLesson").addEventListener("click", function () {
            modalAddLesson.show();
        });
        document.getElementById("btn-addLesson").addEventListener("click", async function () {
            const formAddLesson = document.querySelector('#formAddLesson');
            const formData = new FormData(formAddLesson);
            await Api.addLesson(formData, attributes.param);
            _this.messgae();
            modalAddLesson.hide();
        });

        //modal update
        const modalUpdateLesson = new bootstrap.Modal(document.getElementById('updateLessonModal'), {});
        btn_getModalUpdate.forEach(btn => {
            btn.addEventListener('click', async e => {
                const lessonID = btn.getAttribute('lesson-id');
                await Api.getLessonWithId(lessonID);
                attributes.lessonId = lessonID;
                modalUpdateLesson.show();
            })
        })
        document.getElementById("btn-UpdateLesson").addEventListener("click", async function () {
            const formUpdateLesson = document.querySelector('#formUpdateLesson');
            const formData = new FormData(formUpdateLesson);
            console.log({
                lessonName: formData.get('lessonNameUpdate'),
                lessonLink: formData.get('videoIDUpdate'),
            });
            await Api.updateLesson(formData, attributes.lessonId);
            _this.messgae();
            modalUpdateLesson.hide();
        });
    },
    start: function () {
        this.handle();
        this.getParam();
    }
};

//chạy fucntion lesson 
lesson.start();
