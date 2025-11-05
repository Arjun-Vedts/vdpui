

import React, { useEffect, useState } from "react";
import Navbar from "components/navbar/Navbar";
import styles from "./atpDocxPreview.module.css";
import ATPDocPrint from "./atp-doc-print.component";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getEmployeeMasterList } from "services/admin.serive";

import AlertConfirmation from "common/AlertConfirmation.component";
import { useNavigate } from "react-router-dom";
import { SRSApproval, SRSReturnApproval } from "services/srs.service";
import { ATPApproval, ATPReturnApproval } from "services/atp.service";

const validationSchema = Yup.object({
  remarks: Yup.string().required("Remarks are required"),
});

const ATPApproved = () => {
  const [employees, setEmployees] = useState([]);
  const storedData = localStorage.getItem("UMPreviewData");
  const parsedData = storedData ? JSON.parse(storedData) : {};
  const navigate = useNavigate();
  // Fetch employee list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const list = await getEmployeeMasterList();
        
        setEmployees(list);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Helper to get employee details by ID
  const getEmployeeDetails = (empId) => {
    if (!empId || employees.length === 0) return { empName: "-", designation: "-" };
    const emp = employees.find((e) => e.empId === empId);
    return emp || { empName: "-", designation: "-" };
  };

  const getDocPDF = (versionElements) => (
    <ATPDocPrint
      action=""
      revisionElements={versionElements}
      buttonType={"Button"}
    />
  );

  const handleAction = async(actionType, values) => {
    console.log('actionType',actionType)
    try {
    const { remarks } = values;
    const { row } = parsedData;
    let msgStatus;
     if(actionType==="RETURN"){
       msgStatus="Return"
     }

     if(actionType==="APPROVAL"){
        msgStatus="Aprroved"
     }
   
    // ✅ Step 1: Ask for confirmation
    const confirm = await AlertConfirmation({
      title: "Are you sure to "+ msgStatus+"?",
      message: "",
    });

    if(!confirm) return ;


       let response;
    if(actionType==="RETURN"){
      response = await ATPReturnApproval(remarks,row?.docVersionReleaseId);

    }

     if(actionType==="APPROVAL"){
      response = await ATPApproval(remarks,row?.docVersionReleaseId);

    }

     if (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ATP Docx" + msgStatus+ "successfully",
        showConfirmButton: false,
        timer: 2600,
      })

        navigate('/atp-document');


   
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: msgStatus+ "failed. Please try again.",
        showConfirmButton: false,
        timer: 2600,
      });
    }
}catch (error) {
    console.error("Error forwarding user manual:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong! Please try again.",
      showConfirmButton: false,
      timer: 2600,
    });
  }
  };

  return (
    <>
      <Navbar />
      <div className="card m-4 shadow-lg border-0 rounded-4">
        <div
          className="card-header text-white text-center fs-5 fw-semibold"
          style={{
            background: "linear-gradient(90deg, #0052cc, #007bff)",
          }}
        >
          ATP Document Approval
        </div>

        <Formik
          initialValues={{ remarks: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log("Form Submitted:", values)}
        >
          {({ values }) => (
            <Form>
              {/* Header Section */}
              <div className="row m-3">
                <div className="col-md-12">
                  <div className="card p-3 border-0 shadow-sm rounded-3">
                    <div className="d-flex align-items-center flex-wrap justify-content-between">
                      <div className="text-start mb-2">
                        <b>Project Name:</b>{" "}
                        <span className="text-primary">
                          {parsedData?.row?.projectName || ""} (
                          {parsedData?.row?.projectMasterDto?.projectCode || ""})
                        </span>
                      </div>

                      <div className="text-center mb-2">
                        <b>Status:</b>{" "}
                        <span className="bg-light text-dark">
                          {parsedData?.row?.statusName || ""}
                        </span>
                      </div>

                      <div className="text-end mb-2">
                        <b>Particulars:</b>{" "}
                        <span>{parsedData?.row?.particulars || ""}</span>
                      </div>

                      <div className="text-end">{getDocPDF(parsedData?.row)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prepared/Review/Approved + Remarks */}
              <div className="row align-items-start mt-3 px-3">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm p-3 rounded-3">
                    <b className="text-secondary mb-3 d-block">
                      Prepared / Review / Approved
                    </b>

                    {/* Prepared By */}
                    <div className="mb-3">
                      <b>Prepared By:</b>{" "}
                      <span className="text-primary">
                        {(() => {
                          const emp = getEmployeeDetails(parsedData?.row?.preparedBy);
                          return `${emp.empName} ,${emp.empDesigName}`;
                        })()}
                      </span>
                    </div>

                    {/* Review By */}
                    <div className="mb-3">
                      <b>Review By:</b>{" "}
                      <span className="text-primary">
                        {(() => {
                          const emp = getEmployeeDetails(parsedData?.row?.reviewBy);
                          return `${emp.empName}, ${emp.empDesigName}`;
                        })()}
                      </span>
                    </div>

                    {/* Approved By */}
                    <div className="mb-1">
                      <b>Approved By:</b>{" "}
                      <span className="text-primary">
                        {(() => {
                          const emp = getEmployeeDetails(parsedData?.row?.verifyBy);
                          return `${emp.empName} ,${emp.empDesigName}`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remarks section */}
                <div className="col-md-6 mt-3 mt-md-0 employee-text">
                  <div className="card border-0 shadow-sm p-3 rounded-3">
                    <label
                      htmlFor="remarks"
                      className={`${styles.labelName} mb-2 fw-semibold`}
                    >
                      Remarks
                    </label>
                    <Field
                      as="textarea"
                      id="remarks"
                      name="remarks"
                      className="form-control"
                      rows="6"
                      placeholder="Enter your remarks..."
                      style={{
                        width: "100%",
                        minHeight: "180px",
                        resize: "vertical",
                      }}
                    />
                    <ErrorMessage
                      name="remarks"
                      component="div"
                      className="text-danger mt-1 small"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 mt-4 mb-4">
                <button
                  type="button"
                  className="btn btn-success px-4 py-2 shadow-sm"
                  onClick={() => handleAction("APPROVAL", values)}
                >
                  Approved
                </button>

                <button
                  type="button"
                  className="btn btn-danger px-4 py-2 shadow-sm"
                  onClick={() => handleAction("RETURN", values)}
                >
                  Return
                </button>

                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2 shadow-sm"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ATPApproved;
