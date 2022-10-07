//  !======================== Navbar start ====================
let left = 0;
function autoSlider() {
  let timer = setTimeout(function () {
    let polosa = document.getElementById("polosa");
    left = left - 1700;
    if (left < -4100) {
      left = 0;
      clearTimeout(timer);
    }
    polosa.style.left = left + "px";
    polosa.style.transition = "2s";
    autoSlider();
  }, 3000);
}
autoSlider();
//  ?======================== Navbar start ====================

const API = " http://localhost:8000/product";

// ? Сохранение тегов в переменные

//  инпуты и кнопки для создания новых данных
let inpDetailes = document.querySelector(".section__add_details");
let inpPrice = document.querySelector(".section__add_price");
let inpQuantity = document.querySelector(".section__add_quantity");
let inpCategory = document.querySelector(".section__add_category");
let inpSales = document.querySelector(".section__add_sales");
let inpUrl = document.querySelector(".section__add_url");
let btnAdd = document.querySelector(".section__add_btn-add");

// тег для отображения данных в браузере
let sectionRead = document.getElementById("section__read");

//  инпуты и кнопки для редоктирования
let btnEditClose = document.querySelector(".window__edit_close");
let inpEditDetailes = document.querySelector(".window__adit_details");
let inpEditPrice = document.querySelector(".window__adit_price");
let inpEditQuantity = document.querySelector(".window__adit_quantity");
let inpEditCategory = document.querySelector(".window__adit_category");
let inpEditSales = document.querySelector(".window__adit_sales");
let inpEditUrl = document.querySelector(".window__adit_url");
let btnEditSave = document.querySelector(".window__adit_btn-save");
let mainModal = document.querySelector(".main-modal");

// инпут и переменная для поиска
let inpSearch = document.querySelector(".nav__right_inp-search");
let searchValue = inpSearch.value;

// кнопки для пагинации
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let currentPage = 1;

// ! =========== Кодовое слово ==========
// let pinCode = prompt("Введите кодовое слово:");
// let section__add = document.querySelector(".section__add");
// let admin_panel_arr = document.getElementsByClassName("admin-panel");
// if (pinCode !== "Jaku") {
//   setTimeout(() => {
//     for (let i of admin_panel_arr) {
//       console.log(i);
//       i.style.display = "none";
//     }
//   }, 100);
//   section__add.style.display = "none";
// } else {
//   setTimeout(() => {
//     for (let i of admin_panel_arr) {
//       console.log(i);
//       i.style.display = "block";
//     }
//   }, 1000);
//   section__add.style.display = "block";
// }

// ! ========================== Create Start ======================
function createProduct(parametr) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(parametr),
  }).then(() => readProdutcs());
}

btnAdd.addEventListener("click", () => {
  if (
    !inpDetailes.value.trim() ||
    !inpPrice.value.trim() ||
    !inpQuantity.value.trim() ||
    !inpCategory.value.trim() ||
    !inpSales.value.trim() ||
    !inpUrl.value.trim()
  ) {
    alert("Заполните поля");
    return;
  }
  let obj = {
    detailes: inpDetailes.value,
    price: inpPrice.value,
    quntity: inpQuantity.value,
    category: inpCategory.value,
    sale: inpSales.value,
    urlImg: inpUrl.value,
  };

  createProduct(obj);
  inpDetailes.value = "";
  inpPrice.value = "";
  inpQuantity.value = "";
  inpCategory.value = "";
  inpSales.value = "";
  inpUrl.value = "";
});
// ? ========================== Create finish ======================

// ! ========================== Read start ======================

function readProdutcs() {
  fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=6`)
    .then(res => res.json())
    .then(data => {
      sectionRead.innerHTML = "";
      data.forEach(product => {
        sectionRead.innerHTML += `
        <div class="card">
        <h2>${product.category}</h2>
        <img
          class="card__Bg"
          src=${product.urlImg}
          alt=${product.category}
        />
        <span class="card__price">${product.price}</span>
        <span class="sales">${product.sale}</span>
        <p>
          ${product.detailes}
        </p>
        <div class="admin-panel">
        <img
          src="https://cdn-icons-png.flaticon.com/512/216/216658.png"
          alt="delete"
          width="40"
          id=${product.id}
          class="read__delete"
          onclick="deleteProduct(${product.id})"
        />
        <img
          width="40"
          src="https://svgsilh.com/svg_v2/1103598.svg"
          alt="edit"
          onclick="handleEditBtn(${product.id})"
        />
        </div>
      </div>
      `;
      });
    });
  pageTotal();
}
readProdutcs();
// ? ========================== Read finish ======================
// ! =========================== Edit start ======================
function editProduct(id, editedObj) {
  if (
    !inpEditDetailes.value.trim() ||
    !inpEditPrice.value.trim() ||
    !inpEditQuantity.value.trim() ||
    !inpEditCategory.value.trim() ||
    !inpEditSales.value.trim() ||
    !inpEditUrl.value.trim()
  ) {
    alert("Заполните поля");
    return;
  }

  fetch(`${API}/${id}`, {
    method: "PATCH", //PUT меняет обьект целиком. PATCH меняет только те ключи, которые нужны
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedObj),
  }).then(() => readProdutcs());
}

let editId = "";

function handleEditBtn(id) {
  mainModal.style.display = "block";
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(productObj => {
      inpEditDetailes.value = productObj.detailes;
      inpEditPrice.value = productObj.price;
      inpEditQuantity.value = productObj.quntity;
      inpEditCategory.value = productObj.category;
      inpEditSales.value = productObj.sale;
      inpEditUrl.value = productObj.urlImg;
      editId = productObj.id;
    });
}

btnEditClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnEditSave.addEventListener("click", () => {
  let editedObj = {
    detailes: inpEditDetailes.value,
    price: inpEditPrice.value,
    quntity: inpEditQuantity.value,
    sale: inpEditSales.value,
    category: inpEditCategory.value,
    urlImg: inpEditUrl.value,
  };
  editProduct(editId, editedObj);
  mainModal.style.display = "none";
});
// ? =========================== Edit end ========================

// ! ========================== Delete Start ======================
// todo первый вариант для удаления
// document.addEventListener("click", e => {
//   let delete_class = [...e.target.classList];
//   if (delete_class[0] === "read__delete") {
//     // console.log(e.target.id);
//     fetch(`${API}/${e.target.id}`, {
//       method: "DELETE",
//     }).then(() => readProdutcs());
//   }
// });

function deleteProduct(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readProdutcs());
}

// ? ========================== Delete finish ======================

// ! ========================== Search start =======================
inpSearch.addEventListener("input", e => {
  searchValue = e.target.value;
  readProdutcs();
});
// ? ========================== Search finish ======================
// ! ========================== paginate start =======================
let countPage = 1;
function pageTotal() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      countPage = Math.ceil(data.length / 6);
    });
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readProdutcs();
});

nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readProdutcs();
});
// ? ========================== paginate finish ======================
// readProdutcs();
