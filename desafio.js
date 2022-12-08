import express from 'express'
let app = express();
//Mañana lo termino perdon 

class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts = () => { return this.products }

    generateID = () => {
        const count = this.products.length

        if (count == 0) return 1;

        const lastProduct = this.products[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }

    
    validateFields = (title, description, price, thumbnail, stock, code) =>{
        if((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined || price == "") || (thumbnail== undefined || thumbnail== "") || (code == undefined) || (stock == undefined || stock == "")){
            console.log("ERROR AL AGREGAR PRODUCTO: TODOS LOS CAMPOS SON OBLIGATORIOS")
            return false;
        }else{
            return true;
        }
    }

    duplicateCode = (code) => { 
        const product = this.products.find(product => product.code === code)
        if(product == undefined){
            return true;
        } else if(product != undefined){ 
            console.log(`ERROR: El codigo "${code}" no puede repetirse`);
            return false;
        }
    }

    addProduct = (title, description, price, thumbnail, stock, code) => {
        const id = this.generateID()

        const product = {
            id,
            title,  
            description,
            price,
            thumbnail,
            stock,
            code
        }

        if(this.duplicateCode(code) && this.validateFields(title, description, price, thumbnail, stock, code)){
            this.products.push(product)
        }
    }


    getProductByID = (id) => {
        const productFound = this.products.find(product => product.id === id)
        return productFound || console.log(`Not Found`)
    }
}

const manager = new ProductManager()

getProducts = () => {return this.products}; //muestra el array sin productos


manager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)

//productos a agregar
manager.addProduct(
    "Iphone 13",
    "Apple",
    140000,
    "N/A",
    5,
    "555"
)

manager.addProduct(
    "PlayStation 4",
    "Sony Entertainment",
    100000,
    "N/A",
    3,
    "def456"
)


//Arroja error porque le falta el title
manager.addProduct(
    "Producto sin titulo",
    12345,
    "N/A",
    35,
    "jkl123"
)

//Tiene code repetido , por lo tanto no se agrega
manager.addProduct(
    "producto 3",
    "descripción 3",
    123,
    "N/A",
    35,
    "ghi789"
)

console.log(manager.getProducts()); //Mostrar los productos en consola

console.log("----------------------------")
console.log("PRODUCTO SELECCIONADO:", manager.getProductByID(2)); //Traer producto por id , en este caso el 2
console.log("----------------------------")
console.log(manager.getProductByID(6)); //Error porque el id llamado no existe