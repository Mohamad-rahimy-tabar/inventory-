import CategoryView from "./CategoryView.js";
import Storage from "./storage.js";

//
const productTittle = document.getElementById("product-tittle");
const productQuantity = document.getElementById("product-quantity");
const addNewProductBtn = document.getElementById("add-product");
const searchInput = document.getElementById("product-filter");
const selectedSort = document.getElementById("product-sort");
const categoyHeader = document.querySelectorAll(".category-header");

// modal action
export const modal = document.getElementById("modal");
const editedTittle = document.getElementById("edit-tittle");
const editedQuantity = document.getElementById("edit-quantity");
const saveEditBtn = document.getElementById("save");
const cancelEditBtn = document.getElementById("cancel-edit");
//
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.productSort(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const tittle = productTittle.value;
    const quantity = productQuantity.value;
    const category = CategoryView.categorySelected;
    if (!tittle || !quantity || category === "Select Category" || category === "") {
      iziToast.warning({
        title: "Caution",
        timeout: 10000,
        position: "topRight",
        message: "You forgot important data",
      });
      return;
    }
    Storage.saveProducts({ tittle, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
    iziToast.success({
      title: "OK",
      timeout: 10000,
      position: "topRight",
      message: "Successfully Create Product!",
    });
    productTittle.value = "";
    productQuantity.value = "";
    CategoryView.categorySelected = "Select Category";
    categoyHeader.forEach((ch) => {
      ch.innerText = CategoryView.categorySelected;
    });
    iziToast.success({
      title: "!",
      position: "topRight",
      timeout: 10000,
      message: "Go to products tab to view your products!",
    });
  }

  createProductList(products) {
    let result = `<h2 class="drop-shadow-md font-bold text-center w-full text-xs sm:text-base md:text-lg lg:text-xl">Product List</h2>`;
    if (products.length === 0) result += `<h2 class="font-bold animate-bounce text-center w-full text-xs sm:text-base md:text-lg lg:text-xl">No product to show</h2>`;
    products.forEach((p) => {
      result += `<div class="flex items-center justify-between drop-shadow-lg bg-gray-100 p-2 rounded-lg">
        <!-- product tittle -->
        <div class="flex-1 text-xs lg:text-xl md:text-lg sm:text-base">
          <span class="text-black font-bold">${p.tittle}</span>
        </div>
        <!-- product feature -->
        <div class="flex items-center">
          <!-- product date -->
          <div class="ml-2 text-xs sm:ml-6 lg:text-xl sm:text-base md:text-lg">
            <span class="text-slate-500">${new Date(p.createdDate).toLocaleDateString("en-GB")}</span>
          </div>
          <!-- product category -->
          <div class="ml-2 text-xs sm:ml-6 lg:text-xl sm:text-base md:text-lg">
            <span class="text-slate-500">${p.category}</span>
          </div>
          <!-- product quantity -->
          <div class="flex items-center justify-center w-5 h-5 text-sm ml-2 bg-yellow-300 rounded-full sm:ml-6 md:h-7 md:w-7 lg:h-8 lg:w-8 lg:text-xl">
            <span>${p.quantity}</span>
          </div>
          <!-- product action -->
          <div class="flex items-center justify-between ml-4 sm:ml-6">
            <button class="edit-product mr-2 cursor-pointer hover:text-green-500" data-id=${p.id}>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button class="del-product  cursor-pointer hover:text-red-500" data-id=${p.id}>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>`;
    });
    const productDOM = document.getElementById("product-list");
    productDOM.innerHTML = result;
    // add event for delete button
    const allDeleteBtn = [...document.querySelectorAll(".del-product")];
    allDeleteBtn.forEach((b) => {
      b.addEventListener("click", (e) => this.showNotification(e));
    });
    // add event for edit button
    const allEditBtn = [...document.querySelectorAll(".edit-product")];
    allEditBtn.forEach((b) => {
      b.addEventListener("click", (e) => this.showModal(e));
    });
  }

  showNotification(e) {
    const target = e.currentTarget;
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      id: "question",
      zindex: 999,
      title: "Hey",
      message: "Are you sure you want to delete?",
      position: "center",
      buttons: [
        [
          "<button><b>YES</b></button>",
          (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            this.deleteProduct(target);
          },
        ],
        [
          "<button>NO</button>",
          (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          true,
        ],
      ],
    });
  }

  showModal(e) {
    const id = e.currentTarget.dataset.id;
    modal.classList.remove("hidden");
    saveEditBtn.addEventListener("click", () => {
      const tittle = editedTittle.value;
      const quantity = editedQuantity.value;
      const category = CategoryView.categorySelected;
      if (!tittle || !quantity || category === "Select Category" || category === "") {
        iziToast.warning({
          title: "Caution",
          timeout: 10000,
          position: "topRight",
          message: "You forgot important data",
        });
        return;
      }
      Storage.saveProducts({ id, tittle, quantity, category });
      this.products = Storage.getAllProducts();
      iziToast.success({
        title: "OK",
        timeout: 10000,
        position: "topRight",
        message: "Successfully Edit Product!",
      });
      this.createProductList(this.products);
      editedTittle.value = "";
      editedQuantity.value = "";
      CategoryView.categorySelected = "Select Category";
      categoyHeader.forEach((ch) => {
        ch.innerText = CategoryView.categorySelected;
      });
      modal.classList.add("hidden");
    });
    cancelEditBtn.addEventListener("click", () => {
      editedTittle.value = "";
      editedQuantity.value = "";
      CategoryView.categorySelected = "Select Category";
      categoyHeader.forEach((ch) => {
        ch.innerText = CategoryView.categorySelected;
      });
      modal.classList.add("hidden");
    });
  }

  deleteProduct(target) {
    const productId = target.dataset.id;
    Storage.removeProduct(productId);
    iziToast.info({
      title: "Delete",
      timeout: 10000,
      color: "yellow",
      position: "topRight",
      message: "Your selected product remove succsesfully!",
    });
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => p.tittle.includes(value));
    this.createProductList(filteredProducts);
  }

  productSort(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }
}

export default new ProductView();
