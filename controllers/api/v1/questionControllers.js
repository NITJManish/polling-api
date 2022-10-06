const Question=require("../../../models/questions");
const Option=require("../../../models/options");

//<!--create question-->
module.exports.createQuestion=async function(req,res){
    try{
        let question=await Question.create(req.body);

        //<!--if questio is created then return json response-->
        if(question){
            return res.json({
                question,
                data: {message: "question created successfully"},
            });
        }else{
            return res.status(500).json({
                data: {message: "Internal server error"},
            });
        }
    }catch(err){
        console.log("error while creating question", err);
        return;
    }
};

//<!--view questions-->
module.exports.viewQuestions=async function(req,res){
    try{
        let question=await Question.findById(req.params.id).populate("options");
        return res.json({question});
    }catch(err){
        return res.status(500).json({
            data: {message: "Internal server error viewing question",
        },
        });
    }
};

//<!--delete question-->
module.exports.deleteQuestion=async function(req,res){
    try{
        let id=req.params.id;
        let question = await Question.findById(id).populate({
            path: "options",
            select: "votes",
        });
        if(question){
            let options=question.options;
            for(let i=0;i<options.length;i++)
            {
                if(options[i].votes>0)
                {
                    return res.status(404).json({
                        data: {
                            message: "questions option has some votes, not possible to delete",
                        },
                    });
                }
            }
            //if no any votes on any option of question
            await Option.deleteMany({question: id});
            await Question.findByIdAndDelete(id);
            return res.status(200).json({
                message: "question deleted successfully",
            });
        }else{
            return res.status(404).json({
                message: "question not found"
            });
        }
    }catch(err){
        return res.status(500).json({
            message: "Internal server error, deleting question",
        });
    }
};