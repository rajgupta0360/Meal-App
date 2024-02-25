

// Accessing the favourite meal container
const cardContainer = document.querySelector(".card-container");

// Accessing the pop-up container
const popupBox = document.querySelector(".popup-box");

fetchFavMeals();

// Fetches the Meal from Local Storage
function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

// Fetches the Meal based on the ID associated with it
async function getMealById(id) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

// It Performs Operation to fetch favourite Meals
async function fetchFavMeals() {
  cardContainer.innerHTML = "";
  const mealIds = getMealLS();
  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const mealID = mealIds[i];
    let meal = await getMealById(mealID);
    addMealToFav(meal);
    meals.push(meal);
  }
}

// Function to add Meal to Favourites page
function addMealToFav(meal) {
  let clutter = `
  <div class="card-content">
  <img src=${meal.strMealThumb} alt="" class="image" />
  <h3>${meal.strMeal}</h3>
  <div class="card-element">
    <button class="btn-details" onClick="showMealDetails('${meal.idMeal}')"><a href="#popup">More Details</a></button>
    <button id="fav${meal.idMeal}" class="btn-fav" onClick="favList(${meal.idMeal})"><i class="fa-solid fa-heart"></i></button>
  </div>
</div>`;

  cardContainer.innerHTML += clutter;
}

function showMealDetails(idMeal) {
  getMealById(idMeal).then((data) => {
    console.log(data);
    let clutter = "";
    if (data.idMeal == idMeal) {
      clutter = `<div class="x"><a href="#">x</a></div>
              <div class="popup-content">
                <div class="left">
                  <div class="popup-card">
                    <img src=${data.strMealThumb} alt="" />
                    <h2>${data.strMeal}</h2>
                  </div>
                  <button><a href="${data.strYoutube}">watch video</a></button>
                </div>
                <div class="right">
                  <div class="instruction">
                    <h2>Instruction</h2>
                    <p>${data.strInstructions}</p>
                  </div>
                </div>
              </div>`;
      popupBox.innerHTML = clutter;
    }
  });
}

function favList(idMeal) {
  const btn = document.querySelector(".btn-fav");
  console.log(btn.className);
  const fav = document.querySelector(`#fav${idMeal}`);
  if (fav.innerHTML === `<i class="fa-solid fa-heart"></i>`) {
    fav.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    removeMealLS(idMeal);
    location.reload();
    alert("your meal is removed from favourite list");
  }

  console.log(fav);
  console.log(fav.innerHTML);
}

// Remove the favourite Meals
function removeMealLS(mealID) {
  console.log(mealID);
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealID))
  );
}
