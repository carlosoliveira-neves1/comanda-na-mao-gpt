
import {useEffect,useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"

export default function Menu(){

const {table} = useParams()

const [items,setItems] = useState([])

useEffect(()=>{

axios.get("http://localhost:3001/menu")
.then(res=>setItems(res.data))

},[])

function order(){

axios.post("http://localhost:3001/orders",{
 tableId:table,
 total:50
})

alert("pedido enviado")

}

return(

<div style={{padding:40}}>

<h1>Cardápio</h1>

{items.map(i=>(

<div key={i.id}>

{i.name} - R${i.price}

</div>

))}

<br/>

<button onClick={order}>Enviar Pedido</button>

</div>

)

}
