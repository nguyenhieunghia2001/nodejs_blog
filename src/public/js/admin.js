// const studied = document.querySelector('.studied-input');
const btn_studied = document.querySelector('.add-studied');
const studied_parent = document.querySelector('.studied-parent');
const btn_request = document.querySelector('.add_request')
const request_parent = document.querySelector('.request-parent');

btn_studied.addEventListener('click', () => {
    const div_studied = document.createElement('div');
    div_studied.innerHTML = '<input type="text" class="form-control" id="studied" name="studied" placeholder="Sẽ học được gì">';

    studied_parent.appendChild(div_studied);
})

btn_request.addEventListener('click', () => {
    const div_studied = document.createElement('div');
    div_studied.innerHTML = '<input type="text" class="form-control" id="request" name="request"placeholder="Yêu cầu">';

    request_parent.appendChild(div_studied);
})
