import ImageTextRun from "../utils/GeminiAI.API.js";

const ImageTestingController = {
  getName: async (req, res) => {
    try {
      console.log(req.file.path);
      let response = await ImageTextRun(
        req.file.path,
        "give me a string containing json object containing the name of the student candidate, its Institute Merit No mentioned inside addmition details, Merit Marks, date of addmition and Course name in the document which i can pass through JSON.parse('givenstring') and get a json object. dont use any unexpected symbols like ' or new line "
      );
      let cleanedString = response.replaceAll("\\\\", ""); // Remove backslashes
      let preJSON ="";
      let flags=[0,0];
      let i=0
      for (i = 0; i < cleanedString.length; i++) {
        if(flags[0]==0 && flags[1]==1){
          break;
        }
        if (cleanedString[i] == '{') {
          flags[0]++;
          flags[1]=1;
          preJSON += cleanedString[i];
        } else if(cleanedString[i] == '}'){
          flags[0]--;
          preJSON += cleanedString[i];
        }else if(flags[0]>0){
          preJSON += cleanedString[i];
        }
      }
      const obj = JSON.parse(preJSON);
      res.status(200).json({ success: true, obj });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in getting the name of the student",
      });
    }
  },
};

export default ImageTestingController;
