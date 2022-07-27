const Products = [
  {
    id: 1,
    tittle: "html",
    quantity: 1,
    category: "Frontend",
    createdDate: "2022-07-24T14:36:00.663Z",
  },
  {
    id: 2,
    tittle: "css",
    quantity: 2,
    category: "Frontend",
    createdDate: "2022-07-24T14:36:42.702Z",
  },
];
const Category = [
  {
    id: 1,
    tittle: "Frontend",
    description: "fronted applicatins",
    createdDate: "2022-07-24T12:21:10.873Z",
  },
  {
    id: 2,
    tittle: "Backend",
    description: "backend application",
    createdDate: "2022-07-24T12:25:58.240Z",
  },
];

export default class Storage {
  // make uniq id
  static idMaker(selector) {
    // id make for categories or products
    const savedItems = selector === "category" ? Storage.getAllCategories() : Storage.getAllProducts();
    let id = 1;
    while (savedItems.some((c) => c.id === id)) {
      id++;
    }
    return id;
  }
  // get all categories from localstorage
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
    });
    return sortedCategories;
  }
  //   save category to localstorage
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    // swich between edit or save
    if (existedItem) {
      // edit category
      existedItem.tittle = categoryToSave.tittle;
      existedItem.description = categoryToSave.description;
    } else {
      // new category
      categoryToSave.id = Storage.idMaker("category");
      categoryToSave.createdDate = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }
  // get all products from localstorage
  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
    });
    return sortedProducts;
  }
  // save products to localstorage
  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((c) => c.id === productToSave.id);
    // swich between edit or save
    if (existedItem) {
      // edit category
      existedItem.tittle = productToSave.tittle;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      // new category
      productToSave.id = Storage.idMaker("products");
      productToSave.createdDate = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
