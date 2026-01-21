import { useEffect } from "react"
import api from "../api/api"

const Header = () => {
  useEffect(()=>{
    api.get("/")
  },[])
  return (
    <div>Header</div>
  )
}

export default Header