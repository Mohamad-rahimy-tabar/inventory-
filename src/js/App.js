import CategoryView from "./CategoryView.js";

// navbar btn
const newProductBtn = document.getElementById("new-product-page");
const newCategoryBtn = document.getElementById("new-category-page");
const productBtn = document.getElementById("product-page");

// pages
const productPage = document.getElementById("product-DOM");
const newCategoryPage = document.getElementById("new-category-DOM");
const newProductPage = document.getElementById("new-product-DOM");

// add event when loded page
document.addEventListener("DOMContentLoaded", () => {
  // get all category
  CategoryView.setApp();
  // create category list
  CategoryView.createCategoriesList();
  // show product page when loaded
  newCategoryPage.classList.add("hidden");
  newProductPage.classList.add("hidden");
  //
  newCategoryBtn.addEventListener("click", (e) => {
    newCategoryBtn.classList.add("bg-yellow-300");
    newProductBtn.classList.remove("bg-yellow-300");
    productBtn.classList.remove("bg-yellow-300");
    newCategoryPage.classList.remove("hidden");
    newProductPage.classList.add("hidden");
    productPage.classList.add("hidden");
  });
  //
  newProductBtn.addEventListener("click", (e) => {
    newCategoryBtn.classList.remove("bg-yellow-300");
    newProductBtn.classList.add("bg-yellow-300");
    productBtn.classList.remove("bg-yellow-300");
    newCategoryPage.classList.add("hidden");
    newProductPage.classList.remove("hidden");
    productPage.classList.add("hidden");
  });
  //
  productBtn.addEventListener("click", (e) => {
    newCategoryBtn.classList.remove("bg-yellow-300");
    newProductBtn.classList.remove("bg-yellow-300");
    productBtn.classList.add("bg-yellow-300");
    newCategoryPage.classList.add("hidden");
    newProductPage.classList.add("hidden");
    productPage.classList.remove("hidden");
  });
});
