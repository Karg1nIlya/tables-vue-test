import axios from "axios";

export async function getAnswer(src: string) {
    try {
        const data = await axios.get(`https://swapi.dev/api/${src}`)
        return data
    } catch(e) {
        console.log(e)
    }
    
}