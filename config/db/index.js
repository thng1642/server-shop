const mongoose = require('mongoose')
;(async () => {
    try {
        const URI = "mongodb+srv://thuanfx:O2sZeFdRrvFOXp80@cluster0.gu5iyvv.mongodb.net/funix_shop?retryWrites=true&w=majority"
        // await mongoose.connect("mongodb://localhost:27017/funix-shop")
        await mongoose.connect(URI)

        // await createCollections(models)

        console.log("Connected to the database successfully ")
    } catch (e) {

        console.error("Failed to connect to the database!", e)
    }
})()