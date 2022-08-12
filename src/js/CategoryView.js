import Storage from "./storage.js";

const categoryTittle = document.getElementById("category-tittle");
const categoryDescription = document.getElementById("category-description");
const addNewCategoryBtn = document.getElementById("add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
    this.categorySelected = "Select Category";
  }
  //add new category
  addNewCategory(e) {
    e.preventDefault();
    const tittle = categoryTittle.value;
    const description = categoryDescription.value;
    if (!tittle || !description) {
      iziToast.warning({
        title: "Caution",
        timeout: 10000,
        position: "topRight",
        message: "You forgot important data",
      });
      return;
    }
    Storage.saveCategory({ tittle, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    iziToast.success({
      title: "OK",
      timeout: 10000,
      position: "topRight",
      message: "Successfully Create Ctegory!",
    });
    categoryTittle.value = "";
    categoryDescription.value = "";
  }
  //
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  //
  createCategoriesList() {
    // create list of category
    let result = ` <span class="category-selector hover:bg-yellow-300 px-2 py-1 cursor-pointer rounded-md text-xs sm:text-base md:text-lg ">${this.categorySelected}</span>`;
    this.categories.forEach((c) => {
      result += `<span class="category-selector hover:bg-yellow-300 px-2 py-1 cursor-pointer rounded-md text-xs sm:text-base md:text-lg">${c.tittle}</span>`;
    });
    // push list of category to DOM
    const categoryDOM = document.querySelectorAll(".category-list");
    categoryDOM.forEach((cd) => {
      cd.innerHTML = result;
    });

    const categorySelector = [...document.querySelectorAll(".category-selector")];
    categorySelector.forEach((c) => {
      c.addEventListener("click", (e) => this.setCategoryselcted(e));
    });
  }
  //
  setCategoryselcted(e) {
    const target = e.currentTarget;
    const categoyHeader = target.parentElement.previousElementSibling.childNodes[1];
    categoyHeader.innerText = target.innerText;
    this.categorySelected = target.innerText;
    target.parentElement.classList.toggle("hidden");
  }
}

export default new CategoryView();
