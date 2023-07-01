const express = require('express');
const router = express.Router();


function valitateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}

];



router.get('/',(req, res)=>{
    res.send(courses);
});

router.post('/', (req,res)=>{
    const { error } = valitateCourse(req.body);


    if (error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }


    const course = {
        id: courses.length +1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req, res) => {

    const course = courses.find( c=> c.id ===parseInt(req.params.id));   
     if(!course)//404 
        return res.status(404).send('The course with the given Id was not found');

    //validate 
    //if invalid, return 400 -- bad request
    const { error } = valitateCourse(req.body);


    if (error){
        //400 bad request
        return res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) =>{
    //look up the course
    //not existing, return 404
    const course = courses.find( c=> c.id ===parseInt(req.params.id));   
    if(!course)//404 
       return res.status(404).send('The course with the given Id was not found');

    //delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);


    //return the same course
    res.send(course);
});




router.get('/:id',(req,res)=>{
     const course = courses.find( c=> c.id ===parseInt(req.params.id));   
     if(!course)//404 
        return res.status(404).send('The course with the given Id was not found');
    res.send(course)
});

module.exports = router;