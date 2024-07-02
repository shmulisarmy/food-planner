function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



class FoodUser {
    constructor(recipes, foodSchedule, currentFoods) {
        this.scheduleState = []; // Array to store schedule state
        this.recipes = recipes;
        this.foodSchedule = foodSchedule;
        this.currentFoods = currentFoods;
    }

    _canMake(foodName, amount) {
        if (!(foodName in this.recipes)) return false;

        for (let reqIngredient in this.recipes[foodName]) {
            let reqIngredientAmount = this.recipes[foodName][reqIngredient];
            if (!(reqIngredient in this.copyOfCurrentFoods)) return false;
            if (this.copyOfCurrentFoods[reqIngredient] < amount * reqIngredientAmount) return false;
        }
        return true;
    }

    _useIngredients(foodName, amount) {
        for (let reqIngredient in this.recipes[foodName]) {
            let reqIngredientAmount = this.recipes[foodName][reqIngredient];
            this.copyOfCurrentFoods[reqIngredient] -= amount * reqIngredientAmount;
        }
    }

    calculateFoodSchedule() {
        this.scheduleState = [];
        this.copyOfCurrentFoods = Object.assign({}, this.currentFoods);
        for (let day_index = 0; day_index < this.foodSchedule.length; day_index++) {
            let day = this.foodSchedule[day_index];
            const dayState = []
            console.log(`day ${day_index + 1}: `);
            for (let foodName in day) {
                let amount = day[foodName];
                console.log(`  ${foodName}: ${amount}`);
                if (this._canMake(foodName, amount)) {
                    this._useIngredients(foodName, amount);
                    dayState.push({ foodName, amount, canMake: true });
                } else {
                    dayState.push({ foodName, amount, canMake: false });
                }
            }
            this.scheduleState.push(dayState);
        }
        console.log(this.scheduleState)
        return this.scheduleState
    }



}

// Example usage:
let recipes = {
    "chocolate chip cookies": {
        "flour": 1,
        "sugar": 2,
        "butter": 1,
        "chocolate chips": 10,
        "baking soda": 1,
        "vanilla extract": 1,
        "brown sugar": 1,
        "shredded coconut": 1,

    },
    "mac and cheese": {
        "macaroni": 12,
        "cheese": 10,
        "milk": 2,
        "butter": 1,
        "salt": 1,
        "parmesan cheese": 2,
        "paprika": 1,
    },
    "tiramisu": {
        "mascarpone cheese": 10,
        "espresso": 10,
        "sugar": 2,
        "eggs": 12,
        "cocoa powder": 1,
        "salt": 1,
        "sugar substitute": 1,
    },
    "baked potatoes": {
        "potatoes": 4,
        "salt": 1,
        "butter": 1,
        "sour cream": 1,
        "chives": 1,
        "cheddar cheese": 2,
    },
    "carrots yogurt": {
        "carrots": 1,
        "yogurt": 2,
    }
}
let foodSchedule = [
    { "baked potatoes": 1 },
    { "baked potatoes": 1, "tiramisu": 2 },
    { "baked potatoes": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "carrots yogurt": 2, "chocolate chip cookies": 2, "mac and cheese": 1, "baked potatoes": 1, "tiramisu": 1 },
    { "apples": 4, "oranges": 3 },
    { "milk": 2, "bread": 5 },
    { "cheese": 12, "bananas": 10, "eggs": 12 },
    { "peanut butter": 3, "jelly": 2 },
    { "almonds": 7, "crackers": 13, "hummus": 4 },
    { "nuts": 15, "salsa": 1, "sour cream": 1 },
    { "yogurt": 10, "carrots": 5, "corn": 12 },
    { "broccoli": 7, "spinach": 15, "tofu": 10 },
    { "coffee": 1, "tea": 1 },
    { "baked potatoes": 2, "tiramisu": 3, "mac and cheese": 4 },
    { "apples": 6, "oranges": 4, "milk": 2 },
    { "bread": 8, "cheese": 14, "bananas": 12 },
    { "eggs": 16, "peanut butter": 5, "jelly": 3 },
    { "almonds": 9, "crackers": 15, "hummus": 6 },
    { "nuts": 18, "salsa": 3, "sour cream": 2 },
    { "yogurt": 12, "carrots": 6, "corn": 14 },
    { "broccoli": 8, "spinach": 16, "tofu": 12 },
    { "coffee": 2, "tea": 2 },
    { "baked potatoes": 3, "tiramisu": 4, "mac and cheese": 5 },
    { "apples": 7, "oranges": 5, "milk": 3 },
    { "bread": 9, "cheese": 15, "bananas": 13 },
    { "eggs": 18, "peanut butter": 6, "jelly": 4 },
    { "almonds": 11, "crackers": 17, "hummus": 7 },
    { "nuts": 20, "salsa": 4, "sour cream": 3 },
    { "yogurt": 14, "carrots": 7, "corn": 16 },
    { "broccoli": 9, "spinach": 18, "tofu": 14 },
    { "coffee": 3, "tea": 3 },
    { "baked potatoes": 2, "carrots": 4, "corn": 6, "cheese": 8 },
    { "bread": 7, "almonds": 12, "eggs": 14, "peanut butter": 10 },
    { "tiramisu": 5, "mac and cheese": 6, "bananas": 9 },
    { "spinach": 4, "tofu": 5, "nuts": 11 },
    { "crackers": 3, "hummus": 8, "jelly": 7 },
    { "coffee": 4, "tea": 5, "salsa": 2 },
    { "apples": 5, "yogurt": 6, "sour cream": 3 },
    { "carrots yogurt": 1, "baked potatoes": 2 },
    { "bread": 4, "cheese": 5, "oranges": 7 },
    { "milk": 3, "chocolate chip cookies": 6 },
    { "mac and cheese": 4, "nuts": 5, "tiramisu": 6 },
    { "spinach": 7, "tofu": 8, "broccoli": 9 },
    { "carrots": 6, "corn": 7, "crackers": 5 },
    { "apples": 3, "yogurt": 4, "bananas": 5 },
    { "bread": 6, "cheese": 7, "hummus": 8 },
    { "peanut butter": 5, "jelly": 4, "eggs": 3 },
    { "coffee": 6, "tea": 7, "salsa": 4 },
    { "carrots yogurt": 2, "baked potatoes": 3 },
    { "bread": 5, "cheese": 6, "oranges": 8 },
    { "milk": 4, "chocolate chip cookies": 7 },
    { "mac and cheese": 5, "nuts": 6, "tiramisu": 7 },
    { "spinach": 8, "tofu": 9, "broccoli": 10 },
    { "carrots": 7, "corn": 8, "crackers": 6 },
    { "apples": 4, "yogurt": 5, "bananas": 6 },
    { "bread": 7, "cheese": 8, "hummus": 9 },
    { "peanut butter": 6, "jelly": 5, "eggs": 4 },
    { "coffee": 7, "tea": 8, "salsa": 5 },
];

let currentFoods = {
    "apples": 4,
    "oranges": 3,
    "milk": 2
    , "bread": 5,
    "cheese": 12,
    "bananas": 10,
    "eggs": 12,
    "peanut butter": 3,
    "jelly": 2
    , "almonds": 7,
    "crackers": 13,
    "hummus": 4,
    "nuts": 15,
    "salsa": 1,
    "sour cream": 1,
    "yogurt": 10,

    "carrots": 5,
    "corn": 12,
    "broccoli": 7,
    "spinach": 15,
    "tofu": 10,
    "coffee": 1,
    "tea": 1,
};

let initialCurrentFoods = {
    "apples": 4,
    "oranges": 3,
    "milk": 2
    , "bread": 5,
    "cheese": 12,
    "bananas": 10,
    "eggs": 12,
    "peanut butter": 3,
    "jelly": 2
    , "almonds": 7,
    "crackers": 13,
    "hummus": 4,
    "nuts": 15,
    "salsa": 1,
    "sour cream": 1,
    "yogurt": 10,

    "carrots": 5,
    "corn": 12,
    "broccoli": 7,
    "spinach": 15,
    "tofu": 10,
    "coffee": 1,
    "tea": 1,
};


function FoodList() {
    const [currentFoods, setCurrentFoods] = React.useState(initialCurrentFoods)
    

    function change_food_amount(foodName, amount) {
        currentFoods[foodName] += amount;
        setCurrentFoods({...currentFoods})

    }
    function delete_food(foodName) {
        delete currentFoods[foodName];
        setCurrentFoods({...currentFoods})
    }
    function add_food() {
        const new_food = prompt("Enter new food");
        if (new_food == null) return;
        if (currentFoods[new_food]) return;
        currentFoods[new_food] = 0;
        setCurrentFoods({...currentFoods})
    }

    return (
        <div className="ingredients">
            <h1>Food List</h1>
            <button className="add" onClick={add_food}>add_food</button>
            <main>
                {Object.keys(currentFoods).map((foodName, index) => (
                    <div key={foodName} className={"ingredient"}>
                        <button onClick={() => change_food_amount(foodName, -1)}>-1</button>
                        <button onClick={() => change_food_amount(foodName, 1)}>+1</button>
                        {foodName}: {currentFoods[foodName]}
                        <button onClick={() => delete_food(foodName)} className="x">delete_food</button>
                    </div>
                ))}
            </main>
        </div>
    )
}





const popover = document.getElementById("popover");
const popover_submit = document.querySelector(".popover-botton");
let popover_clicked;
popover_submit.onClick = () => {
    popover.style.display = "none";
    popover_clicked = true;
}





let foodUser = new FoodUser(recipes, foodSchedule, currentFoods);


function App() {
    const [can_makes, setcan_makes] = React.useState(foodUser.calculateFoodSchedule())


    function create_day() {
        foodUser.foodSchedule.push([])
        can_makes.push([])
        setcan_makes([...can_makes])
    }

    function delete_day(day_index) {
        delete foodUser.foodSchedule[day_index]
        const new_can_makes = foodUser.calculateFoodSchedule();
        setcan_makes(new_can_makes)
    }

    function change_food_amount(day_index, foodName, change_by_amount) {
        console.log('debug', day_index, foodName, change_by_amount)
        foodUser.foodSchedule[day_index][foodName] += change_by_amount;
        const new_can_makes = foodUser.calculateFoodSchedule();
        setcan_makes(new_can_makes)
    }

    function delete_food(day_index, food_name) {
        delete foodUser.foodSchedule[day_index][food_name]
        const new_can_makes = foodUser.calculateFoodSchedule();
        setcan_makes(new_can_makes)
    }

    function add_food(day_index) {
        popover_clicked = false;
        popover.style.display = "block";
        if (!foodUser.foodSchedule[day_index][new_food]) {
            foodUser.foodSchedule[day_index][new_food] = 0
            new_food = false
            const new_can_makes = foodUser.calculateFoodSchedule();
            setcan_makes(new_can_makes)
        }
    }

    return (
        <AppContext.Provider value={delete_food}>
            <FoodList/>
            <main>
                {can_makes.map((day, day_index) =>
                    <Day_display delete_day={delete_day} day={day} day_index={day_index} change_food_amount={change_food_amount} add_food={add_food} />
                )}
                <button onClick={create_day}>create_day</button>
            </main>
        </AppContext.Provider>
    );
}

function Day_display({ day_index, day, change_food_amount, delete_day, add_food }) {
    return (<div key={day_index} className="day">
        <h2>Day {day_index + 1}</h2>
        <ul className="food-list">
            {day.map((food, food_index) => {
                return <Dish food_index={food_index} change_food_amount={change_food_amount} day_index={day_index} food={food} />;
            })}
        </ul>
        <button className="add" onClick={() => add_food(day_index, 'chicken')}>add chicken</button>
        <button className="x" onClick={() => { delete_day(day_index) }}>remove all meals</button>
    </div>);
}


function Dish({ food_index, change_food_amount, day_index, food }) {
    return (<div key={food_index} className={food.canMake ? "can-make dish" : "cannot-make dish"}>
        {food.foodName}: {food.amount}
        <Buttons change_food_amount={change_food_amount} day_index={day_index} food_index={food_index} food={food} />
    </div>);
}

function Buttons({ change_food_amount, day_index, food_index, food }) {
    const delete_food = React.useContext(AppContext)

    return (<div className="buttons">
        <div className="flex">
            <button onClick={() => change_food_amount(day_index, food.foodName, -1)}>-1</button>
            <button onClick={() => change_food_amount(day_index, food.foodName, 1)}>+1</button>
        </div>
        <button className="delete" onClick={() => delete_food(day_index, food.foodName)}>x</button>

    </div>);
}



const AppContext = React.createContext();


async function setup_page(){

    await sleep(200)
    
    ReactDOM.render(<App />, document.getElementById('root'));
}

setup_page()

