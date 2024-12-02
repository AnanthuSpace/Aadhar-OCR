import { getAadharNumber, getAddress, getDataFromAadhar, getDOB, getGender, getName } from "../service/userService.js";

const parseAadhar = async (req, res) => {
  try {
    const files = req.files;

    if (!files || !files.frontpage || !files.backpage) {
      return res.status(400).json({ message: "Both frontpage and backpage are required!" });
    }

    const frontpageBuffer = files.frontpage[0].buffer;
    const backpageBuffer = files.backpage[0].buffer;

    const frontpageText = await getDataFromAadhar(frontpageBuffer);
    const backpageText = await getDataFromAadhar(backpageBuffer);

    const Id = await getAadharNumber(frontpageText)

    if (!Id) {
      console.log("hiiiiiiiiiiii")
      res.status(400).json({ status: false, msg: "Please provide valid aadhar card" })
    } else {

      const Name = await getName(frontpageText)
      const Gender = await getGender(frontpageText)
      console.log(Gender)
      const DOB = await getDOB(frontpageText)
      const addressData = await getAddress(backpageText)

      res.status(200).json({
        status: true,
        data: {
          AadharNumber: Id,
          Name: Name,
          Gender: Gender,
          DOB: DOB,
          Address: addressData.address,
          Pincode: addressData.pincode
        }
      });
    }


  } catch (error) {
    console.error("Error during OCR processing:", error);
    res.status(500).json({ message: "File upload or OCR processing failed", error });
  }
};

export default parseAadhar;
