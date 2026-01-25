import { useState } from "react"



const useToggle=() :[boolean,()=>void]=>{
    const [value,setValue]=useState <boolean>(false);
    const toggleValue=()=> setValue(prev=> !prev);
    return [value,toggleValue];


}
export default useToggle;