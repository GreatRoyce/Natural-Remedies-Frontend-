import FormInput from "../FormInput";

const AddressStep = ({ formData, onChange }) => (
  <>
    <FormInput
      type="text"
      name="country"
      placeholder="Country"
      value={formData.country}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="street"
      placeholder="Street"
      value={formData.street}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="state"
      placeholder="State"
      value={formData.state}
      onChange={onChange}
    />
    <FormInput
      type="text"
      name="postalCode"
      placeholder="Postal Code"
      value={formData.postalCode}
      onChange={onChange}
    />
  </>
);

export default AddressStep;
