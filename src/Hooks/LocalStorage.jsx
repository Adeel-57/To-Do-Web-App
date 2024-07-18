import { useEffect, useState } from "react"

const useLocalStorage = (key, initialdata) => {
  const [localdata, setLocalData] = useState(initialdata)
  useEffect(()=>{
    const existing = JSON.parse(localStorage.getItem(key))
    if(existing){
        setLocalData(existing)
    }else{
        localStorage.setItem(key,JSON.stringify(initialdata))
    }
  },[])
  function updateLocalData(newAData){
    if(typeof newAData === 'function'){
        localStorage.setItem(key, JSON.stringify(newAData(localdata)))
    }else{
        localStorage.setItem(key, JSON.stringify(newAData))
      }
      setLocalData(JSON.parse(localStorage.getItem(key)))
  }
  return [localdata, updateLocalData]
}

export default useLocalStorage