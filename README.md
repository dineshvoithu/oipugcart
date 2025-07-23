# 🛍️ OipugCart Product Listing App

A responsive React + Redux application to browse, search, filter, and favourite products from an API.

---

## 🚀 Live Demo

🔗 [View Live on Vercel](https://oipugcart.vercel.app)

---

## 🔧 Tech Stack

- ⚛️ React with Vite
- 🎯 Redux Toolkit with `createAsyncThunk`
- 🧪 Vitest + React Testing Library
- 💨 Tailwind CSS for styling
- 📦 Axios for data fetching
- 🌐 Hosted on Vercel

---

## 📦 Features

- 🔍 **Search** products by keyword
- 🧼 **Filter** by category
- 📊 **Sort** by price (asc/desc)
- ❤️ **Favourite** products with persistence (`localStorage`)
- ⏳ Loading and error handling for async calls
- 🧪 Full unit + integration test coverage for Redux slices and UI components

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dineshvoithu/oipugcart.git
cd oipug
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm run dev
```

> Open your browser and navigate to: `http://localhost:5173`

---

## 🧪 Running Tests

This project uses [Vitest](https://vitest.dev/) and React Testing Library for unit and integration testing.

### ➤ Run all tests

```bash
npx vitest run
```

### ➤ Run tests in watch mode

```bash
npx vitest
```

### ➤ Run test coverage report

```bash
npx vitest run --coverage
```

> Coverage reports will be available in the `/coverage` folder.
> Open `coverage/index.html` in a browser for full visual breakdown.

---

## 📁 Project Structure

```
project-root/
├── public/
│   └── index.html
├── coverage/                      # Test coverage reports (via `vitest --coverage`)
├── src/
│   ├── app/
│   │   └── store.js               # Redux store setup
│
│   ├── components/                # Reusable UI components
│   │   ├── FilterSortBar.jsx
│   │   ├── FilterSortBar.test.jsx # Done
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.test.jsx   # Done
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.test.jsx     # Done
│   │   └── Navbar.jsx             
│
│   ├── features/                 # Redux slices (modular structure)
│   │   ├── favourites/
│   │   │   ├── favouritesSlice.js
│   │   │   └── favouritesSlice.test.js # Done
│   │   ├── filters/
│   │   │   ├── filtersSlice.js
│   │   │   └── filtersSlice.test.js   # Done
│   │   └── products/
│   │       ├── productsSlice.js
│   │       └── productsSlice.test.js  # Done
│
│   ├── pages/                    # Page-level components
│   │   ├── Favourites.jsx
│   │   ├── Favourites.test.jsx    # Done
│   │   ├── ProductList.jsx
│   │   ├── ProductList.test.jsx   # Done
│   │   └── ProductDetail.jsx      
│
│   ├── App.jsx                   # Main app with routes
│   ├── main.jsx                  # App entry point
│   └── setupTests.js            # Vitest + RTL setup
│
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js               # Vite + Vitest configuration
├── README.md                    # Complete project docs
├── package.json
└── .gitignore

```

---

## 📊 Test Coverage Snapshot

As of the latest run (`npx vitest run --coverage`):

```
Statements   : 61.65%
Branches     : 82.14%
Functions    : 66.66%
Lines        : 61.65%
```

✅ **Redux slices:** 100% test coverage  
🧪 **Components & Pages:** All covered **except** `Navbar` and `ProductDetail`

🔗 **Full HTML coverage report**: [https://coverage-report.surge.sh](https://coverage-report.surge.sh)

---

## 📝 Notes

- API used: [https://fakestoreapi.com](https://fakestoreapi.com)
- Favourites are stored in `localStorage`
- Fully responsive layout using Tailwind CSS
- Built with scalable folder structure

---

## ✅ Todos (Optional Enhancements)

- [ ] Pagination
- [ ] Product detail view
- [ ] Add to cart functionality

---

## 📄 License

This project is licensed under the MIT License.
