const express = require('express');
const router = express.Router();
const {
    getPeople,
    addPerson,
    getPerson,
    updatePerson,
    deletePerson} = require('../controllers/people')

router.get('/',getPeople); //list all people
router.get('/:id',getPerson) // find a person in array
router.post('/',addPerson); // add new person
router.put('/:id',updatePerson) //update a person
router.delete('/:id',deletePerson) //delete a person

module.exports= router;