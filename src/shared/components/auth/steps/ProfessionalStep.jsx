import React from "react";
import FormInput from "../FormInput";


const ProfessionalStep = ({ formData, onChange }) => (
  <>
    <FormInput
      type="text"
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="website"
      placeholder="Website"
      value={formData.website}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="bio"
      placeholder="Bio"
      value={formData.bio}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="credentials"
      placeholder="Credentials"
      value={formData.credentials}
      onChange={onChange}
    />
    <FormInput
      type="number"
      name="yearsOfExperience"
      placeholder="Years of Experience"
      value={formData.yearsOfExperience}
      onChange={onChange}
    />
  </>
);

export default ProfessionalStep;
