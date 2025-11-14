import React from 'react'
import { useParams } from 'react-router-dom'

const Contactitem = () => {
const {id} = useParams(); 
console.log(id);
 
  return (
    <div>Contact-item</div>
  )
}

export default Contactitem