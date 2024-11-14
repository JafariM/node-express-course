const { writeFile, readFile } = require("fs").promises; 

const writer = async()=>{
    try {
        result= await writeFile(
            "./temp.txt",
            "Javascript is fun\nI like Javascript\nI keep practicing"
        )
        console.log('first writing')
    } catch (error) {
        console.log('An error acuured: ',error)
    }

}

const reader = async()=>{
    try {
        text = await readFile('./temp.txt','utf-8');
        console.log('second reading')
        console.log('Here is the reading from file: ',text)
    } catch (error) {
        console.log('An error acuured: ',error)
    }
}

const readWrite= async()=>{
    await writer();
    await reader();
}

readWrite();