import Api from './api.js';

const home = {
  getChart: async function (){
    await Api.getUserRegisterCourseWithMonth();
  },
  start: function(){
    this.getChart();
  }
}
home.start();