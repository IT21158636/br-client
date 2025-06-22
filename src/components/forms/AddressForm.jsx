import React from "react";
import { TextInput, TextArea, Select } from "../common";
import { PROVINCES, DISTRICTS } from "../../constants/formData";

const AddressForm = ({ address, onAddressChange }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div className="md:col-span-2">
      <TextArea
        label="Address"
        value={address.address}
        onChange={(value) => onAddressChange("address", value)}
        placeholder="Enter full address"
        required
      />
    </div>
    <Select
      label="Province"
      value={address.province}
      onChange={(value) => {
        onAddressChange("province", value);
        onAddressChange("district", "");
      }}
      options={PROVINCES}
      placeholder="Select Province"
      required
    />
    <Select
      label="District"
      value={address.district}
      onChange={(value) => onAddressChange("district", value)}
      options={address.province ? DISTRICTS[address.province] || [] : []}
      placeholder="Select District"
      disabled={!address.province}
      required
    />
    <TextInput
      label="City"
      value={address.city}
      onChange={(value) => onAddressChange("city", value)}
      placeholder="Enter city"
      required
    />
    <TextInput
      label="Postal Code"
      value={address.postalCode}
      onChange={(value) => onAddressChange("postalCode", value)}
      placeholder="Enter postal code"
      required
    />
  </div>
);

export default AddressForm;
