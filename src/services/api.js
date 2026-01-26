// Main API file - exports all API services
// Each service is now in its own file in the apis/ directory

import api from './apiClient';

// Auth API
export { authAPI } from './apis/authAPI';

// Sections API
export { sectionsAPI } from './apis/sectionsAPI';

// News API
export { newsAPI } from './apis/newsAPI';

// Partners API
export { partnersAPI } from './apis/partnersAPI';

// Heroes API
export { heroesAPI } from './apis/heroesAPI';

// Position API
export { positionAPI } from './apis/positionAPI';

// Management Team API
export { managementTeamAPI } from './apis/managementTeamAPI';

// Commission Members API
export { commissionMembersAPI } from './apis/commissionMembersAPI';

// Innovation Space API
export { innovationSpaceAPI } from './apis/innovationSpaceAPI';

// Online Service API
export { onlineServiceAPI } from './apis/onlineServiceAPI';

// Financial Report API
export { financialReportAPI } from './apis/financialReportAPI';

// Magazine API
export { magazineAPI } from './apis/magazineAPI';

// Books API
export { booksAPI } from './apis/booksAPI';

// Reports API
export { reportsAPI } from './apis/reportsAPI';

// Acts and Legal API
export { actsAndLegalAPI } from './apis/actsAndLegalAPI';

// Policies API
export { policiesAPI } from './apis/policiesAPI';

// Strategic Plan API
export { strategicPlanAPI } from './apis/strategicPlanAPI';

// Guideline Documents API
export { guidelineDocumentsAPI } from './apis/guidelineDocumentsAPI';

// Conference API
export { conferenceAPI } from './apis/conferenceAPI';

// Exhibition API
export { exhibitionAPI } from './apis/exhibitionAPI';

// Ongoing Project API
export { ongoingProjectAPI } from './apis/ongoingProjectAPI';

// Area of Partnership API
export { areaOfPartnershipAPI } from './apis/areaOfPartnershipAPI';

// Fellowship Grants API
export { fellowshipGrantsAPI } from './apis/fellowshipGrantsAPI';

// Press Release API
export { pressReleaseAPI } from './apis/pressReleaseAPI';

// Statement API
export { statementAPI } from './apis/statementAPI';

// Costech Video API
export { costechVideoAPI } from './apis/costechVideoAPI';

// Community Engagement API
export { communityEngagementAPI } from './apis/communityEngagementAPI';

// Newsletter API
export { newsletterAPI } from './apis/newsletterAPI';

// HERIN Institution API
export { herinInstitutionAPI } from './apis/herinInstitutionAPI';

// HERIN Point of Presence API
export { herinPointOfPresenceAPI } from './apis/herinPointOfPresenceAPI';

// Directorate API
export { directorateAPI } from './apis/directorateAPI';

// FAQ Category API
export { faqCategoryAPI } from './apis/faqCategoryAPI';

// FAQ API
export { faqAPI } from './apis/faqAPI';

// Footer Quick Link API
export { footerQuickLinkAPI } from './apis/footerQuickLinkAPI';

// Footer Contact Us API
export { footerContactUsAPI } from './apis/footerContactUsAPI';

// Footer E-Resource API
export { footerEresourceAPI } from './apis/footerEresourceAPI';

// Social Media Platform API
export { socialMediaPlatformAPI } from './apis/socialMediaPlatformAPI';

// Journal API
export { journalAPI } from './apis/journalAPI';

// Export the api client as default for backward compatibility
export default api;
