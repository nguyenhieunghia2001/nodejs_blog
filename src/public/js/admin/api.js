import Render from './renders.js'

class Api {
    addLesson = async (formData, courseId) => {
        try {
            let response = await axios.get('/lesson/add', {
                params: {
                    lessonName: formData.get('lessonName'),
                    lessonLink: formData.get('videoID'),
                    courseId
                },
            });

            Render().renderAddLesson(response.data.lessons);
        } catch (error) {
            return false;
        }
    }
    getLessonWithId = async (lessonId) =>{
        try {
            let response = await axios.get('/lesson/getlesson', {
                params: {
                    lessonId
                },
            });

            Render().renderModalUpdate(response.data.lesson);
        } catch (error) {
            return false;
        }
    }
    updateLesson = async (formData, lessonId) => {
        try {
            let response = await axios.get('/lesson/update', {
                params: {
                    lessonName: formData.get('lessonNameUpdate'),
                    lessonLink: formData.get('videoIDUpdate'),
                    lessonId
                },
            });

            Render().renderAddLesson(response.data.lessons);
        } catch (error) {
            return false;
        }
    }
};

export default new Api();