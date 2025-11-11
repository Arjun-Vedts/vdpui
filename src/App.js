import './App.css';
import 'core-js/stable'; // Polyfills for modern JavaScript features
import 'regenerator-runtime/runtime'; // Polyfill for async/await functionality
import Login from  'components/login/login.component.jsx';
import AuditStampingComponent from './components/admin/auditStamping.component.jsx';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard/dashboard.component';
import UseIdleTimer from 'common/idle-logout';
import UserManagerComponent from 'components/admin/userManager.component';
import FormRoleAccess from 'components/admin/formRoleAccess.component';
//import DivisionComponent from 'components/admin/division.component';
//import DivisionGroupComponent from 'components/admin/divisionGroup.component';
import ProjectComponent from 'components/admin/project.component';
import EmployeeComponent from 'components/admin/employee.component';
import DesignationComponent from 'components/admin/designation.component';
import UserManualDocRecordsComponent from 'components/userManual/usermanual-doc-records';
import SrsDocRecords from 'components/SRSDocx/srs-doc-records';
import AtpDocRecordComponent from 'components/atp/atp-doc-record.component';
import UserManualPreview from 'components/userManual/user-manual-preview.component';
import UserManualApproved from 'components/userManual/user-manual-approve.component';

import SRSDocsTransactionComponent from 'components/SRSDocx/srs-docs-transcation.component';
import DocsTransactionComponent from 'components/userManual/docs-transcation.componet';
import SRSDocxPreview from 'components/SRSDocx/srs-docx-preview.component';
import SRSApproved from 'components/SRSDocx/srs-approve.component';
import ATPDocsTransactionComponent from 'components/atp/atp-docs-transcation.component';
import ATPDocxPreview from 'components/atp/atp-docx-preview.component';
import ATPApproved from 'components/atp/atp-approve.component';

function App() {
  return (
    <div className="App">
      <UseIdleTimer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audit-stamping" element={<AuditStampingComponent />} />

        {/* Admin */}
        <Route path="/user-manager-list" element={<UserManagerComponent />} />
        <Route path="/form-role-access" element={<FormRoleAccess />} />
        {/* <Route path="/division" element={<DivisionComponent />} />
        <Route path="/division-group" element={<DivisionGroupComponent />} /> */}
         <Route path="/employee" element={<EmployeeComponent/>}  />
         <Route path="/designation" element={<DesignationComponent/>}  />
         <Route path="/project" element={<ProjectComponent />} />

         {/* user Manual Content*/}
         <Route path="/user-manual" element={<UserManualDocRecordsComponent />} />
           {/* user Manual Preview*/}
            
             <Route path="/userManualPreview" element={<UserManualPreview />} />

             {/* //userManualApproved */}
             <Route path="/userManualApproved" element={<UserManualApproved />} />
             
              {/*  transcation */}
               <Route path="/docs-trans" element={<DocsTransactionComponent />} /> 

           

         
           {/* SRS Docx */}
             <Route path="/srs-document" element={<SrsDocRecords />} />

              {/* ATP Docx */}
                <Route path="/atp-document" element={<AtpDocRecordComponent />} />

                 {/* SRS Preview*/}
            
             <Route path="/SRSDocxPreview" element={<SRSDocxPreview />} />

               {/*  SRS  Approved*/}
                  <Route path="/SRSApproved" element={<SRSApproved />} />


                          {/*   srs transcation */}
               <Route path="/srs-docs-trans" element={<SRSDocsTransactionComponent />} /> 


               {/* //atp-docs-trans */}
                <Route path="/atp-docs-trans" element={<ATPDocsTransactionComponent />} /> 
                {/* ATPDocxPreview
                ATPApproved */}
                {/* atp Preview*/}
            
             <Route path="/ATPDocxPreview" element={<ATPDocxPreview />} />

               {/*  atp  Approved*/}
                  <Route path="/ATPApproved" element={<ATPApproved />} />

    
      </Routes>
{/* <Login/> */}
    </div>
  );
}

export default App;
