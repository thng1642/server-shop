const mongoose = require('mongoose')
;(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/funix-shop")

        // await createCollections(models)

        console.log("Connected to the database successfully ")
    } catch (e) {

        console.error("Failed to connect to the database!", e)
    }
})()