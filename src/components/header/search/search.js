function showSearchForm(searchForm) {
  searchForm.classList.remove("search_closed");
  searchForm.classList.add("search_opened");
}

function closeSearchForm(searchForm) {
  searchForm.classList.remove("search_opened");
  searchForm.classList.add("search_closed");

  searchForm.reset();
}

// Open/close search box
document.querySelector(".search__btn").addEventListener("click", (event) => {
  const searchForm = document.querySelector(".search");
  const btn = searchForm.querySelector(".search__btn");

  if (searchForm.classList.contains("search_closed")) {
    showSearchForm(searchForm);
    btn.setAttribute("aria-label", "Закрыть");
    btn.setAttribute("aria-expanded", "true");
  } else {
    closeSearchForm(searchForm);
    btn.setAttribute("aria-label", "Найти");
    btn.setAttribute("aria-expanded", "false");
  }
});

// Close search box after clicking out of it.
document.body.addEventListener("click", (event) => {
  const searchForm = document.querySelector(".search");

  if (
    searchForm.classList.contains("search_opened") &&
    !searchForm.contains(event.target)
  ) {
    closeSearchForm(searchForm);
  }
});
