var firebase = require('../config')
const ProgramFile = require('../models/fileModel');

let database = firebase.database();

exports.saveProgramFile =  (req, res, next) => {
    database.ref("/ProgramFiles").set(req.body)  
                                 .then(() => res.status(201).json({message : "Objet enregistré..."}))
                                 .catch(error => res.status(400).json({error : error}));
};

exports.getAllFile =  (req, res, next) => {
    firebase.database().ref('/ProgramFiles')
        .once('value', (data) => {
            const programFiles = data.val() ? data.val() : [];
            res.status(200).json(programFiles);
        }
    );

};

exports.deleteFile = (req, res, next) =>{
    const storageRef = firebase.storage().refFromURL(req.body);
    storageRef.delete().then(
        () => {
          console.log('file removed!');
        },
        (error) => {
          console.log('Could not remove file! : ' + error);
        }
    );
}
