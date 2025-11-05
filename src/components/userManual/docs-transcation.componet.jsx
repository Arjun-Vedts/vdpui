import { Box, Grid, Typography } from "@mui/material";
import Navbar from "components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import './docs-tran.css';
import { format } from 'date-fns';

const DocsTransactionComponent = () => {

  const [data,setData]= useState(undefined);
  const [transaction,setTransaction] = useState([])


  const fetchData = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('docData'));
     // console.log('data-',data)
      const trans = JSON.parse(localStorage.getItem('transaction'));
     // console.log('trans-',trans)
      if(data && trans){
        setData(data)
       setTransaction(trans)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const docSta = {
    'INITIATION'        : ' Created By',
    'FORWARD': ' Forwarded By',
    'RETURN'       : ' Returned By',
    'RECOMMEND'   : 'Recommend By'
  };

  const back = ()=>{
    window.close();
  }
console.log('transaction',transaction)

  return (
          <Box className="mainRow">
            <Helmet>
                <title>User Manual Transaction</title>
            </Helmet>
            <Navbar />
            <Box id="main-container" className="main-container"><br />
               <Box id="card-title" ><Grid container spacing={2}>
                <Grid item xs={11} ><Typography variant="h6" component="h6" className="card-title-typography">User Manual Transaction</Typography></Grid>
                <Grid item xs={1} ><button className="btn backClass" onClick={() => back()}>Back</button></Grid>
               </Grid></Box>
               <Box id="card-body" className="box-centered">
                <Box className="col-md-11 card l-bg-blue-dark text-left-center-card mg-top-10"  >
                <Box display="flex" alignItems="center" gap="10px">
                  {/* <Box flex="20%"><span className="fw-bolder">Doc-Type </span> - {data && data.docType}</Box> */}
                  <Box flex="30%"><span className="fw-bolder">Project</span> - {data && data.projectName}</Box>
                  <Box flex="23%"><span className="fw-bolder">Particulars</span> - {data && data.particulars}</Box>
                  <Box flex="15%"><span className="fw-bolder">Version</span> - {(data && ('V' + data.versionNo + '-R' + data.releaseNo)) || '-'}</Box>
                  <Box flex="12%"><span className="fw-bolder">Issue Date</span>  - {data && data.issueDate && format(new Date(data.issueDate),'dd-MM-yyyy')}</Box> 
                </Box>
                </Box><br />
                <div id="card-body customized-card">
                <Box className="col-md-11  text-left-center-card mg-top-10"  >
                  {transaction && transaction.length >0 && transaction.map(item =>{
                    let statusColor = `${item.statusCode === 'INITIATION'?'initiated-bg' : (['FORWARD','RECOMMEND'].includes(item.statusCode) ? 'forwarde-bg' : ['REVOKED'].includes(item.statusCode)?'revoked-bg':['APPROVED'].includes(item.statusCode)?'verified-bg':['RETURN'].includes(item.statusCode)?'returned-bg':'approved-bg')}`;
                    return(
                      <>
                        <div className="timeline-row">
                        <div class="timeline-content" >
                          <h6 className={statusColor}> {docSta[item.statusCode]}&nbsp;/&nbsp;<span >{item.empName}</span></h6> 
                            <p style={{ backgroundColor: "#f0f2f5", padding: "10px", borderRadius: "5px" }}>
                              {item.remarks ? (
                                <>
                                  <span className="remarks_title" style={{ fontWeight: "bold" }}>Remarks : </span>
                                  {item.remarks}
                                </>
                              ) : (
                                <span className="remarks_title" style={{ fontWeight: "bold" }}>No Remarks</span>
                              )}
                            </p>
                        </div>
                        <div className="timeline-dot fb-bg mid-line"></div>
                        <div className="timeline-time">
                          <div className="form-inline margin-half-top"><span className="date-styles">{format(new Date(item.transactionDate),'MMM dd, yyyy, hh:mm a')}</span></div>
                        </div>
                      </div>
                      </>
                    )
                  })}
                </Box>
                </div>
               </Box>

            </Box>
          </Box>
  );

}
export default DocsTransactionComponent;