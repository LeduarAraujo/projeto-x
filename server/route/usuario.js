// Imports externos
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Import internos
const router = express.Router();

router.post('/login', (req, res) => {

    console.log("Requisição solicitada por: " + req.body.ipAddres);

    let user = req.body.userId;
    let filtro = "where User = '" + user + "'";

    db.query('select * from mysql.user ' + filtro, (err, results) => {
        if (err) {
            res.status(215).json({ err });
        } else if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].Password).then(isAutorizado => {
                if (isAutorizado) {
                    const token = jwt.sign({ userId: user }, 'secret_this_should_be_longer', { expiresIn: '1h' });
                    res.status(200).json({ msg: 'Acesso Autorizado!', token: token , expiresIn: 3600});
                } else {
                    res.status(401).json({ msg: 'Acesso Negado!' });
                }
            }).catch(err => res.status(500).json(err));
        } else {
            res.status(401).json({ msg: 'Acesso Negado!' });
        }
    });
});

module.exports = router;