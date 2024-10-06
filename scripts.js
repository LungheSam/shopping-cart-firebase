import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase,ref,push,onValue,remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';



const appSettings={
    databaseUrl:"https://shopping-cart-firebase-d0699-default-rtdb.firebaseio.com/",
    projectId:'shopping-cart-firebase-d0699'
}
const app=initializeApp (appSettings);
const database=getDatabase(app);
const shoppingList=ref(database,"Shpping List");

onValue(shoppingList,function (snapshot) {
        clearShoppingListElements();
        if (snapshot.exits()){
            let shoppingListArray=Object.entries(snapshot.val());
            for (let i=0; i<shoppingListArray.length; i++){
                let currentItem=shoppingListArray[i];
                let currentItemID=currentItem[0];
                let currentItemValue=currentItem[1];
                addItemtotheShoppingListElement(currentItemValue,currentItemID);
            }
        }
        else{
            shopping_list_element.innerHTML='<h2>No Items here yet</h2>';
        }

    }
)




const input_field = document.getElementById('input-field');
const submit_btn= document.getElementById('submit-btn');
const shopping_list_element = document.getElementById('shopping-list');










submit_btn.addEventListener('click',()=>{
    const inputValue=input_field.value
    push(shoppingList,inputValue);
    // addItemtotheShoppingListElement(inputValue);
    clearInputValue()

    
    
})

function clearInputValue() {
    input_field.value = '';
}
function addItemtotheShoppingListElement(itemValue,itemID){
    const item=document.createElement('li');
    item.innerHTML=itemValue;
    item.id=itemID;
    item.addEventListener('dblclick',()=>{
        let exactLocationOfItemInDB=ref(database,`Shpping List/${item.id}`);
        remove(exactLocationOfItemInDB);
    })
    shopping_list_element.appendChild(item);
}
function clearShoppingListElements(){
    shopping_list_element.innerHTML='';
}

