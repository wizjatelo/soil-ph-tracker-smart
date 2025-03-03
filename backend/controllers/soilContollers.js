import soilmodel from "../models/soilModel.js";

export const soilUpload = async(req,res)=>{
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

        return res.json({success: true, message: "Soil image uploaded successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const recentReports = async (req, res) => {
    try {


        const reports = await soilmodel.find({}).sort({
            createdAt: -1
        });

        return res.status(200).json({
            count: reports.length,
            data: reports
        })

    
        
    } catch (error) {

        return res.status(500).json({
            message: "Failed to fetch reports"
        })
        
    }
}