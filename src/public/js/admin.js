// const studied = document.querySelector('.studied-input');
const btn_studied = document.querySelector(".add-studied");
const studied_parent = document.querySelector(".studied-parent");
const btn_request = document.querySelector(".add_request");
const request_parent = document.querySelector(".request-parent");

const test = document.querySelector(".contain-studied");

btn_studied.addEventListener("click", () => {
  // const div_studied = document.createElement('div');
  // div_studied.innerHTML = '<input type="text" class="form-control" id="studied" name="studied" placeholder="Sẽ học được gì">';

  // studied_parent.appendChild(div_studied);

  const div_studied = document.createElement("div");
  div_studied.classList.add("row");
  div_studied.innerHTML = `<div class="col-11 studied-parent">
    <input type="text" class="form-control" id="studied" name="studied"
        placeholder="Sẽ học được gì">
</div>
<div class="col-1 row" style="padding: 0; margin-left: 5px;">
    <div class="col-6 d-flex align-items-end"
        style="margin-bottom: 10px; padding: 0;" data-toggle="tooltip"
        data-placement="bottom" title="Thêm yêu cầu">
        <svg class="svg-icon icon-home del_studied" viewBox="0 0 20 20">
            <path fill="none"
                d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10">
            </path>
        </svg>
    </div>
    <div class="col-6 d-flex align-items-end"
        style="margin-bottom: 10px; padding: 0;" data-toggle="tooltip"
        data-placement="bottom" title="Thêm học được gì">
        <svg class="svg-icon icon-home add-studied" viewBox="0 0 20 20"
            style="cursor: pointer;">
            <path fill="none"
                d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z">
            </path>
        </svg>
    </div>

</div>`;

test.appendChild(div_studied);
});

btn_request.addEventListener("click", () => {
  const div_studied = document.createElement("div");
  div_studied.innerHTML =
    '<input type="text" class="form-control" id="request" name="request"placeholder="Yêu cầu">';

  request_parent.appendChild(div_studied);
});
