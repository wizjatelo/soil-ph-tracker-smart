import mongoose from "mongoose"
const  soilSchema = new mongoose.Schema({
    location:{type:String,require:true},
    soiltype:{type:String,require:true},
    phlevel:{type:String,require:true}
})
const soilmodel = mongoose.model.soil  || mongoose.model("soil",soilSchema);
export default soilmodel;