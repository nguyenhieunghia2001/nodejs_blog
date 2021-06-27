const lessonTable = document.querySelector('#lessonTable');
const formUpdate = document.forms['formUpdateLesson'];

export default function Render() {
  const renderAddLesson = async (lessons) => {
    let html = lessons?.map((lesson, index) => {
      return `<tr>
                <th scope="row">${index + 1}</th>
                <td>${lesson.name_video}</td>
                <td>${lesson.id_video}</td>
                <td class="d-flex align-items-center">
                  <div class="icon-edit">
                    <a href="/admincourse/updatecourse/${lesson._id}">
                      <i class="fas fa-edit"></i>
                    </a>
                  </div>
                  <div class="icon-trash" style="margin: 0 15px;">
                    <a href="/admincourse/delcourse/${lesson._id}">
                      <i class="fas fa-trash"></i>
                    </a>
                  </div>
                </td>
            </tr>`;
    }).join('');
    lessonTable.querySelector('tbody').innerHTML = html;
  }
  const renderModalUpdate = async (lesson) => {
    formUpdate.elements[0].value = lesson[0].name_video;
    formUpdate.elements[1].value = lesson[0].id_video;
  }
  const renderChart = async (months) => {
    const labels = Object.keys(months);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "số người đăng kí",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: Object.values(months),
        },
      ],
    };
    const config = {
      type: "line",
      data,
      options: {},
    };
    var myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  }
  return {
    renderAddLesson,
    renderModalUpdate,
    renderChart
  }
}