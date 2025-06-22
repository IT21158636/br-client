import React from "react";
import { Check } from "lucide-react";

const SuccessStep = () => (
  <div className="space-y-6 text-center">
    <div className="p-6 rounded-lg bg-green-50">
      <Check className="w-16 h-16 mx-auto mb-4 text-green-600" />
      <h3 className="mb-2 text-2xl font-bold text-green-800">
        Thank you for registering!
      </h3>
      <p className="mb-2 text-green-700">
        Your business registration form has been submitted successfully.
      </p>
      <p className="mb-2 text-green-700">
        Our agent will contact you soon to assist with the next steps.
      </p>
      <p className="mb-4 text-green-700">
        If you need immediate assistance, please use the options below.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/support"
          className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Support work.nextoex@gmail.com
        </a>
        <a
          href="/contact"
          className="px-4 py-2 text-white transition bg-gray-600 rounded hover:bg-gray-700"
        >
          Contact Us 0704673040
        </a>
      </div>
    </div>
    <div className="p-4 rounded-lg bg-gray-50">
      <p className="text-sm text-gray-600">Reference ID: BRF-{Date.now()}</p>
    </div>
  </div>
);

export default SuccessStep;
