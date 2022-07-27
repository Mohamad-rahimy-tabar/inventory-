import Storage from "./storage.js";

const categoryTittle = document.getElementById("category-tittle");
const categoryDescription = document.getElementById("category-description");
const addNewCategoryBtn = document.getElementById("add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const tittle = categoryTittle.value;
    const description = categoryDescription.value;
    if (!tittle || !description) {
      swal("Oops", "Tittle Or Description emty!", "error");
      return;
    }
    Storage.saveCategory({ tittle, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    swal("Create Category Welldone");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    // create list of category
    let result = `<option class="bg-gray-400" value="">Select Category</option>`;
    this.categories.forEach((c) => {
      result += `<option class="bg-gray-400" value=${c.id}>${c.tittle}</option>`;
    });
    // push list of category to DOM
    const categoryDOM = document.getElementById("product-category");
    categoryDOM.innerHTML = result;
  }
}

export default new CategoryView();
