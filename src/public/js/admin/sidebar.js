// const itemsClick = document.querySelectorAll('.nav-admin')

// const app = {
//     //phương thức xóa class đang active
//     removeActive: function (t) {
//         itemsClick.forEach(item => {
//             item.classList.remove('nav__admin-active');
//         })
//     },

//     handleClick: function(){
//         itemsClick.forEach((item, index) => {
//             item.addEventListener('click', e => {
//                 e.preventDefault();
//                 if(e.target.closest('.nav-admin:not(.nav__admin-active)')){
//                     this.removeActive();
//                     itemsClick[index].classList.add('nav__admin-active');
//                 }
//             })
//         })
//     },

//     //phương thức gọi thực thi 
//     start: function () {
//         this.handleClick();
//     }
// }
// app.start();