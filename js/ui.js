//setup materialize components
document.addEventListener("DOMContentLoaded", function(){
  var modals=document.querySelectorAll(".modal");
  M.Modal.init(modals);
  var items=document.querySelectorAll(".collaspible");
  M.Collapsible.init(items);
});

document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
    // Add Tasks
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
  });

  
  const mealList =document.querySelector('.view-meal');

  const renderMeal = (data, id) => {
    const html=`
      <div class="view-meal card" data-id ="${id}">
       <div class="card-image waves-effect waves-block waves-light">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${data.mealname}<i class="material-icons right">more_vert</i></span>
            <p><b>Fat: </b>${data.fat}g  <b>Carbs: </b>${data.carbs}g  <b>Protein: </b>${data.protein}g</p>
            <br>
            <div class="meal-delete">
              <i class="material-icons" data-id ="${id}">delete_outline</i>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${data.mealname}<i class="material-icons right">close</i></span>
            <p><b>Fat: </b>${data.fat}g  <b>Carbs: </b>${data.carbs}g  <b>Protein: </b>${data.protein}g</p>
            <p>
            <b>Starting BG</b>${data.bg}<br>
            <b>Date/Time: </b>${data.timestamp}<br>
            <b>Insulin: </b>${data.insulin} units<br>
            <b>Feedback :</b>${data.feedback}
            </p>
          </div>
      </div>
      `;
      mealList.innerHTML += html;
    
}


//remove task from DOM
const removeMeal = (id) => {
  const mealList = document.querySelector(`.view-meal[data-id =${id}]`);
  console.log(id)
  console.log(mealList);
  mealList.remove();
};
