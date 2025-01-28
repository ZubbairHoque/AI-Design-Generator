"use client";
import React, { useState, useEffect } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalInformation from "./_components/AdditionalInformation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { storage, account } from "@/lib/appwrite.config";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";

function CreateNew() {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await account.get();
        setIsVerified(response.emailVerification);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    checkVerification();
  }, []);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const GenerateAiImage = async () => {
    try {
      const result = await axios.post("/api/redesign-room", formData);
      console.log(result.data);
    } catch (error) {
      console.error("Error generating AI image:", error);
    }

    if (selectedFile) {
      await SaveImageToAppwrite(selectedFile);
    }
  };

  const SaveImageToAppwrite = async (file) => {
    if (!isVerified) {
      console.error("User is not verified");
      return;
    }

    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        console.error("Invalid file type. Please upload an image.");
        return;
      }

      // Upload file
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        uuidv4(),
        file
      );

      // Update permissions
      await storage.updateFilePermissions(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        response.$id,
        [
          Permission.read(Role.user(user.id)),
          Permission.write(Role.user(user.id)),
          Permission.delete(Role.user(user.id)),
        ]
      );

      console.log("File saved successfully:", response);
      return response;
    } catch (error) {
      console.error("Error saving image to Appwrite:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-5xl text-primary text-center">
        Create Your Dream Space.
      </h2>
      <p className="text-center mt-4" style={{ color: "#007BFF" }}>
        Let AI transform your vision into reality with just the press of a
        button—start designing your perfect space effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        <div className="mb-6">
          <ImageSelection
            selectedImage={(file) => {
              onHandleInputChange(file, "image");
              setSelectedFile(file);
            }}
          />
        </div>

        <div>
          <div className="mb-6">
            <RoomType
              selectedRoomType={(value) =>
                onHandleInputChange(value, "roomType")
              }
            />
          </div>

          <div className="mb-6">
            <DesignType
              selectedDesignType={(value) =>
                onHandleInputChange(value, "DesignType")
              }
            />
          </div>

          <div className="mb-6">
            <AdditionalInformation
              onInputChange={(value) =>
                onHandleInputChange(value, "AdditionalInformation")
              }
            />
          </div>

          <div className="text-center mb-48">
            <Button onClick={GenerateAiImage}>Generate</Button>
            <p className="text-sm text-left text-gray-700 mt-4">
              NOTE: 1 Credit will be used to redesign your room.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
