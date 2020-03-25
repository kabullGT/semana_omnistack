const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();
        console.log(count);
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1) *5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf',
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const {title, dsc, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, 
            dsc, 
            value, 
            ong_id,
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id') //get the ong id COLUMN ONLY related to the case
        .first();

        //Check ig the related ong is not the same trying to delete the case.
        if(incident.ong_id != ong_id){
            //HTTP Status unauthorized 401
            return response.status(401).json({error: 'Operation not allowed!'}); 
        }

        await connection('incidents').where('id', id).delete();

        //204: No content
        return response.status(204).send();

    }

}