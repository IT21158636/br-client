import React from "react";
import { TextInput, Select } from "../common";
import AddressForm from "./AddressForm";
import { GENDER_OPTIONS } from "../../constants/formData";

const PersonForm = ({ person, onPersonChange, title, showShare = false }) => (
  <div className="space-y-4">
    <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TextInput
        label="NIC No"
        value={person.nicNo}
        onChange={(value) => onPersonChange("nicNo", value)}
        placeholder="Enter NIC number"
      />
      <TextInput
        label="Full Name"
        value={person.fullName}
        onChange={(value) => onPersonChange("fullName", value)}
        placeholder="Enter full name"
      />
      <TextInput
        label="Name with Initial"
        value={person.nameWithInitial}
        onChange={(value) => onPersonChange("nameWithInitial", value)}
        placeholder="Enter name with initial"
      />
      <TextInput
        label="Date of Birth"
        type="date"
        value={person.dateOfBirth}
        onChange={(value) => onPersonChange("dateOfBirth", value)}
      />
      <Select
        label="Gender"
        value={person.gender}
        onChange={(value) => onPersonChange("gender", value)}
        options={GENDER_OPTIONS}
        placeholder="Select Gender"
      />
      <TextInput
        label="Email Address"
        type="email"
        value={person.emailAddress}
        onChange={(value) => onPersonChange("emailAddress", value)}
        placeholder="Enter email address"
      />
      <div className="md:col-span-2">
        <AddressForm address={person} onAddressChange={onPersonChange} />
      </div>
      <TextInput
        label="Contact Numbers"
        value={person.contactNumbers}
        onChange={(value) => onPersonChange("contactNumbers", value)}
        placeholder="Mobile/Office/Home"
      />
      {showShare && (
        <TextInput
          label="Share Ownership %"
          type="number"
          value={person.shareOwnership}
          onChange={(value) => onPersonChange("shareOwnership", value)}
          placeholder="Enter share percentage"
          min="0"
          max="100"
        />
      )}
    </div>
  </div>
);

export default PersonForm;
