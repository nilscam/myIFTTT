const router = require('express').Router();
const keys = require('../../config/keys');
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Twitter: "OK" }));
});

// Exemple Trigger / Reaction
// router.get('/checkTweetOnMe', checkAuth, (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     //add in db

//     // Regulier
//     objToAdd = {
//         id: Date.now(),
//         timer: "1000",
//         eventReaction: "Timer",
//         functionName: "checkTweetOnMe",
//         params: {},
//     };
//     tg.addTrigger(req.userData._id, objToAdd)

//     objToAdd = {
//         id: Date.now(),
//         timer: "0",
//         eventReaction: "checkTweetOnMe",
//         functionName: "sendTweet",
//         params: {
//             tweet: "Hello twitter"
//         },
//     };
//     tg.addTrigger(req.userData._id, objToAdd)
//     res.send(JSON.stringify({ Twitter: "OK" }));
// });


// //Trigger
// function checkTweetOnMe(params) {
//     if (true) {
//         tg.sendEvent(req.userData._id, "checkTweetOnMe");
//     }
// }
// //Reaction
// function sendTweet(params) {
// }



module.exports = router;