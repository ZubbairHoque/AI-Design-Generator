"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalInformation from "./_components/AdditionalInformation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from '@clerk/clerk-react'; // Import Clerk's useUser hook
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function CreateNew() {
  const { user } = useUser(); // Get the authenticated user from Clerk
  const [formData, setFormData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);

  const GenerateAiImage = async () => {
    const result = await axios.post('/api/redesign-room', formData)
    console.log(result);
  };

  const onHandleInputChange = (value, fieldName) => {
    console.log(`Field: ${fieldName}, Value: ${value}`);
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    console.log(formData);
    // Add logic to handle the value change, e.g., update state
  };

  
  

  return (
    <div>
      <h2 className="font-bold text-5xl text-primary text-center">
        Create Your Dream Space.
      </h2>
      <p className="text-center mt-4" style={{ color: "#007BFF" }}>
        Let AI transform your vision into reality with just the press of a
        button—start designing your perfect space effortlessly
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <div className="mb-6">
          <ImageSelection
            selectedImage={(file) => {
              onHandleInputChange(file, "image");
              setSelectedFile(file);
            }}
          />
        </div>

        {/* Form Input Section */}
        <div>
          {/* Room type */}
          <div className="mb-6">
            <RoomType
              selectedRoomType={(value) =>
                onHandleInputChange(value, "roomType")
              }
            />
          </div>

          {/* Design type */}
          <div className="mb-6">
            <DesignType
              selectedDesignType={(value) =>
                onHandleInputChange(value, "DesignType")
              }
            />
          </div>

          {/* Additional Requirements Text Area (Optional) */}
          <div className="mb-6">
            <AdditionalInformation
              onInputChange={(value) =>
                onHandleInputChange(value, "AdditionalInformation")
              }
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mb-48">
            <Button onClick={GenerateAiImage}>Generate</Button>
            <p className="text-sm text-left text-gray-700 mt-4">NOTE: 1 Credit will be used to redesign your room.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;