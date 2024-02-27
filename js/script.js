// Accessing elements
const cardContainer = document.querySelector(".card-container");
const input = document.getElementById("input");
const popupBox = document.querySelector(".popup-box");

// fetching data from API
async function fecthMeal(url, value) {
  const data = await fetch(`${url + value}`);
  const response = await data.json();
  const meals = response.meals;

  return meals;
}

// when we write something in our input box then this function invoked
function showMeals() {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  fecthMeal(url, input.value).then((data) => {
    let clutter = "";

    const mealIds = getMealLS();

    // check if the meal does not exist then perform this operation else perform other operation
    if (data == null) {
      cardContainer.innerHTML = "No Meals Found";
      cardContainer.style.fontSize = "70px";
      cardContainer.style.fontWeight = "600";
      cardContainer.style.color = "#fff";
      // alert("Please write a valid name");
    } else {
      for (let i = 0; i < data.length; i++) {
        if (mealIds.includes(Number(data[i].idMeal))) {
          clutter += `<div class="card-content">
      <img src=${data[i].strMealThumb} alt="" class="image" />
      <h3>${data[i].strMeal}</h3>
      <div class="card-element">
        <button class="btn-details" onClick="displayPopup('${data[i].idMeal}')"><a href="#popup">More Details</a></button>
        <button id="fav${data[i].idMeal}" class="btn-fav" onClick="favList(${data[i].idMeal})"><i class="fa-solid fa-heart"></i></button>
      </div>
    </div>`;
        } else {
          clutter += `<div class="card-content">
      <img src=${data[i].strMealThumb} alt="" class="image" />
      <h3>${data[i].strMeal}</h3>
      <div class="card-element">
        <button class="btn-details" onClick="displayPopup('${data[i].idMeal}')"><a href="#popup">More Details</a></button>
        <button id="fav${data[i].idMeal}" class="btn-fav" onClick="favList(${data[i].idMeal})"><i class="fa-regular fa-heart"></i></button>
      </div>
    </div>`;
        }
      }

      cardContainer.innerHTML = clutter;
    }
  });
}

// This function show the popup, this function is for putting the data in the popup
function displayPopup(idMeal) {
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  fecthMeal(url, input.value).then((data) => {
    let clutter = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].idMeal == idMeal) {
        clutter = `<div class="x"><a href="#">x</a></div>
            <div class="popup-content">
              <div class="left">
                <div class="popup-card">
                  <img src=${data[i].strMealThumb} alt="" />
                  <h2>${data[i].strMeal}</h2>
                </div>
                <button><a href="${data[i].strYoutube}">watch video</a></button>
              </div>
              <div class="right">
                <div class="instruction">
                  <h2>Instruction</h2>
                  <p>${data[i].strInstructions}</p>
                </div>
              </div>
            </div>`;
        popupBox.innerHTML = clutter;
      }
    }
  });
}

// storing and removing data to the local storage
function favList(idMeal) {
  const fav = document.querySelector(`#fav${idMeal}`);

  if (fav.innerHTML === `<i class="fa-regular fa-heart"></i>`) {
    console.log("yes it contains class that displays blank heart");
    fav.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    addMealLS(idMeal);
    alert("your meal is added to favourite list");
  } else {
    fav.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    removeMealLS(idMeal);
    alert("your meal is removed from favourite list");
  }
}

// Fetches the Meal from the Local Storage
function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

// Add Meal to the Local Storage
function addMealLS(mealID) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealID]));
}

// Remove Meal from Local Storage
function removeMealLS(mealID) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealID))
  );
}
