import * as XLSX from "xlsx";

const ExportExcel = ({ data, fileName, singleCompany = null }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // If exporting single company
    if (singleCompany) {
      const companySheetData = createCompanySheetData(singleCompany);
      const worksheet = XLSX.utils.aoa_to_sheet(companySheetData);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        singleCompany.businessName || "Company"
      );
      XLSX.writeFile(
        workbook,
        `${singleCompany.businessName || "Company"}_Details.xlsx`
      );
      return;
    }

    // If exporting all companies
    data.forEach((company, index) => {
      const companySheetData = createCompanySheetData(company);
      const worksheet = XLSX.utils.aoa_to_sheet(companySheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Company_${index + 1}`);
    });

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const createCompanySheetData = (company) => {
    // Prepare company main details as rows
    const companyInfo = [
      ["COMPANY DETAILS", ""],
      ["Business Name", company.businessName || ""],
      ["Address", company.companyDetails?.address || ""],
      ["Email", company.companyDetails?.emailAddress || ""],
      ["Phone", company.companyDetails?.phoneNumber || ""],
      ["City", company.companyDetails?.city || ""],
      ["Province", company.companyDetails?.province || ""],
      ["Postal Code", company.companyDetails?.postalCode || ""],
      [],
    ];

    // Directors section
    const directorsSection = [["DIRECTORS INFORMATION", ""], []];

    const directorsHeader = [
      "Full Name",
      "NIC No",
      "Name with Initial",
      "Date of Birth",
      "Gender",
      "Address",
      "Email",
      "Province",
      "District",
      "City",
      "Postal Code",
      "Contact Numbers",
      "Share Ownership",
    ];

    // Directors data rows
    const directorsData =
      company.directors && company.directors.length
        ? company.directors.map((dir) => [
            dir.fullName || "",
            dir.nicNo || "",
            dir.nameWithInitial || "",
            dir.dateOfBirth
              ? new Date(dir.dateOfBirth).toLocaleDateString()
              : "",
            dir.gender || "",
            dir.address || "",
            dir.emailAddress || "",
            dir.province || "",
            dir.district || "",
            dir.city || "",
            dir.postalCode || "",
            dir.contactNumbers || "",
            dir.shareOwnership !== null && dir.shareOwnership !== undefined
              ? dir.shareOwnership
              : "",
          ])
        : [["No Directors", "", "", "", "", "", "", "", "", "", "", "", ""]];

    // Secretary info (optional)
    const secretaryInfo = [
      [],
      ["SECRETARY DETAILS", ""],
      ["Full Name", company.secretary?.fullName || ""],
      ["NIC No", company.secretary?.nicNo || ""],
      ["Name with Initial", company.secretary?.nameWithInitial || ""],
      [
        "Date of Birth",
        company.secretary?.dateOfBirth
          ? new Date(company.secretary.dateOfBirth).toLocaleDateString()
          : "",
      ],
      ["Gender", company.secretary?.gender || ""],
      ["Address", company.secretary?.address || ""],
      ["Email", company.secretary?.emailAddress || ""],
      ["Province", company.secretary?.province || ""],
      ["District", company.secretary?.district || ""],
      ["City", company.secretary?.city || ""],
      ["Postal Code", company.secretary?.postalCode || ""],
      ["Contact Numbers", company.secretary?.contactNumbers || ""],
    ];

    // Combine all sections
    return [
      ...companyInfo,
      ...directorsSection,
      directorsHeader,
      ...directorsData,
      ...secretaryInfo,
    ];
  };

  const buttonText = singleCompany ? "Export Company" : "Export All Companies";
  const buttonClass = singleCompany
    ? "px-2 py-1 text-white bg-orange-600 rounded text-xs"
    : "px-4 py-1 text-white bg-green-600 rounded";

  return (
    <button onClick={exportToExcel} className={buttonClass}>
      {buttonText}
    </button>
  );
};

export default ExportExcel;
