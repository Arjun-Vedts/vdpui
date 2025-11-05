import axios from 'axios';
import { authHeader } from './auth.header';
import config from "../environment/config";
const API_URL = config.API_URL;

export const getATPDocVersionDtoListByProject = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}ATP-doc-version-list-by-project`, projectSelDto, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSDocVersionDtoListByProject', error);
        throw error;
    }
    
}


export const addNewAtpRelease = async (qaQTAddVerionDto) => {
    try {
        return (await axios.post(`${API_URL}add-new-atp-version`, qaQTAddVerionDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addNewAtpRelease', error);
        throw error;
    }
}









export const getATPDocTransactionList = async () => {
    try {
        return (await axios.get(`${API_URL}atp-doc-transaction-list` , 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}


export const getAtpTableContentList = async (qaqtDocTypeAndProjectDto) => {
    try {
        return (await axios.post(`${API_URL}get-atp-table-content-list`, qaqtDocTypeAndProjectDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSRSTableContentList', error);
    }
}


export const getATPMainChapters = async (projectSelDto,docversionReleaseId) => {
    try {
         const body = { ...projectSelDto, docversionReleaseId};
        return (await axios.post(`${API_URL}atp-docx-main-chapter-list`, body,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualMainChapters', error);
        throw error;
    }
}


export const getNotReqAbbreviationIdsATP = async (DocVersionReleaseId) => {
    try {
        return (await axios.post(`${API_URL}get-ATP-not-req-abbreviation-ids`, DocVersionReleaseId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getNotReqAbbreviationIds', error);
        throw error;
    }
}

export const updateATPNotReqAbbreviationIds = async (qaqtDocAbbreviations, DocVersionReleaseId) => {
    try {
        const AbbreviationIds=[qaqtDocAbbreviations, DocVersionReleaseId]
        return (await axios.post(`${API_URL}update-not-atp-req-abbreviation-ids`, AbbreviationIds, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateSRSNotReqAbbreviationIds', error);
        throw error;
    }
}


export const getATPUnAddedChapterlist = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}atp-unadded-chapter-list`, projectSelDto,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getATPUnAddedChapterlist', error);
        throw error;
    }
}

export const ATPAddListToAddList = async (addSectionIdsDto) => {
    try {
        return (await axios.post(`${API_URL}atp-unadd-list-to-add-list`, addSectionIdsDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

    export const addAtpNewChapterSection = async (atpDocSections) => {
    try {
       
        return (await axios.post(`${API_URL}atp-add-new-section`, atpDocSections, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addNewChapter', error);
        throw error;
    }
}

class atpDocSections {
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

  export default atpDocSections;


  export const updateATPChapterBySnNo = async (values) => {
    try {
       const arrayValues = Array.from(values,([id,value]) => ({id,value}))
        return (await axios.put(`${API_URL}update-atp-chapter-by-sn-no`, arrayValues, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

export const updateAtpchapterPagebreakAndLandscape = async (chapterPagebreakOrLandscape) => {
    try {
        return (await axios.post(`${API_URL}updateATPchapterPagebreakAndLandscape`, chapterPagebreakOrLandscape, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updatechapterPagebreakAndLandscape', error);
        throw error;
    }
}



export const getATPSubChaptersById = async (chapterId) => {
    try {
        return (await axios.post(`${API_URL}ATPSubChaptersById`, chapterId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getSubChaptersById', error);
        throw error;
    }
}

export const updateAtpChapterNameById = async (chapterName) => {
    try {
        return (await axios.post(`${API_URL}update-atp-chapter-name-by-id`, chapterName,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateChapterNameById', error);
        throw error;
    }
}


export const updateAtpChapterContent = async (chaperContent) => {
    try {
        return (await axios.post(`${API_URL}update-atp-chapter-content-by-id`, chaperContent, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateChapterContent', error);
        throw error;
    }
}


export const addAtpSubChapterNameByChapterId = async (chapterName) => {
    try {
        return (await axios.post(`${API_URL}add-atp-new-sub-chapter-by-id`, chapterName, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addSubChapterNameByChapterId', error);
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


export const getATPTableContentById = async (contentId) => {
    try {
        return (await axios.post(`${API_URL}get-atp-table-content-by-id`, contentId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualTableContentById', error);
    }
}


export const getAtpAllChapters = async (projectSelDto) => {
    try {
        return (await axios.post(`${API_URL}atp-all-chapter-list`, projectSelDto,
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getUserManualAllChapters', error);
        throw error;
    }
}


export const getAtpApprovedDocListByProject = async (qaqtDocTypeAndProjectDto) => {
    try {
        return (await axios.post(`${API_URL}approved-user-manual-doc-list-by-project`, qaqtDocTypeAndProjectDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in getApprovedDocListByProject', error);
        throw error;
    }
}


export const getAtpDocRevisionRecordById = async (docVersionReleaseId) => {
    try {
        return (await axios.post(`${API_URL}get-atp-doc-revision-record`,
             docVersionReleaseId, 
             { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        throw error;
    }
}

export const updateAtpTableContent = async (docContentDto) => {
    try {
        return (await axios.post(`${API_URL}update-atp-table-content`, docContentDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in updateUserManualTableContent', error);
    }
}

export const addAtpTableContent = async (docContentDto) => {
    try {
        return (await axios.post(`${API_URL}add-atp-table-content`, docContentDto, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in addSRSTableContent', error);
    }
}


export const deleteATPChapterByChapterId = async (chapterId) => {
    try {
        return (await axios.post(`${API_URL}delete-atp-chapter-by-id`, chapterId, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in deleteChapterById', error);
        throw error;
    }
}


 export const forwardATPDocxRecord = async (userManualDocSections) => {
    try {
        console.log("userManualDocSections",userManualDocSections);
        return (await axios.post(`${API_URL}atp-docx-forward`, userManualDocSections, 
            { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
    } catch (error) {
        console.error('Error occurred in forwardUserManual', error);
        throw error;
    }
}

export const ATPReturnReview = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-atp-review/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
   // return response.data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
};

export const ATPRecommendReview = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}recommend-atp-review/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
   // return response.data;
  } catch (error) {
    console.error("Error recommending user manual:", error);
    throw error;
  }
};


//SRSReForward
export const ATPReForward = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-atp-reforward/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}

//getDataAddedTemplates
export const DataATPAddedTemplates = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}getATPDataAddedTemplates.htm`, {
            params: { projectId }, 
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(), 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error occurred in DataATPAddedTemplates', error);
        throw error;
    }
};


export const ATPReturnApproval = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}return-atp-approved/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}

//SRSApproval
export const ATPApproval = async (remarks,id) => {
  try {
   return (await axios.post(`${API_URL}approved-atp/${id}`, remarks, { headers: { 'Content-Type': 'application/json', ...authHeader() } })).data;
  } catch (error) {
    console.error("Error returning user manual:", error);
    throw error;
  }
}


