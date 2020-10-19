const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {

    index(request, response) {
        const city = request.query.city
        return response.render('index')
    },
    async orphanage(request, response) {
        const id = request.query.id
        try{
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id =${id}`)
            const orphanage = results[0]
            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]

            if(orphanage.opening_on_weekends == "0") {
                orphanage.opening_on_weekends = false
            }
            else{
                orphanage.opening_on_weekends = true
            }
            
            return res.render('orphanage',{orphanage })

        }catch(error){
            console.log(error);
            return res.send('Erro no banco de dados')
        }
    

    },
    async orphanages(request, response) {
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages");
            return response.render('orphanages', {orphanages})

        }catch(error){
            console.log(error)
            return res.send("Erro no banco de dados");
        }
        

    },
    createOrphanage(request, response) {
        return response.render('create-orphanage')

    },
     async saveOrphanage(request, response) {
        const fields = req.body
        if(Object.values(fields).includes('')){
            return res.send('Todos os campos devem ser preenchidos')
        }
        try{
            const db = await Database;
            await saveOrphanage(db,{
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                opening_on_weekends: fields.opening_on_weekends,
            })
            return res.redirec('/orphanages')

        }catch(error){
            console.log(error)
            return res.send('Erro no banco de dados')
        }
        

    }

}