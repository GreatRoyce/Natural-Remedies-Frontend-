import FormInput from "../FormInput";

const BasicInfoStep = ({ formData, onChange }) => (
  <>
    <FormInput
      type="text"
      name="name"
      placeholder="Full Name *"
      value={formData.name}
      onChange={onChange}
      required
    />
    <FormInput
      type="text"
      name="username"
      placeholder="Username"
      value={formData.username}
      onChange={onChange}
    />
    <FormInput
      type="email"
      name="email"
      placeholder="Email *"
      value={formData.email}
      onChange={onChange}
      required
    />
    <FormInput
      type="password"
      name="password"
      placeholder="Password *"
      value={formData.password}
      onChange={onChange}
      required
    />
    <FormInput
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password *"
      value={formData.confirmPassword}
      onChange={onChange}
      required
    />
  </>
);

export default BasicInfoStep;
