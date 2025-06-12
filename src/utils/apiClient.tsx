async function apiClient(path , options){
    console.log("this is from apiClient" ,import.meta.env.VITE_API_URL)
    try{
        const response = await fetch(`http://localhost:3000${path}` , options)
        if(response.ok){
            const data = await response.json()
            return data
        }else{
            console.log("error in fetching data in" ,path )
            return null
        }
    }catch(error){
        console.log("Error in fetching data " , error)
        return null
    }
}

export default apiClient