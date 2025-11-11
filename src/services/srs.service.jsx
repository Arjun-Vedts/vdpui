import axios from 'axios';
import { authHeader } from './auth.header';
import config from "../environment/config";
const API_URL = config.API_URL;

export const getSRSDocVersionDtoListByProject = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}SRS-doc-version-list-by-project`, projectSelDto, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSDocVersionDtoListByProject', error);
        throw error;
    }
    
}


export const addNewsrsRelease = async (qaQTAddVerionDto) => {
    try {
        return (await axios.post(`${API_URL}add-new-srs-version`, qaQTAddVerionDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addNewsrsRelease', error);
        throw error;
    }
}

export const getSRSDocxMainChapters = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}SRS-docx-main-chapter-list`, projectSelDto,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSDocxMainChapters', error);
        throw error;
    }
}

export const getSRSMainChapters = async (projectSelDto,docversionReleaseId) => {
    try {
        
          const body = { ...projectSelDto, docversionReleaseId};
        return (await axios.post(`${API_URL}SRS-docx-main-chapter-list`, body,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualMainChapters', error);
        throw error;
    }
}

//getNotReqAbbreviationIdsSRS

export const getNotReqAbbreviationIdsSRS = async (DocVersionReleaseId) => {
    try {
        return (await axios.post(`${API_URL}get-SRS-not-req-abbreviation-ids`, DocVersionReleaseId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getNotReqAbbreviationIds', error);
        throw error;
    }
}


//updateSRSNotReqAbbreviationIds
export const updateSRSNotReqAbbreviationIds = async (qaqtDocAbbreviations, DocVersionReleaseId) => {
    try {
        const AbbreviationIds=[qaqtDocAbbreviations, DocVersionReleaseId]
        return (await axios.post(`${API_URL}update-not-srs-req-abbreviation-ids`, AbbreviationIds, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateSRSNotReqAbbreviationIds', error);
        throw error;
    }
}

export const SRSAddListToAddList = async (addSectionIdsDto) => {
    try {
        return (await axios.post(`${API_URL}srs-unadd-list-to-add-list`, addSectionIdsDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

//getSRSUnAddedChapterlist
export const getSRSUnAddedChapterlist = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}srs-unadded-chapter-list`, projectSelDto,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSUnAddedChapterlist', error);
        throw error;
    }
}


class srsDocSections {
    constructor(
      sectionId = 0,
      sectionName = '',
      projectId,
      createdBy,
      createdDate,
      modifiedBy,
      modifiedDate ,
      isActive = 0,
       docVersionReleaseId =0
    ) {
      this.sectionId = sectionId;
      this.sectionName = sectionName;
      this.projectId = projectId;
      this.createdBy = createdBy;
      this.createdDate = createdDate;
      this.modifiedBy = modifiedBy;
      this.modifiedDate = modifiedDate;
      this.isActive = isActive;
      this.docVersionReleaseId=docVersionReleaseId;
    }
  }

  export default srsDocSections;



    export const addSrsNewChapterSection = async (srsDocSections) => {
    try {
       
        return (await axios.post(`${API_URL}srs-add-new-section`, srsDocSections, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addNewChapter', error);
        throw error;
    }
}

export const updateSRSChapterBySnNo = async (values) => {
    try {
       const arrayValues = Array.from(values,([id,value]) => ({id,value}))
        return (await axios.put(`${API_URL}update-srs-chapter-by-sn-no`, arrayValues, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

export const updateSRSChapterNameById = async (chapterName) => {
    try {
        return (await axios.post(`${API_URL}update-srs-chapter-name-by-id`, chapterName,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateChapterNameById', error);
        throw error;
    }
}



export const getSRSSubChaptersById = async (chapterId) => {
    try {
        return (await axios.post(`${API_URL}SRSSubChaptersById`, chapterId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSubChaptersById', error);
        throw error;
    }
}

export const addSRSSubChapterNameByChapterId = async (chapterName) => {
    try {
        return (await axios.post(`${API_URL}add-srs-new-sub-chapter-by-id`, chapterName, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addSubChapterNameByChapterId', error);
        throw error;
    }
}

export const updateSRSChapterContent = async (chaperContent) => {
    try {
        return (await axios.post(`${API_URL}update-SRS-chapter-content-by-id`, chaperContent, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateChapterContent', error);
        throw error;
    }
}

export const getSRSDocRevisionRecordById = async (docVersionReleaseId) => {
    try {
        return (await axios.post(`${API_URL}get-srs-doc-revision-record`,
             docVersionReleaseId, 
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

export const getSRSAllChapters = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}srs-all-chapter-list`, projectSelDto,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualAllChapters', error);
        throw error;
    }
}


export const getSRSApprovedDocListByProject = async (qaqtDocTypeAndProjectDto) => {
    try {
        return (await axios.post(`${API_URL}approved-user-manual-doc-list-by-project`, qaqtDocTypeAndProjectDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getApprovedDocListByProject', error);
        throw error;
    }
}

export const getSRSTableContentList = async (qaqtDocTypeAndProjectDto) => {
    try {
        return (await axios.post(`${API_URL}get-srs-table-content-list`, qaqtDocTypeAndProjectDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSTableContentList', error);
    }
}


export const updateSRSchapterPagebreakAndLandscape = async (chapterPagebreakOrLandscape) => {
    try {
        return (await axios.post(`${API_URL}updateSRSchapterPagebreakAndLandscape`, chapterPagebreakOrLandscape, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updatechapterPagebreakAndLandscape', error);
        throw error;
    }
}

export const getSRSTableContentById = async (contentId) => {
    try {
        return (await axios.post(`${API_URL}get-srs-table-content-by-id`, contentId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualTableContentById', error);
    }
}


export const updateSRSTableContent = async (docContentDto) => {
    try {
        return (await axios.post(`${API_URL}update-srs-table-content`, docContentDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateUserManualTableContent', error);
    }
}

export const addSRSTableContent = async (docContentDto) => {
    try {
        return (await axios.post(`${API_URL}add-SRS-table-content`, docContentDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addSRSTableContent', error);
    }
}

export const getSRSDocTransactionList = async () => {
    
    try {
        return (await axios.get(`${API_URL}srs-doc-transaction-list` , 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}


export const deleteSRSChapterByChapterId = async (chapterId) => {
    try {
        return (await axios.post(`${API_URL}delete-srs-chapter-by-id`, chapterId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in deleteChapterById', error);
        throw error;
    }
}


 export const forwardSRSDocxRecord = async (userManualDocSections) => {
    try {
        console.log("userManualDocSections",userManualDocSections);
        return (await axios.post(`${API_URL}srs-docx-forward`, userManualDocSections, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in forwardUserManual', error);
        throw error;
    }
}


// For returning the SRS
export const SRSReturnReview = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-srs-review/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
   // return response.data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
};

//SRSRecommendReview
export const SRSRecommendReview = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}recommend-srs-review/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
   // return response.data;
  } catch (error) {
    console.error("Error recommending user manual:", error);
    throw error;
  }
};


//SRSReturnApproval
export const SRSReturnApproval = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-srs-approved/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}

//SRSApproval
export const SRSApproval = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}approved-SRS/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}

//SRSReForward
export const SRSReForward = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-srs-reforward/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}

//getDataAddedTemplates
export const DataSRSAddedTemplates = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}getSRSDataAddedTemplates.htm`, {
            params: { projectId }, 
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(), 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred in getDataAddedTemplates', error);
        throw error;
    }
};
