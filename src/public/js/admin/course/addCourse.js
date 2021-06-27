//study
const btn_studied = document.querySelector(".add-studied");
let btn_delStudied = document.querySelectorAll(".del_studied");
const txt_Student = document.querySelector(".txt_student");

//request
const btn_request = document.querySelector(".add_request");
let btn_delRequest = document.querySelectorAll(".del_request");
const txt_Request = document.querySelector(".txt_request");

const request_parent = document.querySelector(".request-parent");
const studied_parent = document.querySelector(".studied-parent");

const optionsCourse = {
    createElement: function (element, attribute, inner) {
        if (typeof (element) === "undefined") {
            return false;
        }
        if (typeof (inner) === "undefined") {
            inner = "";
        }
        var el = document.createElement(element);
        if (typeof (attribute) === 'object') {
            for (var key in attribute) {
                el.setAttribute(key, attribute[key]);
            }
        }
        if (!Array.isArray(inner)) {
            inner = [inner];
        }
        for (var k = 0; k < inner.length; k++) {
            if (inner[k].tagName) {
                el.appendChild(inner[k]);
            } else {
                el.appendChild(document.createTextNode(inner[k]));
            }
        }
        return el;
    },
    initNode: function () {
        btn_delStudied = document.querySelectorAll(".del_studied");
        btn_delRequest = document.querySelectorAll(".del_request");
    },
    renderInput: function (name, placehoder) {
        const InputNode = this.createElement(
            'input',
            {'type':'text', 'class':'form-control txt_request', 'name':name, 'placeholder':placehoder, 'required':'required'}
        )
        const iNode = this.createElement(
            'i',
            {'class':`fas fa-minus-circle del_${name} style-iconDel`}
        )
        const nodeNew = this.createElement(
            'div',
            {'class':'d-flex align-items-center justify-content-between'},
            [InputNode, iNode]
        )
        return nodeNew;
    },

    eventAdd: function () {
        btn_studied.addEventListener("click", () => {
            studied_parent.appendChild(this.renderInput('studied', 'Sẽ học được gì'));
            //load lại khi có thêm phần tử mới
            this.initNode();
            this.eventDelete();
        });
        btn_request.addEventListener("click", () => {
            request_parent.appendChild(this.renderInput('request', 'Yêu cầu'));
            //load lại khi có thêm phần tử mới
            this.initNode();
            this.eventDelete();
        });
    },
    eventDelete: function () {
        btn_delStudied.forEach(btn => {
            btn.addEventListener('click', () => {
                if (studied_parent.childElementCount > 1) btn.parentElement.remove();
            })
        })
        btn_delRequest.forEach(btn => {
            btn.addEventListener("click", () => {
                if (request_parent.childElementCount > 1) btn.parentElement.remove();
            });
        })
    },
    start: function () {
        this.eventAdd();
        this.eventDelete();
    }
}

optionsCourse.start();


