//1.a 
const listItem = $('li');
console.log(listItem);

//1.b 
const navBar = $('.navbar-brand');
console.log(navBar);

//2.a
//a. Válassz ki egy kategóriát, és utána írd ki a konzolra az összes benne lévő list-group-item stílusosztályú elemet!

const categories = $('card');
const categoryItems = categories.first().find('list-group-item');
console.log(categoryItems);


//b. Válassz ki egy ételhez tartozó linket az oldalon, és add meg a kategóriája nevét!
const foodLinks = $('.list-group-item > a');
const foodCategories = foodLinks
    .closest('.card')
    .find('.card-header');
console.log(foodCategories.text());

foodCategories.each((i,elem) => {
    console.log($(elem).text());
})


