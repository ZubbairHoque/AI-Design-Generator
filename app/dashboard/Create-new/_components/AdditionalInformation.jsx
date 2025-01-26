import { Textarea } from "@/components/ui/textarea";
import React from "react";

function AdditionalInformation({additonalInformationInput}) {
  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <label htmlFor="additional-info" className="block text-slate-700 mb-2">
        Additional Information (Optional)
      </label>
    <Textarea className="mt-3" onChange={(e)=>AdditionalInformation(e.target.value)}/>
    </div>
  );
}

export default AdditionalInformation;