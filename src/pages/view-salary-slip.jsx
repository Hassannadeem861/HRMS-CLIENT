import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/axios"; // Axios instance
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// ✅ Correct way to register fonts
pdfMake.vfs = pdfFonts.vfs;

const SalarySlipPDF = () => {
  const { id } = useParams();
  const [slip, setSlip] = useState(null);

  // ✅ Fetch salary slip data from backend
  useEffect(() => {
    const fetchSlip = async () => {
      try {
        const { data } = await Api.get(`/api/v1/get-single-salary-slip/${id}`);
        setSlip(data.salarySlip);
      } catch (err) {
        console.error("Error fetching slip:", err);
      }
    };
    fetchSlip();
  }, [id]);

const handleDownload = () => {
  if (!slip) return alert("Slip data not found!");

  const today = new Date().toLocaleDateString();
  const primaryColor = "#f4630a"; // Professional blue
  const secondaryColor = "#4a6fa5"; // Lighter blue
  const accentColor = "#f4630a"; // Orange for highlights
  const lightBg = "#f8f9fa"; // Very light gray for backgrounds
  const borderColor = "#e0e0e0"; // Soft border color

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      // Header with logo placeholder and company info
      {
        columns: [
          {
            stack: [
            //   { 
            //     text: "YOUR LOGO", 
            //     style: "logoPlaceholder",
            //     margin: [0, 0, 0, 5]
            //   },
              { 
                text: "EB Technologies", 
                style: "companyName" 
              },
            //   { 
            //     text: "863-West James Road, California\n+01 8654844 654", 
            //     style: "companyAddress" 
            //   }
            ],
            width: '*'
          },
          {
            stack: [
            //   { 
            //     text: "SALARY SLIP", 
            //     style: "header",
            //     margin: [0, 0, 0, 10]
            //   },
              { 
                text: `Date: ${today}`, 
                style: "dateText",
                alignment: "right" 
              }
            ],
            alignment: "right"
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Employee Basic Info
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            ["Employee Name:", slip?.employerId?.name || "N/A"],
            ["Designation:", slip?.employerId?.designation || "N/A"],
            ["Salary Month:", slip?.month || "N/A"],
            ["Year:", new Date().getFullYear().toString()]
          ]
        },
        layout: {
          hLineWidth: (i) => (i === 0 || i === 4) ? 0.5 : 0,
          vLineWidth: () => 0,
          hLineColor: () => borderColor,
          paddingTop: (i) => (i === 0) ? 5 : 3,
          paddingBottom: (i) => (i === 3) ? 5 : 3
        },
        style: "basicInfoTable",
        margin: [0, 0, 0, 30]
      },

      // Earnings and Deductions
      {
        columns: [
          // Earnings Column
          {
            width: '50%',
            stack: [
              { 
                text: "EARNINGS", 
                style: "sectionHeader",
                margin: [0, 0, 0, 8]
              },
              {
                table: {
                  widths: ['70%', '30%'],
                  body: [
                    ["Basic and DA", `Rs.${slip?.basicSalary || slip?.employerId?.salary || "0.00"}`],
                    ["HRA", `Rs.${slip?.hra || "0.00"}`],
                    ["Conveyance", `Rs.${slip?.conveyance || "0.00"}`],
                    [{ text: "Total Earnings", bold: true }, { text: `Rs.${slip?.grossEarnings || slip?.employerId?.salary || "0.00"}`, bold: true }]
                  ]
                },
                layout: {
                  hLineWidth: (i) => (i === 0 || i === 4) ? 0.5 : 0,
                  vLineWidth: () => 0,
                  hLineColor: () => borderColor,
                  paddingTop: (i) => (i === 0) ? 5 : 3,
                  paddingBottom: (i) => (i === 3) ? 5 : 3
                },
                style: "amountTable"
              }
            ]
          },
          
          // Deductions Column
          {
            width: '50%',
            stack: [
              { 
                text: "DEDUCTIONS", 
                style: "sectionHeader",
                margin: [0, 0, 0, 8]
              },
              {
                table: {
                  widths: ['70%', '30%'],
                  body: [
                    ["Personal", `Rs.${slip?.personalDeductions || "0.00"}`],
                    ["Phone Charges", `Rs.${slip?.phoneCharges || "0.00"}`],
                    ["Misc. Value", `Rs.${slip?.miscDeductions || "0.00"}`],
                    [{ text: "Total Deductions", bold: true }, { text: `Rs.${slip?.totalDeductions || "0.00"}`, bold: true }]
                  ]
                },
                layout: {
                  hLineWidth: (i) => (i === 0 || i === 4) ? 0.5 : 0,
                  vLineWidth: () => 0,
                  hLineColor: () => borderColor,
                  paddingTop: (i) => (i === 0) ? 5 : 3,
                  paddingBottom: (i) => (i === 3) ? 5 : 3
                },
                style: "amountTable"
              }
            ]
          }
        ],
        columnGap: 20,
        margin: [0, 0, 0, 30]
      },

      // Net Salary
    //   {
    //     table: {
    //       widths: ['70%', '30%'],
    //       body: [
    //         [{ text: "Net Salary", bold: true, alignment: "right" }, { text: `₹${slip?.netSalary || slip?.employerId?.salary || "0.00"}`, bold: true, fontSize: 14, color: primaryColor }]
    //       ]
    //     },
    //     layout: {
    //       hLineWidth: () => 0,
    //       vLineWidth: () => 0
    //     },
    //     margin: [0, 0, 0, 30]
    //   },

      // Bank Details
    //   {
    //     table: {
    //       widths: ['50%', '50%'],
    //       body: [
    //         ["Bank Name:", slip?.bankName || "N/A"],
    //         ["Transaction Date:", slip?.transactionDate || today],
    //         ["Cheque No.:", slip?.chequeNumber || "N/A"]
    //       ]
    //     },
    //     layout: {
    //       hLineWidth: () => 0,
    //       vLineWidth: () => 0,
    //       paddingTop: (i) => (i === 0) ? 5 : 3,
    //       paddingBottom: (i) => (i === 2) ? 5 : 3
    //     },
    //     style: "bankDetailsTable",
    //     margin: [0, 0, 0, 40]
    //   },

      // Signatures
      {
        columns: [
          {
            // text: "Employee Signature:",
            // style: "signatureLabel"
          },
          {
            // text: "Authorized Signatory:",
            // style: "signatureLabel",
            // alignment: "right"
          }
        ]
      },
      {
        columns: [
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 }],
            margin: [0, 5, 0, 0]
          },
          {
            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 }],
            alignment: "right",
            margin: [0, 5, 0, 0]
          }
        ]
      },

      // Footer
      {
        text: "www.ebtechnologies.com",
        style: "footerText",
        margin: [0, 30, 0, 0]
      }
    ],
    styles: {
      logoPlaceholder: {
        fontSize: 12,
        color: '#999',
        italics: true,
        background: '#f0f0f0',
        alignment: 'center',
        width: 100,
        padding: [5, 0]
      },
      companyName: {
        fontSize: 18,
        bold: true,
        color: primaryColor
      },
      companyAddress: {
        fontSize: 9,
        color: '#666',
        lineHeight: 1.2,
        margin: [0, 5, 0, 0]
      },
      header: {
        fontSize: 22,
        bold: true,
        color: accentColor,
        letterSpacing: 1
      },
      dateText: {
        fontSize: 10,
        color: '#666'
      },
      basicInfoTable: {
        fontSize: 11,
        color: '#333'
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: primaryColor,
        letterSpacing: 0.5
      },
      amountTable: {
        fontSize: 11,
        color: '#333'
      },
      bankDetailsTable: {
        fontSize: 10,
        color: '#555'
      },
      signatureLabel: {
        fontSize: 10,
        color: '#555'
      },
      footerText: {
        fontSize: 9,
        color: '#999',
        alignment: 'center'
      }
    },
    defaultStyle: {
      font: 'Roboto',
      lineHeight: 1.3
    }
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`Salary_Slip_${slip?.month}_${slip?.employerId?.name?.replace(' ', '_') || 'employee'}.pdf`);
};

  // if (!slip) {
  //   return <div className="p-8 text-center">Loading PDF...</div>;
  // }

  // ✅ UI: Display salary slip and download button
  return (
    <div className="max-w-[800px] mx-auto mt-8 p-10 border rounded-lg shadow-lg bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="text-4xl font-bold">Salary Slip</h1> */}
        <button
          onClick={handleDownload}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Download PDF
        </button>
      </div>

      <div className="text-[16px] space-y-3 leading-7 p-4 bg-white text-black">
        <p>
          <strong>Name:</strong> {slip?.employerId?.name}
        </p>
        <p>
          <strong>Designation:</strong> {slip?.employerId?.designation}
        </p>
        <p>
          <strong>Email:</strong> {slip?.employerId?.email}
        </p>
        <p>
          <strong>Month:</strong> {slip?.month}
        </p>
        <p>
          <strong>Salary:</strong> Rs. {slip?.employerId?.salary}
        </p>
        <p>
          <strong>Generated At:</strong>{" "}
          {new Date(slip?.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SalarySlipPDF;
