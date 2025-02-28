import soilmodel from "../models/soilModel";

export const soilUpload = async(res,res)=>{
    try {
        const {image,location,soiltype,phlevel} = req.body;
        const  soilData = {
            image,
            location,
            soiltype,
            phlevel

        };
        const soil = new soilmodel(soilData);
        await soil.save();
    } catch (error) {
        console.log(error)
    }
}