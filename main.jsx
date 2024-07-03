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


let foodUser = new FoodUser(recipes, foodSchedule, currentFoods);




function FoodList() {
    const [ReactIngrediants, setReactIngrediants] = React.useState(foodUser.currentFoods)
    

    function change_food_amount(foodName, amount) {
        foodUser.currentFoods[foodName] += amount;
        setReactIngrediants({...foodUser.currentFoods})

    }
    function delete_food(foodName) {
        delete foodUser.currentFoods[foodName];
        setReactIngrediants({...foodUser.currentFoods})
    }
    function add_food() {
        const new_food = prompt("Enter new food");
        if (new_food == null) return;
        if (foodUser.currentFoods[new_food]) return;
        foodUser.currentFoods[new_food] = 0;
        setReactIngrediants({...foodUser.currentFoods})
    }

    return (
        <div className="ingredients">
            <h1>Food List</h1>
            <button className="add" onClick={add_food}>add_food</button>
            <main>
                {Object.keys(foodUser.currentFoods).map((foodName, index) => (
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

