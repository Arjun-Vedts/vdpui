import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getEmployeeMasterList } from "services/admin.serive";
import AlertConfirmation from "common/AlertConfirmation.component";

import { forwardATPDocxRecord } from "services/atp.service";


const ATPForwardComponent = ({ open, onClose, projectId, loginId, rowData }) => {
 // console.log('id-',rowData)

  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const list = await getEmployeeMasterList(); // 🔹 API call
        setEmployees(list);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (open) {
      fetchEmployees();
    }
  }, [open]);

  if (!open) return null;

  // ✅ Validation schema with Yup
  const validationSchema = Yup.object().shape({
    //forwardBy: Yup.string().required("Prepared By is required"),
    reviewedBy: Yup.string().required("Reviewed By is required"),
    approvedBy: Yup.string().required("Approved By is required"),
  });

  // ✅ Initial values
  const initialValues = {
    //forwardBy: "",
    reviewedBy: "",
    approvedBy: "",
  };

const handleSubmit = async (values) => {
 //console.log("fwrdby--",values.forwardBy)
  // console.log("review by--",values.reviewedBy)
   // console.log("approvedBy--",values.approvedBy)
  try {
    // ✅ Step 1: Ask for confirmation
    const confirm = await AlertConfirmation({
      title: "Are you sure to forward?",
      message: "",
    });

    if (!confirm) return; // user cancelled

    // ✅ Step 2: Prepare payload combining rowData and form values
    const payload = {
      docVersionReleaseId: rowData, // from row
      projectId,                                       // from props
      loginId,                                        // from props
      //preparedBy: values.forwardBy,
      reviewBy: values.reviewedBy,
      verifyBy: values.approvedBy,

    };

   // console.log("payload",payload);

    // ✅ Step 3: Call your API
    const res = await forwardATPDocxRecord(payload); // 🔹 your API function

    // ✅ Step 4: Show success or error
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ATP Docx forwarded successfully",
        showConfirmButton: false,
        timer: 2600,
      });

      // ✅ Optional: Refresh parent data if needed
      //if (typeof fetchUserManualDocVersionData === "function") {
      //  fetchUserManualDocVersionData();
     // }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Forward failed. Please try again.",
        showConfirmButton: false,
        timer: 2600,
      });
    }

    // ✅ Step 5: Close modal and reset
    onClose();
   // window.location.reload(); 
    
  } catch (error) {
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
      <div className="modal-backdrop show" style={{ zIndex: 100 }}></div>
      <div className="modal fade show" style={{ display: "block" }}>
        <div
          className="modal-dialog modal-lg modal-lg-custom"
          style={{ maxWidth: "50%", width: "30%" }}
        >
          <div className="modal-content modal-content-custom">
            <div className="modal-header bg-secondary text-white d-flex justify-content-between">
              <h5 className="modal-title">ATP Document Forward</h5>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="modal-body">
                    {/* Prepared By */}
                 {/* <FormControl fullWidth sx={{ mb: 2 }}> */}
                      {/* <InputLabel>Prepared By</InputLabel>
                      <Select
                        name="forwardBy"
                        value={values.forwardBy}
                        onChange={handleChange}
                        label="Prepared By"
                      >
                        {employees.map((emp) => (
                          <MenuItem
                            key={emp.empId}
                            value={emp.empId}
                            disabled={
                              values.reviewedBy === emp.empId ||
                              values.approvedBy === emp.empId
                            }
                          >
                            {emp.empName}, {emp.empDesigCode}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

                    {/* Reviewed By */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Reviewed By</InputLabel>
                      <Select
                        name="reviewedBy"
                        value={values.reviewedBy}
                        onChange={handleChange}
                        label="Reviewed By"

                        sx={{
                      '.MuiSelect-select': {
                            display: 'flex',
                     alignItems: 'center',
                    paddingTop: '12px',
                       paddingBottom: '12px',
                      },
                    }}
                      >
                        {employees.map((emp) => (
                          <MenuItem
                            key={emp.empId}
                            value={emp.empId}
                            disabled={
                              values.forwardBy === emp.empId ||
                              values.approvedBy === emp.empId
                            }
                          >
                            {emp.empName}, {emp.empDesigCode}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Approved By */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Approved By</InputLabel>
                      <Select
                        name="approvedBy"
                        value={values.approvedBy}
                        onChange={handleChange}
                        label="Approved By"
                        sx={{
                      '.MuiSelect-select': {
                            display: 'flex',
                     alignItems: 'center',
                    paddingTop: '12px',
                       paddingBottom: '12px',
                      },
                    }}
                      >
                        {employees.map((emp) => (
                          <MenuItem
                            key={emp.empId}
                            value={emp.empId}
                            disabled={
                              values.forwardBy === emp.empId ||
                              values.reviewedBy === emp.empId
                            }
                          >
                            {emp.empName}, {emp.empDesigCode}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {/* Footer */}
                  <div className="modal-footer d-flex justify-content-end">
                    <Button variant="contained" color="primary" type="submit">
                      Forward
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ATPForwardComponent;
