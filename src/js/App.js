import ProductView from "./ProductView.js";
import CategoryView from "./CategoryView.js";
import { modal } from "./ProductView.js";
// navbar btn
const newProductBtn = document.getElementById("new-product-page");
const newCategoryBtn = document.getElementById("new-category-page");
const productBtn = document.getElementById("product-page");

// pages
const productPage = document.getElementById("product-DOM");
const newCategoryPage = document.getElementById("new-category-DOM");
const newProductPage = document.getElementById("new-product-DOM");

// category action
const showCategoryList = document.querySelectorAll(".category-action");

// add event when loded page
document.addEventListener("DOMContentLoaded", () => {
  // show massage when loaded
  iziToast.info({
    title: "Hello",
    timeout: 10000,
    color: "yellow",
    position: "topRight",
    message: "Welcome to your inventory webapp!",
  });
  // get all category & product
  CategoryView.setApp();
  ProductView.setApp();

  // create category & product list
  CategoryView.createCategoriesList();
  ProductView.createProductList(ProductView.products);

  //
  if (CategoryView.categories.length === 0) {
    showNewCategoryPage();
    iziToast.info({
      title: "Hello",
      timeout: 10000,
      color: "yellow",
      position: "topRight",
      message: "Plese create a category in the first step!",
    });
  } else {
    showProductPage();
  }
  // show product page and hide other page when loaded
  newProductPage.classList.add("hidden");
  modal.classList.add("hidden");

  //show category list when click
  showCategoryList.forEach((c) => {
    c.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const categoryList = target.nextElementSibling;
      const chevron = target.childNodes[3].childNodes[1];
      categoryList.classList.toggle("hidden");
      chevron.classList.toggle("rotate-180");
    });
  });

  //show new category page

  newCategoryBtn.addEventListener("click", (e) => {
    showNewCategoryPage();
  });
  //show new product page
  newProductBtn.addEventListener("click", (e) => {
    showNewProductPage();
  });
  //show product page
  productBtn.addEventListener("click", (e) => {
    showProductPage();
  });
});

function showNewCategoryPage() {
  newCategoryBtn.classList.add("bg-yellow-300");
  newProductBtn.classList.remove("bg-yellow-300");
  productBtn.classList.remove("bg-yellow-300");
  newCategoryPage.classList.remove("hidden");
  newProductPage.classList.add("hidden");
  productPage.classList.add("hidden");
}

function showNewProductPage() {
  newCategoryBtn.classList.remove("bg-yellow-300");
  newProductBtn.classList.add("bg-yellow-300");
  productBtn.classList.remove("bg-yellow-300");
  newCategoryPage.classList.add("hidden");
  newProductPage.classList.remove("hidden");
  productPage.classList.add("hidden");
}

function showProductPage() {
  newCategoryBtn.classList.remove("bg-yellow-300");
  newProductBtn.classList.remove("bg-yellow-300");
  productBtn.classList.add("bg-yellow-300");
  newCategoryPage.classList.add("hidden");
  newProductPage.classList.add("hidden");
  productPage.classList.remove("hidden");
}
