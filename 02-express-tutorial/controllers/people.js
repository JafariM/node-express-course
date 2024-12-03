const {people}= require('../data')

//get list of all people in array
const getPeople = (req,res)=>{
    res.json(people)
}

//add a new person
const addPerson= (req,res)=>{
    const {name} = req.body;
    if(!name){
       return res.status(400).json({success: false, message:"Please provide a name"})
    }
    people.push({id: people.length+1,name:name})
    res.status(201).json({success:true,name:name})
}

//find a person by id
const getPerson = (req,res)=>{
    const id = parseInt(req.params.id)
    const person = people.find((person)=> person.id === id)
    if(person){
        return res.status(200).json(person)
    }
    else{
        return res.status(404).json({success:false,message:'Person not found'})
    }
}

//update a person name
const updatePerson = (req,res)=>{
    const id = parseInt(req.params.id)
    const {name} = req.body
    const person = people.find((person)=> person.id === id)
    if(person){
        person.name = name;
        return res.status(200).json({ success: true, data: person });
    }
    else{
        return res.status(404).json({success:false,message:'Person not found'})
    }
}

const deletePerson = (req,res)=>{
    const id = parseInt(req.params.id)
    const person = people.find((person)=> person.id === id)
    if(person){
        people = people.filter(person=> person.id !== id)
        return res.status(200).json({ success: true, data: newPeople });
    }
    else{
        return res.status(404).json({success:false,message:'Person not found'})
    }
}

module.exports = {
    getPeople,
    addPerson,
    getPerson,
    updatePerson,
    deletePerson}