const { asyncError } = require("@/middlewares/error");

const handler = asyncError(async(req, res) => {
    const {email, password} = req.body;
    
})

export default handler;