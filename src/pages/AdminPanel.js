import { useState, useEffect } from 'react';
import '../css/AdminPanel.css';
import { SectionPage } from './SectionPage';
import { NewsPage } from './NewsPage';
import { PartnersPage } from './PartnersPage';
import { HeroesPage } from './HeroesPage';
import { PositionPage } from './PositionPage';
import { ManagementTeamPage } from './ManagementTeamPage';
import { CommissionMembersPage } from './CommissionMembersPage';
import { InnovationSpacePage } from './InnovationSpacePage';
import { OnlineServicePage } from './OnlineServicePage';
import { FinancialReportPage } from './FinancialReportPage';
import { MagazinePage } from './MagazinePage';
import { NewsletterPage } from './NewsletterPage';
import { BooksPage } from './BooksPage';
import { ReportsPage } from './ReportsPage';
import { ActsAndLegalPage } from './ActsAndLegalPage';
import { PoliciesPage } from './PoliciesPage';
import { StrategicPlanPage } from './StrategicPlanPage';
import { GuidelineDocumentsPage } from './GuidelineDocumentsPage';
import { ConferencePage } from './ConferencePage';
import { ExhibitionPage } from './ExhibitionPage';
import { OngoingProjectPage } from './OngoingProjectPage';
import { AreaOfPartnershipPage } from './AreaOfPartnershipPage';
import { FellowshipGrantsPage } from './FellowshipGrantsPage';
import { PressReleasePage } from './PressReleasePage';
import { StatementPage } from './StatementPage';
import { CostechVideoPage } from './CostechVideoPage';
import { CommunityEngagementPage } from './CommunityEngagementPage';
import { HerinInstitutionPage } from './HerinInstitutionPage';
import { DirectoratePage } from './DirectoratePage';
import { FaqCategoryPage } from './FaqCategoryPage';
import { FaqPage } from './FaqPage';
import { AddSectionModal } from '../components/AddSectionModal';
import { AddNewsModal } from '../components/AddNewsModal';
import { AddPartnerModal } from '../components/AddPartnerModal';
import { AddHeroModal } from '../components/AddHeroModal';
import { AddPositionModal } from '../components/AddPositionModal';
import { AddManagementTeamModal } from '../components/AddManagementTeamModal';
import { AddCommissionMemberModal } from '../components/AddCommissionMemberModal';
import { AddInnovationSpaceModal } from '../components/AddInnovationSpaceModal';
import { AddOnlineServiceModal } from '../components/AddOnlineServiceModal';
import { AddFinancialReportModal } from '../components/AddFinancialReportModal';
import { AddMagazineModal } from '../components/AddMagazineModal';
import { AddNewsletterModal } from '../components/AddNewsletterModal';
import { AddBookModal } from '../components/AddBookModal';
import { AddReportModal } from '../components/AddReportModal';
import { AddActsAndLegalModal } from '../components/AddActsAndLegalModal';
import { AddPolicyModal } from '../components/AddPolicyModal';
import { AddStrategicPlanModal } from '../components/AddStrategicPlanModal';
import { AddGuidelineDocumentModal } from '../components/AddGuidelineDocumentModal';
import { AddConferenceModal } from '../components/AddConferenceModal';
import { AddExhibitionModal } from '../components/AddExhibitionModal';
import { AddOngoingProjectModal } from '../components/AddOngoingProjectModal';
import { AddAreaOfPartnershipModal } from '../components/AddAreaOfPartnershipModal';
import { AddFellowshipGrantModal } from '../components/AddFellowshipGrantModal';
import { AddPressReleaseModal } from '../components/AddPressReleaseModal';
import { AddStatementModal } from '../components/AddStatementModal';
import { AddCostechVideoModal } from '../components/AddCostechVideoModal';
import { AddCommunityEngagementModal } from '../components/AddCommunityEngagementModal';
import { AddHerinInstitutionModal } from '../components/AddHerinInstitutionModal';
import { AddDirectorateModal } from '../components/AddDirectorateModal';
import { AddFaqCategoryModal } from '../components/AddFaqCategoryModal';
import { AddFaqModal } from '../components/AddFaqModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { authAPI, sectionsAPI, newsAPI, partnersAPI, heroesAPI, positionAPI, managementTeamAPI, commissionMembersAPI, innovationSpaceAPI, onlineServiceAPI, financialReportAPI, magazineAPI, newsletterAPI, booksAPI, reportsAPI, actsAndLegalAPI, policiesAPI, strategicPlanAPI, guidelineDocumentsAPI, conferenceAPI, exhibitionAPI, ongoingProjectAPI, areaOfPartnershipAPI, fellowshipGrantsAPI, pressReleaseAPI, statementAPI, costechVideoAPI, communityEngagementAPI, herinInstitutionAPI, directorateAPI, faqCategoryAPI, faqAPI } from '../services/api';

export function AdminPanel({ onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [openDropdowns, setOpenDropdowns] = useState({
    homepage: false,
    publication: false,
    program: false,
    events: false,
    mediaCentre: false,
    about: false,
    herin: false,
    faqManagement: false
  });
  const [sections, setSections] = useState([]);
  const [news, setNews] = useState([]);
  const [partners, setPartners] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [commissionMembers, setCommissionMembers] = useState([]);
  const [innovationSpaces, setInnovationSpaces] = useState([]);
  const [onlineServices, setOnlineServices] = useState([]);
  const [financialReports, setFinancialReports] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [books, setBooks] = useState([]);
  const [reports, setReports] = useState([]);
  const [actsAndLegal, setActsAndLegal] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [strategicPlans, setStrategicPlans] = useState([]);
  const [guidelineDocuments, setGuidelineDocuments] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [areasOfPartnership, setAreasOfPartnership] = useState([]);
  const [fellowshipGrants, setFellowshipGrants] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [statements, setStatements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [communityEngagements, setCommunityEngagements] = useState([]);
  const [herinInstitutions, setHerinInstitutions] = useState([]);
  const [directorates, setDirectorates] = useState([]);
  const [faqCategories, setFaqCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [showAddPartnerForm, setShowAddPartnerForm] = useState(false);
  const [showAddHeroForm, setShowAddHeroForm] = useState(false);
  const [showAddPositionForm, setShowAddPositionForm] = useState(false);
  const [showAddTeamMemberForm, setShowAddTeamMemberForm] = useState(false);
  const [showAddCommissionMemberForm, setShowAddCommissionMemberForm] = useState(false);
  const [showAddInnovationSpaceForm, setShowAddInnovationSpaceForm] = useState(false);
  const [showAddOnlineServiceForm, setShowAddOnlineServiceForm] = useState(false);
  const [showAddFinancialReportForm, setShowAddFinancialReportForm] = useState(false);
  const [showAddMagazineForm, setShowAddMagazineForm] = useState(false);
  const [showAddNewsletterForm, setShowAddNewsletterForm] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [showAddActsAndLegalForm, setShowAddActsAndLegalForm] = useState(false);
  const [showAddPolicyForm, setShowAddPolicyForm] = useState(false);
  const [showAddStrategicPlanForm, setShowAddStrategicPlanForm] = useState(false);
  const [showAddGuidelineDocumentForm, setShowAddGuidelineDocumentForm] = useState(false);
  const [showAddConferenceForm, setShowAddConferenceForm] = useState(false);
  const [showAddExhibitionForm, setShowAddExhibitionForm] = useState(false);
  const [showAddOngoingProjectForm, setShowAddOngoingProjectForm] = useState(false);
  const [showAddAreaOfPartnershipForm, setShowAddAreaOfPartnershipForm] = useState(false);
  const [showAddFellowshipGrantForm, setShowAddFellowshipGrantForm] = useState(false);
  const [showAddPressReleaseForm, setShowAddPressReleaseForm] = useState(false);
  const [showAddStatementForm, setShowAddStatementForm] = useState(false);
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [showAddCommunityEngagementForm, setShowAddCommunityEngagementForm] = useState(false);
  const [showAddHerinInstitutionForm, setShowAddHerinInstitutionForm] = useState(false);
  const [showAddDirectorateForm, setShowAddDirectorateForm] = useState(false);
  const [showAddFaqCategoryForm, setShowAddFaqCategoryForm] = useState(false);
  const [showAddFaqForm, setShowAddFaqForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);
  const [editingHero, setEditingHero] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [editingCommissionMember, setEditingCommissionMember] = useState(null);
  const [editingInnovationSpace, setEditingInnovationSpace] = useState(null);
  const [editingOnlineService, setEditingOnlineService] = useState(null);
  const [editingFinancialReport, setEditingFinancialReport] = useState(null);
  const [editingMagazine, setEditingMagazine] = useState(null);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [editingActsAndLegal, setEditingActsAndLegal] = useState(null);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editingStrategicPlan, setEditingStrategicPlan] = useState(null);
  const [editingGuidelineDocument, setEditingGuidelineDocument] = useState(null);
  const [editingConference, setEditingConference] = useState(null);
  const [editingExhibition, setEditingExhibition] = useState(null);
  const [editingOngoingProject, setEditingOngoingProject] = useState(null);
  const [editingAreaOfPartnership, setEditingAreaOfPartnership] = useState(null);
  const [editingFellowshipGrant, setEditingFellowshipGrant] = useState(null);
  const [editingPressRelease, setEditingPressRelease] = useState(null);
  const [editingStatement, setEditingStatement] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [editingCommunityEngagement, setEditingCommunityEngagement] = useState(null);
  const [editingHerinInstitution, setEditingHerinInstitution] = useState(null);
  const [editingDirectorate, setEditingDirectorate] = useState(null);
  const [editingFaqCategory, setEditingFaqCategory] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: '', type: '', onConfirm: null });
  
  // Pagination state
  const [heroesPagination, setHeroesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [newsPagination, setNewsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [partnersPagination, setPartnersPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [onlineServicesPagination, setOnlineServicesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [innovationSpacesPagination, setInnovationSpacesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [faqCategoriesPagination, setFaqCategoriesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [faqsPagination, setFaqsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [ongoingProjectsPagination, setOngoingProjectsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [areasOfPartnershipPagination, setAreasOfPartnershipPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [fellowshipGrantsPagination, setFellowshipGrantsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [booksPagination, setBooksPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [magazinesPagination, setMagazinesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [reportsPagination, setReportsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [policiesPagination, setPoliciesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [guidelineDocumentsPagination, setGuidelineDocumentsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [strategicPlansPagination, setStrategicPlansPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [actsAndLegalPagination, setActsAndLegalPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [financialReportsPagination, setFinancialReportsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [pressReleasesPagination, setPressReleasesPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [statementsPagination, setStatementsPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [videosPagination, setVideosPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [newslettersPagination, setNewslettersPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [directoratesPagination, setDirectoratesPagination] = useState({ page: 1, limit: 10, total: 0 });
  
  // Loading states to prevent multiple submissions
  const [savingNews, setSavingNews] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [savingPartner, setSavingPartner] = useState(false);

  // Fetch sections, news, partners, heroes, positions, and team members on component mount
  useEffect(() => {
    fetchSections();
    fetchNews();
    fetchPartners();
    fetchHeroes();
    fetchPositions();
    fetchTeamMembers();
    fetchOnlineServices();
    fetchFinancialReports();
    fetchMagazines();
    fetchNewsletters();
    fetchBooks();
    fetchReports();
    fetchActsAndLegal();
    fetchPolicies();
    fetchStrategicPlans();
    fetchGuidelineDocuments();
    fetchConferences();
    fetchExhibitions();
    fetchOngoingProjects();
    fetchAreasOfPartnership();
    fetchFellowshipGrants();
    fetchPressReleases();
    fetchStatements();
    fetchVideos();
    fetchCommunityEngagements();
    fetchHerinInstitutions();
    fetchDirectorates();
    fetchFaqCategories();
    fetchFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-open dropdowns when their items are active
  useEffect(() => {
    const homepageItems = ['heroes', 'news', 'partners'];
    const publicationItems = ['books', 'magazine', 'reports', 'policies', 'guideline-documents', 'strategic-plan', 'acts-and-legal', 'financial-report'];
    const programItems = ['ongoing-project', 'area-of-partnership'];
    const eventsItems = ['exhibition', 'conference', 'community-engagement'];
    const mediaCentreItems = ['press-release', 'statement', 'costech-video', 'newsletter'];
    const aboutItems = ['positions', 'management-team', 'commission-members'];
    const faqManagementItems = ['faq-category', 'faq'];
    const herinItems = ['herin-institution'];

    setOpenDropdowns(prev => ({
      homepage: homepageItems.includes(activeNav) ? true : prev.homepage,
      publication: publicationItems.includes(activeNav) ? true : prev.publication,
      program: programItems.includes(activeNav) ? true : prev.program,
      events: eventsItems.includes(activeNav) ? true : prev.events,
      mediaCentre: mediaCentreItems.includes(activeNav) ? true : prev.mediaCentre,
      about: aboutItems.includes(activeNav) ? true : prev.about,
      faqManagement: faqManagementItems.includes(activeNav) ? true : prev.faqManagement,
      herin: herinItems.includes(activeNav) ? true : prev.herin
    }));
  }, [activeNav]);

  // Refresh FAQ data when navigating to FAQ pages
  useEffect(() => {
    if (activeNav === 'faq-category' || activeNav === 'faq') {
      fetchFaqCategories();
      if (activeNav === 'faq') {
        fetchFaqs();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNav]);

  const fetchSections = async () => {
    try {
      const response = await sectionsAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to sections format
        const mappedSections = response.returnData.list_of_item.map(section => ({
          id: section.id?.toString() || Date.now().toString(),
          title: section.name || section.title || '',
          content: section.content || '',
          description: section.description || '',
          image: section.image || null,
          createdAt: section.created_at || section.createdAt || new Date().toISOString(),
          isVisible: section.is_visible !== undefined ? section.is_visible : (section.isVisible !== undefined ? section.isVisible : true),
        }));
        setSections(mappedSections);
      }
    } catch (err) {
      console.error('Error fetching sections:', err);
    }
  };

  const showDeleteConfirmation = (id, name, type, onConfirm) => {
    setDeleteConfirmation({ show: true, id, name, type, onConfirm });
  };

  const handleDeleteSection = async (id) => {
    const section = sections.find(s => s.id === id);
    const sectionName = section?.title || section?.name || 'this section';
    showDeleteConfirmation(id, sectionName, 'section', async () => {
    try {
      const response = await sectionsAPI.delete(id);
      if (response.status === 'OK') {
        await fetchSections();
        alert('Section deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete section');
      }
    } catch (err) {
      console.error('Error deleting section:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete section. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const fetchNews = async (page = newsPagination.page, limit = newsPagination.limit) => {
    try {
      const response = await newsAPI.getAll(page, limit);
      
      // Handle different response structures
      let newsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        newsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || newsList.length;
      } else if (response.returnData?.list_of_item) {
        newsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || newsList.length;
      } else if (Array.isArray(response.returnData)) {
        newsList = response.returnData;
        total = newsList.length;
      } else if (Array.isArray(response)) {
        newsList = response;
        total = newsList.length;
      }
      
      if (newsList && newsList.length > 0) {
        // Map API response to news format
        const mappedNews = newsList.map(item => ({
          id: item.id?.toString() || Date.now().toString(),
          title: item.title || '',
          description: item.description || '',
          date: item.date || item.created_at || new Date().toISOString().split('T')[0],
          image: item.image || null,
          createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        }));
        setNews(mappedNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setNewsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setNews([]);
        setNewsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setNews([]);
      setNewsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const fetchPartners = async (page = partnersPagination.page, limit = partnersPagination.limit) => {
    try {
      const response = await partnersAPI.getAll(page, limit);
      
      // Handle different response structures
      let partnersList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        partnersList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || partnersList.length;
      } else if (response.returnData?.list_of_item) {
        partnersList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || partnersList.length;
      } else if (Array.isArray(response.returnData)) {
        partnersList = response.returnData;
        total = partnersList.length;
      } else if (Array.isArray(response)) {
        partnersList = response;
        total = partnersList.length;
      }
      
      if (partnersList && partnersList.length > 0) {
        // Map API response to partners format
        const mappedPartners = partnersList.map(partner => ({
          id: partner.id?.toString() || Date.now().toString(),
          name: partner.name || '',
          logo: partner.logo || partner.image || null,
          createdAt: partner.created_at || partner.createdAt || new Date().toISOString(),
        }));
        setPartners(mappedPartners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setPartnersPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setPartners([]);
        setPartnersPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching partners:', err);
      setPartners([]);
      setPartnersPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const fetchHeroes = async (page = heroesPagination.page, limit = heroesPagination.limit) => {
    try {
      const response = await heroesAPI.getAll(page, limit);
      
      // Handle different response structures
      let heroesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        heroesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || heroesList.length;
      } else if (response.returnData?.list_of_item) {
        // If status is not OK but list_of_item exists
        heroesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || heroesList.length;
      } else if (Array.isArray(response.returnData)) {
        // If returnData is directly an array
        heroesList = response.returnData;
        total = heroesList.length;
      } else if (Array.isArray(response)) {
        // If response is directly an array
        heroesList = response;
        total = heroesList.length;
      }
      
      if (heroesList && heroesList.length > 0) {
        // Map API response to heroes format
        const mappedHeroes = heroesList.map((hero, index) => ({
          id: hero.id?.toString() || `hero-${Date.now()}-${index}`,
          name: hero.name || '',
            title: hero.title || '',
            tagline: hero.tagline || '',
          description: hero.description || '',
            content: hero.content || '',
          reference: hero.reference || null,
            image: hero.image || null,
            createdAt: hero.created_at || hero.createdAt || new Date().toISOString(),
        }));
        setHeroes(mappedHeroes.sort((a, b) => {
          // Sort by reference if available, otherwise by date
          if (a.reference && b.reference) {
            return parseInt(a.reference) - parseInt(b.reference);
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
        setHeroesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setHeroes([]);
        setHeroesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching heroes:', err);
      setHeroes([]);
      setHeroesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  // Pagination handlers
  const handleHeroesPageChange = (page) => {
    setHeroesPagination(prev => ({ ...prev, page }));
    fetchHeroes(page, heroesPagination.limit);
  };

  const handleHeroesItemsPerPageChange = (limit) => {
    setHeroesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchHeroes(1, limit);
  };

  const handleNewsPageChange = (page) => {
    setNewsPagination(prev => ({ ...prev, page }));
    fetchNews(page, newsPagination.limit);
  };

  const handleNewsItemsPerPageChange = (limit) => {
    setNewsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchNews(1, limit);
  };

  const handlePartnersPageChange = (page) => {
    setPartnersPagination(prev => ({ ...prev, page }));
    fetchPartners(page, partnersPagination.limit);
  };

  const handlePartnersItemsPerPageChange = (limit) => {
    setPartnersPagination(prev => ({ ...prev, page: 1, limit }));
    fetchPartners(1, limit);
  };

  // Additional pagination handlers
  const handleOnlineServicesPageChange = (page) => {
    setOnlineServicesPagination(prev => ({ ...prev, page }));
    fetchOnlineServices(page, onlineServicesPagination.limit);
  };

  const handleOnlineServicesItemsPerPageChange = (limit) => {
    setOnlineServicesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchOnlineServices(1, limit);
  };

  const handleInnovationSpacesPageChange = (page) => {
    setInnovationSpacesPagination(prev => ({ ...prev, page }));
    fetchInnovationSpaces(page, innovationSpacesPagination.limit);
  };

  const handleInnovationSpacesItemsPerPageChange = (limit) => {
    setInnovationSpacesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchInnovationSpaces(1, limit);
  };

  const handleFaqCategoriesPageChange = (page) => {
    setFaqCategoriesPagination(prev => ({ ...prev, page }));
    fetchFaqCategories(page, faqCategoriesPagination.limit);
  };

  const handleFaqCategoriesItemsPerPageChange = (limit) => {
    setFaqCategoriesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchFaqCategories(1, limit);
  };

  const handleFaqsPageChange = (page) => {
    setFaqsPagination(prev => ({ ...prev, page }));
    fetchFaqs(page, faqsPagination.limit);
  };

  const handleFaqsItemsPerPageChange = (limit) => {
    setFaqsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchFaqs(1, limit);
  };

  const handleOngoingProjectsPageChange = (page) => {
    setOngoingProjectsPagination(prev => ({ ...prev, page }));
    fetchOngoingProjects(page, ongoingProjectsPagination.limit);
  };

  const handleOngoingProjectsItemsPerPageChange = (limit) => {
    setOngoingProjectsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchOngoingProjects(1, limit);
  };

  const handleAreasOfPartnershipPageChange = (page) => {
    setAreasOfPartnershipPagination(prev => ({ ...prev, page }));
    fetchAreasOfPartnership(page, areasOfPartnershipPagination.limit);
  };

  const handleAreasOfPartnershipItemsPerPageChange = (limit) => {
    setAreasOfPartnershipPagination(prev => ({ ...prev, page: 1, limit }));
    fetchAreasOfPartnership(1, limit);
  };

  const handleFellowshipGrantsPageChange = (page) => {
    setFellowshipGrantsPagination(prev => ({ ...prev, page }));
    fetchFellowshipGrants(page, fellowshipGrantsPagination.limit);
  };

  const handleFellowshipGrantsItemsPerPageChange = (limit) => {
    setFellowshipGrantsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchFellowshipGrants(1, limit);
  };

  const handleBooksPageChange = (page) => {
    setBooksPagination(prev => ({ ...prev, page }));
    fetchBooks(page, booksPagination.limit);
  };

  const handleBooksItemsPerPageChange = (limit) => {
    setBooksPagination(prev => ({ ...prev, page: 1, limit }));
    fetchBooks(1, limit);
  };

  const handleMagazinesPageChange = (page) => {
    setMagazinesPagination(prev => ({ ...prev, page }));
    fetchMagazines(page, magazinesPagination.limit);
  };

  const handleMagazinesItemsPerPageChange = (limit) => {
    setMagazinesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchMagazines(1, limit);
  };

  const handleReportsPageChange = (page) => {
    setReportsPagination(prev => ({ ...prev, page }));
    fetchReports(page, reportsPagination.limit);
  };

  const handleReportsItemsPerPageChange = (limit) => {
    setReportsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchReports(1, limit);
  };

  const handlePoliciesPageChange = (page) => {
    setPoliciesPagination(prev => ({ ...prev, page }));
    fetchPolicies(page, policiesPagination.limit);
  };

  const handlePoliciesItemsPerPageChange = (limit) => {
    setPoliciesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchPolicies(1, limit);
  };

  const handleGuidelineDocumentsPageChange = (page) => {
    setGuidelineDocumentsPagination(prev => ({ ...prev, page }));
    fetchGuidelineDocuments(page, guidelineDocumentsPagination.limit);
  };

  const handleGuidelineDocumentsItemsPerPageChange = (limit) => {
    setGuidelineDocumentsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchGuidelineDocuments(1, limit);
  };

  const handleStrategicPlansPageChange = (page) => {
    setStrategicPlansPagination(prev => ({ ...prev, page }));
    fetchStrategicPlans(page, strategicPlansPagination.limit);
  };

  const handleStrategicPlansItemsPerPageChange = (limit) => {
    setStrategicPlansPagination(prev => ({ ...prev, page: 1, limit }));
    fetchStrategicPlans(1, limit);
  };

  const handleActsAndLegalPageChange = (page) => {
    setActsAndLegalPagination(prev => ({ ...prev, page }));
    fetchActsAndLegal(page, actsAndLegalPagination.limit);
  };

  const handleActsAndLegalItemsPerPageChange = (limit) => {
    setActsAndLegalPagination(prev => ({ ...prev, page: 1, limit }));
    fetchActsAndLegal(1, limit);
  };

  const handleFinancialReportsPageChange = (page) => {
    setFinancialReportsPagination(prev => ({ ...prev, page }));
    fetchFinancialReports(page, financialReportsPagination.limit);
  };

  const handleFinancialReportsItemsPerPageChange = (limit) => {
    setFinancialReportsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchFinancialReports(1, limit);
  };

  const handlePressReleasesPageChange = (page) => {
    setPressReleasesPagination(prev => ({ ...prev, page }));
    fetchPressReleases(page, pressReleasesPagination.limit);
  };

  const handlePressReleasesItemsPerPageChange = (limit) => {
    setPressReleasesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchPressReleases(1, limit);
  };

  const handleStatementsPageChange = (page) => {
    setStatementsPagination(prev => ({ ...prev, page }));
    fetchStatements(page, statementsPagination.limit);
  };

  const handleStatementsItemsPerPageChange = (limit) => {
    setStatementsPagination(prev => ({ ...prev, page: 1, limit }));
    fetchStatements(1, limit);
  };

  const handleVideosPageChange = (page) => {
    setVideosPagination(prev => ({ ...prev, page }));
    fetchVideos(page, videosPagination.limit);
  };

  const handleVideosItemsPerPageChange = (limit) => {
    setVideosPagination(prev => ({ ...prev, page: 1, limit }));
    fetchVideos(1, limit);
  };

  const handleNewslettersPageChange = (page) => {
    setNewslettersPagination(prev => ({ ...prev, page }));
    fetchNewsletters(page, newslettersPagination.limit);
  };

  const handleNewslettersItemsPerPageChange = (limit) => {
    setNewslettersPagination(prev => ({ ...prev, page: 1, limit }));
    fetchNewsletters(1, limit);
  };

  const handleDirectoratesPageChange = (page) => {
    setDirectoratesPagination(prev => ({ ...prev, page }));
    fetchDirectorates(page, directoratesPagination.limit);
  };

  const handleDirectoratesItemsPerPageChange = (limit) => {
    setDirectoratesPagination(prev => ({ ...prev, page: 1, limit }));
    fetchDirectorates(1, limit);
  };

  const fetchPositions = async () => {
    try {
      const response = await positionAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to positions format
        const mappedPositions = response.returnData.list_of_item.map(position => ({
          id: position.id?.toString() || Date.now().toString(),
          name: position.name || '',
          description: position.description || '',
          createdAt: position.created_at || position.createdAt || new Date().toISOString(),
        }));
        setPositions(mappedPositions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching positions:', err);
    }
  };

  const fetchFaqCategories = async (page = faqCategoriesPagination.page, limit = faqCategoriesPagination.limit) => {
    try {
      const response = await faqCategoryAPI.getAll(page, limit);
      
      // Handle different response structures
      let categoriesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        categoriesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || categoriesList.length;
      } else if (response.returnData?.list_of_item) {
        // If status is not OK but list_of_item exists
        categoriesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || categoriesList.length;
      } else if (Array.isArray(response.returnData)) {
        // If returnData is directly an array
        categoriesList = response.returnData;
        total = categoriesList.length;
      } else if (Array.isArray(response)) {
        // If response is directly an array
        categoriesList = response;
        total = categoriesList.length;
      }
      
      if (categoriesList && categoriesList.length > 0) {
        // Map API response to FAQ categories format
        const mappedCategories = categoriesList.map((category, index) => ({
          id: category.id?.toString() || `category-${Date.now()}-${index}`,
          name: category.name || '',
          description: category.description || '',
          createdAt: category.created_at || category.createdAt || new Date().toISOString(),
        }));
        setFaqCategories(mappedCategories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setFaqCategoriesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setFaqCategories([]);
        setFaqCategoriesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching FAQ categories:', err);
      setFaqCategories([]);
      setFaqCategoriesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const fetchFaqs = async (page = faqsPagination.page, limit = faqsPagination.limit) => {
    try {
      const response = await faqAPI.getAll(page, limit);
      
      // Handle different response structures
      let faqsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        faqsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || faqsList.length;
      } else if (response.status === 'ERROR' && response.returnData?.list_of_item) {
        // Even if status is ERROR, try to get the list if it exists
        faqsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || faqsList.length;
      } else if (response.returnData?.list_of_item) {
        // If status is not OK but list_of_item exists
        faqsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || faqsList.length;
      } else if (Array.isArray(response.returnData)) {
        // If returnData is directly an array
        faqsList = response.returnData;
        total = faqsList.length;
      } else if (Array.isArray(response)) {
        // If response is directly an array
        faqsList = response;
        total = faqsList.length;
      }
      
      if (faqsList && faqsList.length > 0) {
        // Map API response to FAQs format
        const mappedFaqs = faqsList.map((faq, index) => ({
          id: faq.id?.toString() || `faq-${Date.now()}-${index}`,
          faq_category_id: faq.faq_category_id || null,
          question: faq.question || '',
          answer: faq.answer || '',
          createdAt: faq.created_at || faq.createdAt || new Date().toISOString(),
        }));
        setFaqs(mappedFaqs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setFaqsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setFaqs([]);
        setFaqsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setFaqs([]);
      setFaqsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await managementTeamAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to team members format
        const mappedMembers = response.returnData.list_of_item.map(member => ({
          id: member.id?.toString() || Date.now().toString(),
          name: member.name || '',
          position_id: member.position_id || member.position?.id || null,
          description: member.description || '',
          image: member.image || null,
          createdAt: member.created_at || member.createdAt || new Date().toISOString(),
        }));
        setTeamMembers(mappedMembers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

  const fetchCommissionMembers = async () => {
    try {
      const response = await commissionMembersAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to commission members format
        const mappedMembers = response.returnData.list_of_item.map(member => ({
          id: member.id?.toString() || Date.now().toString(),
          name: member.name || '',
          title: member.title || '',
          description: member.description || '',
          image: member.image || null,
          createdAt: member.created_at || member.createdAt || new Date().toISOString(),
        }));
        setCommissionMembers(mappedMembers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching commission members:', err);
    }
  };

  const fetchInnovationSpaces = async (page = innovationSpacesPagination.page, limit = innovationSpacesPagination.limit) => {
    try {
      const response = await innovationSpaceAPI.getAll(page, limit);
      
      // Handle different response structures
      let spacesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        spacesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || spacesList.length;
      } else if (response.returnData?.list_of_item) {
        spacesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || spacesList.length;
      } else if (Array.isArray(response.returnData)) {
        spacesList = response.returnData;
        total = spacesList.length;
      } else if (Array.isArray(response)) {
        spacesList = response;
        total = spacesList.length;
      }
      
      if (spacesList && spacesList.length > 0) {
        // Map API response to innovation spaces format
        const mappedSpaces = spacesList.map(space => ({
          id: space.id?.toString() || Date.now().toString(),
          name: space.name || '',
          category: space.category || '',
          sector: space.sector || '',
          location: space.location || '',
          latitude: space.latitude || '',
          longitude: space.longitude || '',
          description: space.description || '',
          beneficiary: space.beneficiary || '',
          year_established: space.year_established || '',
          target_audience: space.target_audience || '',
          support_needed: space.support_needed || '',
          collaboration: space.collaboration || '',
          main_challenges: space.main_challenges || '',
          interest_in_training: space.interest_in_training || '',
          area_of_capacity_building: space.area_of_capacity_building || '',
          interest_in_events: space.interest_in_events || '',
          events_focus: space.events_focus || '',
          open_to_partnership: space.open_to_partnership || '',
          partnership_type: space.partnership_type || '',
          contact_person_name: space.contact_person_name || '',
          contact_person_email: space.contact_person_email || '',
          contact_person_phone: space.contact_person_phone || '',
          image: space.image || null,
          createdAt: space.created_at || space.createdAt || new Date().toISOString(),
        }));
        setInnovationSpaces(mappedSpaces.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setInnovationSpacesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setInnovationSpaces([]);
        setInnovationSpacesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching innovation spaces:', err);
      setInnovationSpaces([]);
      setInnovationSpacesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleSectionClick = (e) => {
    e.preventDefault();
    setActiveNav('SECTION');
  };

  const handleNewsClick = (e) => {
    e.preventDefault();
    setActiveNav('news');
  };

  const handlePartnersClick = (e) => {
    e.preventDefault();
    setActiveNav('partners');
  };

  const handleHeroesClick = (e) => {
    e.preventDefault();
    setActiveNav('heroes');
  };

  const handlePositionsClick = (e) => {
    e.preventDefault();
    setActiveNav('positions');
  };

  const handleFaqCategoryClick = (e) => {
    e.preventDefault();
    setActiveNav('faq-category');
  };

  const handleFaqClick = (e) => {
    e.preventDefault();
    setActiveNav('faq');
  };

  const handleManagementTeamClick = (e) => {
    e.preventDefault();
    setActiveNav('management-team');
  };

  const handleCommissionMembersClick = (e) => {
    e.preventDefault();
    setActiveNav('commission-members');
  };

  const handleInnovationSpaceClick = (e) => {
    e.preventDefault();
    setActiveNav('innovation-space');
  };

  const handleOnlineServiceClick = (e) => {
    e.preventDefault();
    setActiveNav('online-service');
  };

  const handleFinancialReportClick = (e) => {
    e.preventDefault();
    setActiveNav('financial-report');
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    setShowAddSectionForm(false);
    setShowAddNewsForm(false);
    setShowAddPartnerForm(false);
    setShowAddHeroForm(false);
    setShowAddPositionForm(false);
    setShowAddTeamMemberForm(false);
    setShowAddCommissionMemberForm(false);
    setShowAddInnovationSpaceForm(false);
    setShowAddOnlineServiceForm(false);
    setShowAddFinancialReportForm(false);
    setShowAddMagazineForm(false);
    setShowAddBookForm(false);
    setShowAddReportForm(false);
    setShowAddActsAndLegalForm(false);
    setShowAddPolicyForm(false);
    setShowAddStrategicPlanForm(false);
    setShowAddGuidelineDocumentForm(false);
    setShowAddConferenceForm(false);
    setShowAddExhibitionForm(false);
    setShowAddOngoingProjectForm(false);
    setShowAddAreaOfPartnershipForm(false);
    setShowAddFellowshipGrantForm(false);
    setShowAddHerinInstitutionForm(false);
  };

  const handleBackToDashboard = () => {
    setActiveNav('dashboard');
    setShowAddSectionForm(false);
    setShowAddNewsForm(false);
    setShowAddPartnerForm(false);
    setShowAddHeroForm(false);
    setShowAddPositionForm(false);
    setShowAddTeamMemberForm(false);
    setShowAddCommissionMemberForm(false);
    setShowAddInnovationSpaceForm(false);
    setShowAddFinancialReportForm(false);
    setShowAddMagazineForm(false);
    setShowAddBookForm(false);
    setShowAddReportForm(false);
    setShowAddActsAndLegalForm(false);
    setShowAddPolicyForm(false);
    setShowAddStrategicPlanForm(false);
    setShowAddGuidelineDocumentForm(false);
    setShowAddConferenceForm(false);
    setShowAddExhibitionForm(false);
    setShowAddOngoingProjectForm(false);
    setShowAddAreaOfPartnershipForm(false);
    setShowAddFellowshipGrantForm(false);
    setShowAddHerinInstitutionForm(false);
    setShowAddDirectorateForm(false);
    setShowAddFaqCategoryForm(false);
    setEditingHerinInstitution(null);
    setEditingDirectorate(null);
  };

  const handleAddSectionClick = () => {
    setEditingSection(null);
    setShowAddSectionForm(true);
  };

  const handleAddNewsClick = () => {
    setEditingNews(null);
    setShowAddNewsForm(true);
  };

  const handleAddPartnerClick = () => {
    setEditingPartner(null);
    setShowAddPartnerForm(true);
  };

  const handleAddHeroClick = () => {
    setEditingHero(null);
    setShowAddHeroForm(true);
  };

  const handleAddPositionClick = () => {
    setEditingPosition(null);
    setShowAddPositionForm(true);
  };

  const handleAddFaqCategoryClick = () => {
    setEditingFaqCategory(null);
    setEditingFaq(null);
    setShowAddFaqCategoryForm(true);
  };

  const handleAddFaqClick = () => {
    setEditingFaq(null);
    setShowAddFaqForm(true);
  };

  const handleAddTeamMemberClick = () => {
    setEditingTeamMember(null);
    setShowAddTeamMemberForm(true);
  };

  const handleAddCommissionMemberClick = () => {
    setEditingCommissionMember(null);
    setShowAddCommissionMemberForm(true);
  };

  const handleAddInnovationSpaceClick = () => {
    setEditingInnovationSpace(null);
    setShowAddInnovationSpaceForm(true);
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setShowAddSectionForm(true);
  };

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setShowAddNewsForm(true);
  };

  const handleEditPartner = (partner) => {
    setEditingPartner(partner);
    setShowAddPartnerForm(true);
  };

  const handleEditHero = (hero) => {
    setEditingHero(hero);
    setShowAddHeroForm(true);
  };

  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setShowAddPositionForm(true);
  };

  const handleEditFaqCategory = (category) => {
    setEditingFaqCategory(category);
    setShowAddFaqCategoryForm(true);
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setShowAddFaqForm(true);
  };

  const handleEditTeamMember = (member) => {
    setEditingTeamMember(member);
    setShowAddTeamMemberForm(true);
  };

  const handleEditCommissionMember = (member) => {
    setEditingCommissionMember(member);
    setShowAddCommissionMemberForm(true);
  };

  const handleEditInnovationSpace = (space) => {
    setEditingInnovationSpace(space);
    setShowAddInnovationSpaceForm(true);
  };

  const handleCloseForm = () => {
    setShowAddSectionForm(false);
    setShowAddNewsForm(false);
    setShowAddPartnerForm(false);
    setShowAddHeroForm(false);
    setShowAddPositionForm(false);
    setShowAddTeamMemberForm(false);
    setShowAddCommissionMemberForm(false);
    setShowAddInnovationSpaceForm(false);
    setShowAddOnlineServiceForm(false);
    setShowAddFinancialReportForm(false);
    setShowAddMagazineForm(false);
    setShowAddBookForm(false);
    setShowAddReportForm(false);
    setShowAddActsAndLegalForm(false);
    setShowAddPolicyForm(false);
    setShowAddStrategicPlanForm(false);
    setShowAddGuidelineDocumentForm(false);
    setEditingSection(null);
    setEditingNews(null);
    setEditingPartner(null);
    setEditingHero(null);
    setEditingPosition(null);
    setEditingTeamMember(null);
    setEditingCommissionMember(null);
    setEditingInnovationSpace(null);
    setEditingOnlineService(null);
    setEditingFinancialReport(null);
    setEditingMagazine(null);
    setEditingBook(null);
    setEditingReport(null);
    setEditingActsAndLegal(null);
    setEditingPolicy(null);
    setEditingStrategicPlan(null);
    setEditingGuidelineDocument(null);
    setEditingConference(null);
    setEditingExhibition(null);
    setEditingOngoingProject(null);
    setEditingAreaOfPartnership(null);
    setEditingFellowshipGrant(null);
    setEditingHerinInstitution(null);
    setEditingDirectorate(null);
    setShowAddDirectorateForm(false);
  };

  const handleDeleteNews = async (id) => {
    const newsItem = news.find(n => n.id === id);
    const newsName = newsItem?.title || 'this news';
    showDeleteConfirmation(id, newsName, 'news', async () => {
    try {
      const response = await newsAPI.delete(id);
      if (response.status === 'OK') {
        await fetchNews(newsPagination.page, newsPagination.limit);
        alert('News deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete news');
      }
    } catch (err) {
      console.error('Error deleting news:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete news. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveNews = async (newsData, newsId = null) => {
    if (savingNews) return;
    
    setSavingNews(true);
    try {
      let response;
      
      if (newsId) {
        // Update existing news
        response = await newsAPI.update(newsId, newsData);
      } else {
        // Create new news
        response = await newsAPI.create(newsData);
      }
      
      if (response.status === 'OK') {
        // Refresh news list from API
        await fetchNews(newsPagination.page, newsPagination.limit);
        setShowAddNewsForm(false);
        setEditingNews(null);
        alert(newsId ? 'News updated successfully!' : 'News saved successfully!');
      } else {
        alert(response.errorMessage || (newsId ? 'Failed to update news' : 'Failed to save news'));
      }
    } catch (err) {
      console.error('Error saving news:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (newsId ? 'Failed to update news. Please try again.' : 'Failed to save news. Please try again.');
      alert(errorMessage);
    } finally {
      setSavingNews(false);
    }
  };

  const handleDeletePartner = async (id) => {
    const partner = partners.find(p => p.id === id);
    const partnerName = partner?.name || 'this partner';
    showDeleteConfirmation(id, partnerName, 'partner', async () => {
    try {
      const response = await partnersAPI.delete(id);
      if (response.status === 'OK') {
        await fetchPartners(partnersPagination.page, partnersPagination.limit);
        alert('Partner deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete partner');
      }
    } catch (err) {
      console.error('Error deleting partner:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete partner. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSavePartner = async (partnerData, partnerId = null) => {
    if (savingPartner) return;
    
    setSavingPartner(true);
    try {
      let response;
      
      if (partnerId) {
        // Update existing partner
        response = await partnersAPI.update(partnerId, partnerData);
      } else {
        // Create new partner
        response = await partnersAPI.create(partnerData);
      }
      
      if (response.status === 'OK') {
        // Refresh partners list from API
        await fetchPartners(partnersPagination.page, partnersPagination.limit);
        setShowAddPartnerForm(false);
        setEditingPartner(null);
        alert(partnerId ? 'Partner updated successfully!' : 'Partner saved successfully!');
      } else {
        alert(response.errorMessage || (partnerId ? 'Failed to update partner' : 'Failed to save partner'));
      }
    } catch (err) {
      console.error('Error saving partner:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (partnerId ? 'Failed to update partner. Please try again.' : 'Failed to save partner. Please try again.');
      alert(errorMessage);
    } finally {
      setSavingPartner(false);
    }
  };

  const handleDeleteHero = async (id) => {
    const hero = heroes.find(h => h.id === id);
    const heroName = hero?.name || hero?.title || 'this hero';
    showDeleteConfirmation(id, heroName, 'hero', async () => {
      try {
        const response = await heroesAPI.delete(id);
        if (response.status === 'OK') {
          await fetchHeroes(heroesPagination.page, heroesPagination.limit);
          alert('Hero deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete hero');
        }
      } catch (err) {
        console.error('Error deleting hero:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete hero. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveHero = async (heroData, heroId = null) => {
    if (savingHero) return;
    
    setSavingHero(true);
    try {
      let response;
      
      if (heroId) {
        // Update existing hero
        response = await heroesAPI.update(heroId, heroData);
      } else {
        // Create new hero
        response = await heroesAPI.create(heroData);
      }
      
      if (response.status === 'OK') {
        // Refresh heroes list from API
        await fetchHeroes(heroesPagination.page, heroesPagination.limit);
        setShowAddHeroForm(false);
        setEditingHero(null);
        alert(heroId ? 'Hero updated successfully!' : 'Hero saved successfully!');
      } else {
        // Handle array error messages
        const errorMsg = response.errorMessage || (heroId ? 'Failed to update hero' : 'Failed to save hero');
        if (Array.isArray(errorMsg)) {
          alert(errorMsg.join(', '));
        } else {
          alert(errorMsg);
        }
      }
    } catch (err) {
      console.error('Error saving hero:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (heroId ? 'Failed to update hero. Please try again.' : 'Failed to save hero. Please try again.');
      if (Array.isArray(errorMessage)) {
        alert(errorMessage.join(', '));
      } else {
      alert(errorMessage);
      }
    } finally {
      setSavingHero(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      // Clear access token from localStorage
      localStorage.removeItem('access_token');
      // Call parent's onLogout to update app state
      if (onLogout) {
        onLogout();
      }
    } catch (err) {
      console.error('Logout error:', err);
      // Even if API call fails, clear token and logout locally
      localStorage.removeItem('access_token');
      if (onLogout) {
        onLogout();
      }
    }
  };

  const handleSaveSection = async (sectionData, sectionId = null) => {
    try {
      let response;
      
      if (sectionId) {
        // Update existing section
        response = await sectionsAPI.update(sectionId, sectionData);
      } else {
        // Create new section
        response = await sectionsAPI.create(sectionData);
      }
      
      if (response.status === 'OK') {
        // Refresh sections list from API
        await fetchSections();
    setShowAddSectionForm(false);
        setEditingSection(null);
        alert(sectionId ? 'Section updated successfully!' : 'Section saved successfully!');
      } else {
        alert(response.errorMessage || (sectionId ? 'Failed to update section' : 'Failed to save section'));
      }
    } catch (err) {
      console.error('Error saving section:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (sectionId ? 'Failed to update section. Please try again.' : 'Failed to save section. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeletePosition = async (id) => {
    const position = positions.find(p => p.id === id);
    const positionName = position?.name || 'this position';
    showDeleteConfirmation(id, positionName, 'position', async () => {
    try {
      const response = await positionAPI.delete(id);
      if (response.status === 'OK') {
        await fetchPositions();
        alert('Position deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete position');
      }
    } catch (err) {
      console.error('Error deleting position:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete position. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSavePosition = async (positionData, positionId = null) => {
    try {
      let response;
      
      if (positionId) {
        // Update existing position
        response = await positionAPI.update(positionId, positionData);
      } else {
        // Create new position
        response = await positionAPI.create(positionData);
      }
      
      if (response.status === 'OK') {
        // Refresh positions list from API
        await fetchPositions();
        setShowAddPositionForm(false);
        setEditingPosition(null);
        alert(positionId ? 'Position updated successfully!' : 'Position saved successfully!');
      } else {
        alert(response.errorMessage || (positionId ? 'Failed to update position' : 'Failed to save position'));
      }
    } catch (err) {
      console.error('Error saving position:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (positionId ? 'Failed to update position. Please try again.' : 'Failed to save position. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeleteFaqCategory = async (id) => {
    const category = faqCategories.find(c => c.id === id);
    const categoryName = category?.name || 'this FAQ category';
    showDeleteConfirmation(id, categoryName, 'FAQ category', async () => {
    try {
      const response = await faqCategoryAPI.delete(id);
      if (response.status === 'OK') {
        await fetchFaqCategories();
        alert('FAQ Category deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete FAQ category');
      }
    } catch (err) {
      console.error('Error deleting FAQ category:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete FAQ category. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveFaqCategory = async (categoryData, categoryId = null) => {
    try {
      let response;
      
      if (categoryId) {
        // Update existing category
        response = await faqCategoryAPI.update(categoryId, categoryData);
      } else {
        // Create new category
        response = await faqCategoryAPI.create(categoryData);
      }
      
      if (response.status === 'OK') {
        // Refresh categories list from API
        await fetchFaqCategories();
        setShowAddFaqCategoryForm(false);
        setEditingFaqCategory(null);
    setEditingFaq(null);
        alert(categoryId ? 'FAQ Category updated successfully!' : 'FAQ Category saved successfully!');
      } else {
        alert(response.errorMessage || (categoryId ? 'Failed to update FAQ category' : 'Failed to save FAQ category'));
      }
    } catch (err) {
      console.error('Error saving FAQ category:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (categoryId ? 'Failed to update FAQ category. Please try again.' : 'Failed to save FAQ category. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeleteFaq = async (id) => {
    const faq = faqs.find(f => f.id === id);
    const faqQuestion = faq?.question || 'this FAQ';
    showDeleteConfirmation(id, faqQuestion, 'FAQ', async () => {
    try {
      const response = await faqAPI.delete(id);
      if (response.status === 'OK') {
        await fetchFaqs();
        alert('FAQ deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete FAQ');
      }
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete FAQ. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveFaq = async (faqData, faqId = null) => {
    try {
      let response;
      
      if (faqId) {
        // Update existing FAQ
        response = await faqAPI.update(faqId, faqData);
      } else {
        // Create new FAQ
        response = await faqAPI.create(faqData);
      }
      
      if (response.status === 'OK') {
        // Refresh FAQs list from API
        await fetchFaqs();
        setShowAddFaqForm(false);
        setEditingFaq(null);
        alert(faqId ? 'FAQ updated successfully!' : 'FAQ saved successfully!');
      } else {
        alert(response.errorMessage || (faqId ? 'Failed to update FAQ' : 'Failed to save FAQ'));
      }
    } catch (err) {
      console.error('Error saving FAQ:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (faqId ? 'Failed to update FAQ. Please try again.' : 'Failed to save FAQ. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    const member = teamMembers.find(m => m.id === id);
    const memberName = member?.name || 'this team member';
    showDeleteConfirmation(id, memberName, 'team member', async () => {
    try {
      const response = await managementTeamAPI.delete(id);
      if (response.status === 'OK') {
        await fetchTeamMembers();
        alert('Team member deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete team member');
      }
    } catch (err) {
      console.error('Error deleting team member:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete team member. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveTeamMember = async (memberData, memberId = null) => {
    try {
      let response;
      
      if (memberId) {
        // Update existing team member
        response = await managementTeamAPI.update(memberId, memberData);
      } else {
        // Create new team member
        response = await managementTeamAPI.create(memberData);
      }
      
      if (response.status === 'OK') {
        // Refresh team members list from API
        await fetchTeamMembers();
        setShowAddTeamMemberForm(false);
        setEditingTeamMember(null);
        alert(memberId ? 'Team member updated successfully!' : 'Team member saved successfully!');
      } else {
        alert(response.errorMessage || (memberId ? 'Failed to update team member' : 'Failed to save team member'));
      }
    } catch (err) {
      console.error('Error saving team member:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (memberId ? 'Failed to update team member. Please try again.' : 'Failed to save team member. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeleteCommissionMember = async (id) => {
    const member = commissionMembers.find(m => m.id === id);
    const memberName = member?.name || 'this commission member';
    showDeleteConfirmation(id, memberName, 'commission member', async () => {
    try {
      const response = await commissionMembersAPI.delete(id);
      if (response.status === 'OK') {
        await fetchCommissionMembers();
        alert('Commission member deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete commission member');
      }
    } catch (err) {
      console.error('Error deleting commission member:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete commission member. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveCommissionMember = async (memberData, memberId = null) => {
    try {
      let response;
      
      if (memberId) {
        // Update existing commission member
        response = await commissionMembersAPI.update(memberId, memberData);
      } else {
        // Create new commission member
        response = await commissionMembersAPI.create(memberData);
      }
      
      if (response.status === 'OK') {
        // Refresh commission members list from API
        await fetchCommissionMembers();
        setShowAddCommissionMemberForm(false);
        setEditingCommissionMember(null);
        alert(memberId ? 'Commission member updated successfully!' : 'Commission member saved successfully!');
      } else {
        alert(response.errorMessage || (memberId ? 'Failed to update commission member' : 'Failed to save commission member'));
      }
    } catch (err) {
      console.error('Error saving commission member:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (memberId ? 'Failed to update commission member. Please try again.' : 'Failed to save commission member. Please try again.');
      alert(errorMessage);
    }
  };

  const handleDeleteInnovationSpace = async (id) => {
    const space = innovationSpaces.find(s => s.id === id);
    const spaceName = space?.name || 'this innovation space';
    showDeleteConfirmation(id, spaceName, 'innovation space', async () => {
    try {
      const response = await innovationSpaceAPI.delete(id);
      if (response.status === 'OK') {
        await fetchInnovationSpaces();
        alert('Innovation space deleted successfully!');
      } else {
        alert(response.errorMessage || 'Failed to delete innovation space');
      }
    } catch (err) {
      console.error('Error deleting innovation space:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete innovation space. Please try again.';
      alert(errorMessage);
    }
    });
  };

  const handleSaveInnovationSpace = async (spaceData, spaceId = null) => {
    try {
      let response;
      
      if (spaceId) {
        // Update existing innovation space
        response = await innovationSpaceAPI.update(spaceId, spaceData);
      } else {
        // Create new innovation space
        response = await innovationSpaceAPI.create(spaceData);
      }
      
      if (response.status === 'OK') {
        // Refresh innovation spaces list from API
        await fetchInnovationSpaces();
        setShowAddInnovationSpaceForm(false);
        setEditingInnovationSpace(null);
        alert(spaceId ? 'Innovation space updated successfully!' : 'Innovation space saved successfully!');
      } else {
        alert(response.errorMessage || (spaceId ? 'Failed to update innovation space' : 'Failed to save innovation space'));
      }
    } catch (err) {
      console.error('Error saving innovation space:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (spaceId ? 'Failed to update innovation space. Please try again.' : 'Failed to save innovation space. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchOnlineServices = async (page = onlineServicesPagination.page, limit = onlineServicesPagination.limit) => {
    try {
      const response = await onlineServiceAPI.getAll(page, limit);
      
      // Handle different response structures
      let servicesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        servicesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || servicesList.length;
      } else if (response.returnData?.list_of_item) {
        servicesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || servicesList.length;
      } else if (Array.isArray(response.returnData)) {
        servicesList = response.returnData;
        total = servicesList.length;
      } else if (Array.isArray(response)) {
        servicesList = response;
        total = servicesList.length;
      }
      
      if (servicesList && servicesList.length > 0) {
        // Map API response to online services format
        const mappedServices = servicesList.map(service => ({
          id: service.id?.toString() || Date.now().toString(),
          name: service.name || '',
          link: service.link || '',
          createdAt: service.created_at || service.createdAt || new Date().toISOString(),
        }));
        setOnlineServices(mappedServices);
        setOnlineServicesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setOnlineServices([]);
        setOnlineServicesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching online services:', err);
      setOnlineServices([]);
      setOnlineServicesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleAddOnlineServiceClick = () => {
    setEditingOnlineService(null);
    setShowAddOnlineServiceForm(true);
  };

  const handleEditOnlineService = (service) => {
    setEditingOnlineService(service);
    setShowAddOnlineServiceForm(true);
  };

  const handleDeleteOnlineService = async (id) => {
    const service = onlineServices.find(s => s.id === id);
    const serviceName = service?.name || 'this online service';
    showDeleteConfirmation(id, serviceName, 'online service', async () => {
      try {
        const response = await onlineServiceAPI.delete(id);
        if (response.status === 'OK') {
          await fetchOnlineServices(onlineServicesPagination.page, onlineServicesPagination.limit);
          alert('Online service deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete online service');
        }
      } catch (err) {
        console.error('Error deleting online service:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete online service. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveOnlineService = async (serviceData, serviceId) => {
    try {
      const response = serviceId 
        ? await onlineServiceAPI.update(serviceId, serviceData)
        : await onlineServiceAPI.create(serviceData);

      if (response.status === 'OK') {
        // Refresh online services list from API
        await fetchOnlineServices(onlineServicesPagination.page, onlineServicesPagination.limit);
        setShowAddOnlineServiceForm(false);
        setEditingOnlineService(null);
        alert(serviceId ? 'Online service updated successfully!' : 'Online service saved successfully!');
      } else {
        alert(response.errorMessage || (serviceId ? 'Failed to update online service' : 'Failed to save online service'));
      }
    } catch (err) {
      console.error('Error saving online service:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (serviceId ? 'Failed to update online service. Please try again.' : 'Failed to save online service. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchFinancialReports = async (page = financialReportsPagination.page, limit = financialReportsPagination.limit) => {
    try {
      const response = await financialReportAPI.getAll(page, limit);
      
      // Handle different response structures
      let reportsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        reportsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || reportsList.length;
      } else if (response.returnData?.list_of_item) {
        reportsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || reportsList.length;
      } else if (Array.isArray(response.returnData)) {
        reportsList = response.returnData;
        total = reportsList.length;
      } else if (Array.isArray(response)) {
        reportsList = response;
        total = reportsList.length;
      }
      
      if (reportsList && reportsList.length > 0) {
        // Map API response to financial reports format
        const mappedReports = reportsList.map(report => ({
          id: report.id?.toString() || Date.now().toString(),
          title: report.title || '',
          description: report.description || '',
          document: report.document || null,
          createdAt: report.created_at || report.createdAt || new Date().toISOString(),
        }));
        setFinancialReports(mappedReports);
        setFinancialReportsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setFinancialReports([]);
        setFinancialReportsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching financial reports:', err);
      setFinancialReports([]);
      setFinancialReportsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleAddFinancialReportClick = () => {
    setEditingFinancialReport(null);
    setShowAddFinancialReportForm(true);
  };

  const handleEditFinancialReport = (report) => {
    setEditingFinancialReport(report);
    setShowAddFinancialReportForm(true);
  };

  const handleDeleteFinancialReport = async (id) => {
    const report = financialReports.find(r => r.id === id);
    const reportName = report?.title || 'this financial report';
    showDeleteConfirmation(id, reportName, 'financial report', async () => {
      try {
        const response = await financialReportAPI.delete(id);
        if (response.status === 'OK') {
          await fetchFinancialReports();
          alert('Financial report deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete financial report');
        }
      } catch (err) {
        console.error('Error deleting financial report:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete financial report. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveFinancialReport = async (reportData, reportId) => {
    try {
      const response = reportId 
        ? await financialReportAPI.update(reportId, reportData)
        : await financialReportAPI.create(reportData);

      if (response.status === 'OK') {
        await fetchFinancialReports();
        setShowAddFinancialReportForm(false);
        setEditingFinancialReport(null);
        alert(reportId ? 'Financial report updated successfully!' : 'Financial report saved successfully!');
      } else {
        alert(response.errorMessage || (reportId ? 'Failed to update financial report' : 'Failed to save financial report'));
      }
    } catch (err) {
      console.error('Error saving financial report:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (reportId ? 'Failed to update financial report. Please try again.' : 'Failed to save financial report. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchMagazines = async (page = magazinesPagination.page, limit = magazinesPagination.limit) => {
    try {
      const response = await magazineAPI.getAll(page, limit);
      
      // Handle different response structures
      let magazinesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        magazinesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || magazinesList.length;
      } else if (response.returnData?.list_of_item) {
        magazinesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || magazinesList.length;
      } else if (Array.isArray(response.returnData)) {
        magazinesList = response.returnData;
        total = magazinesList.length;
      } else if (Array.isArray(response)) {
        magazinesList = response;
        total = magazinesList.length;
      }
      
      if (magazinesList && magazinesList.length > 0) {
        // Map API response to magazines format
        const mappedMagazines = magazinesList.map(magazine => ({
          id: magazine.id?.toString() || Date.now().toString(),
          title: magazine.title || '',
          date: magazine.date || '',
          document: magazine.document || null,
          createdAt: magazine.created_at || magazine.createdAt || new Date().toISOString(),
        }));
        setMagazines(mappedMagazines);
        setMagazinesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setMagazines([]);
        setMagazinesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching magazines:', err);
      setMagazines([]);
      setMagazinesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleMagazineClick = (e) => {
    e.preventDefault();
    setActiveNav('magazine');
  };

  const handleAddMagazineClick = () => {
    setEditingMagazine(null);
    setShowAddMagazineForm(true);
  };

  const handleEditMagazine = (magazine) => {
    setEditingMagazine(magazine);
    setShowAddMagazineForm(true);
  };

  const handleDeleteMagazine = async (id) => {
    const magazine = magazines.find(m => m.id === id);
    const magazineName = magazine?.title || 'this magazine';
    showDeleteConfirmation(id, magazineName, 'magazine', async () => {
      try {
        const response = await magazineAPI.delete(id);
        if (response.status === 'OK') {
          await fetchMagazines();
          alert('Magazine deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete magazine');
        }
      } catch (err) {
        console.error('Error deleting magazine:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete magazine. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveMagazine = async (magazineData, magazineId) => {
    try {
      const response = magazineId 
        ? await magazineAPI.update(magazineId, magazineData)
        : await magazineAPI.create(magazineData);

      if (response.status === 'OK') {
        await fetchMagazines();
        setShowAddMagazineForm(false);
        setEditingMagazine(null);
        alert(magazineId ? 'Magazine updated successfully!' : 'Magazine saved successfully!');
      } else {
        alert(response.errorMessage || (magazineId ? 'Failed to update magazine' : 'Failed to save magazine'));
      }
    } catch (err) {
      console.error('Error saving magazine:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (magazineId ? 'Failed to update magazine. Please try again.' : 'Failed to save magazine. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchNewsletters = async (page = newslettersPagination.page, limit = newslettersPagination.limit) => {
    try {
      const response = await newsletterAPI.getAll(page, limit);
      
      // Handle different response structures
      let newslettersList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        newslettersList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || newslettersList.length;
      } else if (response.returnData?.list_of_item) {
        newslettersList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || newslettersList.length;
      } else if (Array.isArray(response.returnData)) {
        newslettersList = response.returnData;
        total = newslettersList.length;
      } else if (Array.isArray(response)) {
        newslettersList = response;
        total = newslettersList.length;
      }
      
      if (newslettersList && newslettersList.length > 0) {
        // Map API response to newsletters format
        const mappedNewsletters = newslettersList.map(newsletter => ({
          id: newsletter.id?.toString() || Date.now().toString(),
          title: newsletter.title || '',
          date: newsletter.date || '',
          document: newsletter.document || null,
          createdAt: newsletter.created_at || newsletter.createdAt || new Date().toISOString(),
        }));
        setNewsletters(mappedNewsletters);
        setNewslettersPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setNewsletters([]);
        setNewslettersPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching newsletters:', err);
      setNewsletters([]);
      setNewslettersPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleNewsletterClick = (e) => {
    e.preventDefault();
    setActiveNav('newsletter');
  };

  const handleAddNewsletterClick = () => {
    setEditingNewsletter(null);
    setShowAddNewsletterForm(true);
  };

  const handleEditNewsletter = (newsletter) => {
    setEditingNewsletter(newsletter);
    setShowAddNewsletterForm(true);
  };

  const handleDeleteNewsletter = async (id) => {
    const newsletter = newsletters.find(n => n.id === id);
    const newsletterName = newsletter?.title || 'this newsletter';
    showDeleteConfirmation(id, newsletterName, 'newsletter', async () => {
      try {
        const response = await newsletterAPI.delete(id);
        if (response.status === 'OK') {
          await fetchNewsletters();
          alert('Newsletter deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete newsletter');
        }
      } catch (err) {
        console.error('Error deleting newsletter:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete newsletter. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveNewsletter = async (newsletterData, newsletterId) => {
    try {
      const response = newsletterId 
        ? await newsletterAPI.update(newsletterId, newsletterData)
        : await newsletterAPI.create(newsletterData);

      if (response.status === 'OK') {
        await fetchNewsletters();
        setShowAddNewsletterForm(false);
        setEditingNewsletter(null);
        alert(newsletterId ? 'Newsletter updated successfully!' : 'Newsletter saved successfully!');
      } else {
        // Handle array or string error messages
        const errorMsg = Array.isArray(response.errorMessage) 
          ? response.errorMessage.join(', ') 
          : response.errorMessage || (newsletterId ? 'Failed to update newsletter' : 'Failed to save newsletter');
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Error saving newsletter:', err);
      // Handle array or string error messages from backend
      const backendError = err.response?.data?.errorMessage;
      const errorMessage = Array.isArray(backendError)
        ? backendError.join(', ')
        : backendError || err.message || (newsletterId ? 'Failed to update newsletter. Please try again.' : 'Failed to save newsletter. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchBooks = async (page = booksPagination.page, limit = booksPagination.limit) => {
    try {
      const response = await booksAPI.getAll(page, limit);
      
      // Handle different response structures
      let booksList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        booksList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || booksList.length;
      } else if (response.returnData?.list_of_item) {
        booksList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || booksList.length;
      } else if (Array.isArray(response.returnData)) {
        booksList = response.returnData;
        total = booksList.length;
      } else if (Array.isArray(response)) {
        booksList = response;
        total = booksList.length;
      }
      
      if (booksList && booksList.length > 0) {
        // Map API response to books format
        const mappedBooks = booksList.map(book => ({
          id: book.id?.toString() || Date.now().toString(),
          title: book.title || '',
          date: book.date || '',
          document: book.document || null,
          createdAt: book.created_at || book.createdAt || new Date().toISOString(),
        }));
        setBooks(mappedBooks);
        setBooksPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setBooks([]);
        setBooksPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
      setBooksPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    setActiveNav('books');
  };

  const handleAddBookClick = () => {
    setEditingBook(null);
    setShowAddBookForm(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowAddBookForm(true);
  };

  const handleDeleteBook = async (id) => {
    const book = books.find(b => b.id === id);
    const bookName = book?.title || 'this book';
    showDeleteConfirmation(id, bookName, 'book', async () => {
      try {
        const response = await booksAPI.delete(id);
        if (response.status === 'OK') {
          await fetchBooks();
          alert('Book deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete book');
        }
      } catch (err) {
        console.error('Error deleting book:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete book. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveBook = async (bookData, bookId) => {
    try {
      const response = bookId 
        ? await booksAPI.update(bookId, bookData)
        : await booksAPI.create(bookData);

      if (response.status === 'OK') {
        await fetchBooks();
        setShowAddBookForm(false);
        setEditingBook(null);
        alert(bookId ? 'Book updated successfully!' : 'Book saved successfully!');
      } else {
        alert(response.errorMessage || (bookId ? 'Failed to update book' : 'Failed to save book'));
      }
    } catch (err) {
      console.error('Error saving book:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (bookId ? 'Failed to update book. Please try again.' : 'Failed to save book. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchReports = async (page = reportsPagination.page, limit = reportsPagination.limit) => {
    try {
      const response = await reportsAPI.getAll(page, limit);
      
      // Handle different response structures
      let reportsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        reportsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || reportsList.length;
      } else if (response.returnData?.list_of_item) {
        reportsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || reportsList.length;
      } else if (Array.isArray(response.returnData)) {
        reportsList = response.returnData;
        total = reportsList.length;
      } else if (Array.isArray(response)) {
        reportsList = response;
        total = reportsList.length;
      }
      
      if (reportsList && reportsList.length > 0) {
        // Map API response to reports format
        const mappedReports = reportsList.map(report => ({
          id: report.id?.toString() || Date.now().toString(),
          title: report.title || '',
          date: report.date || '',
          document: report.document || null,
          createdAt: report.created_at || report.createdAt || new Date().toISOString(),
        }));
        setReports(mappedReports);
        setReportsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setReports([]);
        setReportsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setReports([]);
      setReportsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleReportClick = (e) => {
    e.preventDefault();
    setActiveNav('reports');
  };

  const handleAddReportClick = () => {
    setEditingReport(null);
    setShowAddReportForm(true);
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setShowAddReportForm(true);
  };

  const handleDeleteReport = async (id) => {
    const report = reports.find(r => r.id === id);
    const reportName = report?.title || 'this report';
    showDeleteConfirmation(id, reportName, 'report', async () => {
      try {
        const response = await reportsAPI.delete(id);
        if (response.status === 'OK') {
          await fetchReports();
          alert('Report deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete report');
        }
      } catch (err) {
        console.error('Error deleting report:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete report. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveReport = async (reportData, reportId) => {
    try {
      const response = reportId 
        ? await reportsAPI.update(reportId, reportData)
        : await reportsAPI.create(reportData);

      if (response.status === 'OK') {
        await fetchReports();
        setShowAddReportForm(false);
        setEditingReport(null);
        alert(reportId ? 'Report updated successfully!' : 'Report saved successfully!');
      } else {
        alert(response.errorMessage || (reportId ? 'Failed to update report' : 'Failed to save report'));
      }
    } catch (err) {
      console.error('Error saving report:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (reportId ? 'Failed to update report. Please try again.' : 'Failed to save report. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchActsAndLegal = async (page = actsAndLegalPagination.page, limit = actsAndLegalPagination.limit) => {
    try {
      const response = await actsAndLegalAPI.getAll(page, limit);
      
      // Handle different response structures
      let actsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        actsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || actsList.length;
      } else if (response.returnData?.list_of_item) {
        actsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || actsList.length;
      } else if (Array.isArray(response.returnData)) {
        actsList = response.returnData;
        total = actsList.length;
      } else if (Array.isArray(response)) {
        actsList = response;
        total = actsList.length;
      }
      
      if (actsList && actsList.length > 0) {
        // Map API response to acts and legal format
        const mappedActs = actsList.map(act => ({
          id: act.id?.toString() || Date.now().toString(),
          title: act.title || '',
          date: act.date || '',
          document: act.document || null,
          createdAt: act.created_at || act.createdAt || new Date().toISOString(),
        }));
        setActsAndLegal(mappedActs);
        setActsAndLegalPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setActsAndLegal([]);
        setActsAndLegalPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching acts and legal:', err);
      setActsAndLegal([]);
      setActsAndLegalPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleActsAndLegalClick = (e) => {
    e.preventDefault();
    setActiveNav('acts-and-legal');
  };

  const handleAddActsAndLegalClick = () => {
    setEditingActsAndLegal(null);
    setShowAddActsAndLegalForm(true);
  };

  const handleEditActsAndLegal = (act) => {
    setEditingActsAndLegal(act);
    setShowAddActsAndLegalForm(true);
  };

  const handleDeleteActsAndLegal = async (id) => {
    const act = actsAndLegal.find(a => a.id === id);
    const actName = act?.title || 'this act and legal';
    showDeleteConfirmation(id, actName, 'act and legal', async () => {
      try {
        const response = await actsAndLegalAPI.delete(id);
        if (response.status === 'OK') {
          await fetchActsAndLegal();
          alert('Act and Legal deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete act and legal');
        }
      } catch (err) {
        console.error('Error deleting act and legal:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete act and legal. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveActsAndLegal = async (actData, actId) => {
    try {
      const response = actId 
        ? await actsAndLegalAPI.update(actId, actData)
        : await actsAndLegalAPI.create(actData);

      if (response.status === 'OK') {
        await fetchActsAndLegal();
        setShowAddActsAndLegalForm(false);
        setEditingActsAndLegal(null);
        alert(actId ? 'Act and Legal updated successfully!' : 'Act and Legal saved successfully!');
      } else {
        alert(response.errorMessage || (actId ? 'Failed to update act and legal' : 'Failed to save act and legal'));
      }
    } catch (err) {
      console.error('Error saving act and legal:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (actId ? 'Failed to update act and legal. Please try again.' : 'Failed to save act and legal. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchPolicies = async (page = policiesPagination.page, limit = policiesPagination.limit) => {
    try {
      const response = await policiesAPI.getAll(page, limit);
      
      // Handle different response structures
      let policiesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        policiesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || policiesList.length;
      } else if (response.returnData?.list_of_item) {
        policiesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || policiesList.length;
      } else if (Array.isArray(response.returnData)) {
        policiesList = response.returnData;
        total = policiesList.length;
      } else if (Array.isArray(response)) {
        policiesList = response;
        total = policiesList.length;
      }
      
      if (policiesList && policiesList.length > 0) {
        // Map API response to policies format
        const mappedPolicies = policiesList.map(policy => ({
          id: policy.id?.toString() || Date.now().toString(),
          title: policy.title || '',
          date: policy.date || '',
          document: policy.document || null,
          createdAt: policy.created_at || policy.createdAt || new Date().toISOString(),
        }));
        setPolicies(mappedPolicies);
        setPoliciesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setPolicies([]);
        setPoliciesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching policies:', err);
      setPolicies([]);
      setPoliciesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handlePolicyClick = (e) => {
    e.preventDefault();
    setActiveNav('policies');
  };

  const handleAddPolicyClick = () => {
    setEditingPolicy(null);
    setShowAddPolicyForm(true);
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setShowAddPolicyForm(true);
  };

  const handleDeletePolicy = async (id) => {
    const policy = policies.find(p => p.id === id);
    const policyName = policy?.title || 'this policy';
    showDeleteConfirmation(id, policyName, 'policy', async () => {
      try {
        const response = await policiesAPI.delete(id);
        if (response.status === 'OK') {
          await fetchPolicies();
          alert('Policy deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete policy');
        }
      } catch (err) {
        console.error('Error deleting policy:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete policy. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSavePolicy = async (policyData, policyId) => {
    try {
      const response = policyId 
        ? await policiesAPI.update(policyId, policyData)
        : await policiesAPI.create(policyData);

      if (response.status === 'OK') {
        await fetchPolicies();
        setShowAddPolicyForm(false);
        setEditingPolicy(null);
        alert(policyId ? 'Policy updated successfully!' : 'Policy saved successfully!');
      } else {
        alert(response.errorMessage || (policyId ? 'Failed to update policy' : 'Failed to save policy'));
      }
    } catch (err) {
      console.error('Error saving policy:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (policyId ? 'Failed to update policy. Please try again.' : 'Failed to save policy. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchStrategicPlans = async (page = strategicPlansPagination.page, limit = strategicPlansPagination.limit) => {
    try {
      const response = await strategicPlanAPI.getAll(page, limit);
      
      // Handle different response structures
      let plansList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        plansList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || plansList.length;
      } else if (response.returnData?.list_of_item) {
        plansList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || plansList.length;
      } else if (Array.isArray(response.returnData)) {
        plansList = response.returnData;
        total = plansList.length;
      } else if (Array.isArray(response)) {
        plansList = response;
        total = plansList.length;
      }
      
      if (plansList && plansList.length > 0) {
        // Map API response to strategic plans format
        const mappedPlans = plansList.map(plan => ({
          id: plan.id?.toString() || Date.now().toString(),
          title: plan.title || '',
          date: plan.date || '',
          document: plan.document || null,
          createdAt: plan.created_at || plan.createdAt || new Date().toISOString(),
        }));
        setStrategicPlans(mappedPlans);
        setStrategicPlansPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setStrategicPlans([]);
        setStrategicPlansPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching strategic plans:', err);
      setStrategicPlans([]);
      setStrategicPlansPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleStrategicPlanClick = (e) => {
    e.preventDefault();
    setActiveNav('strategic-plan');
  };

  const handleAddStrategicPlanClick = () => {
    setEditingStrategicPlan(null);
    setShowAddStrategicPlanForm(true);
  };

  const handleEditStrategicPlan = (plan) => {
    setEditingStrategicPlan(plan);
    setShowAddStrategicPlanForm(true);
  };

  const handleDeleteStrategicPlan = async (id) => {
    const plan = strategicPlans.find(p => p.id === id);
    const planName = plan?.title || 'this strategic plan';
    showDeleteConfirmation(id, planName, 'strategic plan', async () => {
      try {
        const response = await strategicPlanAPI.delete(id);
        if (response.status === 'OK') {
          await fetchStrategicPlans();
          alert('Strategic Plan deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete strategic plan');
        }
      } catch (err) {
        console.error('Error deleting strategic plan:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete strategic plan. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveStrategicPlan = async (planData, planId) => {
    try {
      const response = planId 
        ? await strategicPlanAPI.update(planId, planData)
        : await strategicPlanAPI.create(planData);

      if (response.status === 'OK') {
        await fetchStrategicPlans();
        setShowAddStrategicPlanForm(false);
        setEditingStrategicPlan(null);
        alert(planId ? 'Strategic Plan updated successfully!' : 'Strategic Plan saved successfully!');
      } else {
        alert(response.errorMessage || (planId ? 'Failed to update strategic plan' : 'Failed to save strategic plan'));
      }
    } catch (err) {
      console.error('Error saving strategic plan:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (planId ? 'Failed to update strategic plan. Please try again.' : 'Failed to save strategic plan. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchGuidelineDocuments = async (page = guidelineDocumentsPagination.page, limit = guidelineDocumentsPagination.limit) => {
    try {
      const response = await guidelineDocumentsAPI.getAll(page, limit);
      
      // Handle different response structures
      let documentsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        documentsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || documentsList.length;
      } else if (response.returnData?.list_of_item) {
        documentsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || documentsList.length;
      } else if (Array.isArray(response.returnData)) {
        documentsList = response.returnData;
        total = documentsList.length;
      } else if (Array.isArray(response)) {
        documentsList = response;
        total = documentsList.length;
      }
      
      if (documentsList && documentsList.length > 0) {
        // Map API response to guideline documents format
        const mappedDocuments = documentsList.map(doc => ({
          id: doc.id?.toString() || Date.now().toString(),
          title: doc.title || '',
          date: doc.date || '',
          document: doc.document || null,
          createdAt: doc.created_at || doc.createdAt || new Date().toISOString(),
        }));
        setGuidelineDocuments(mappedDocuments);
        setGuidelineDocumentsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setGuidelineDocuments([]);
        setGuidelineDocumentsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching guideline documents:', err);
      setGuidelineDocuments([]);
      setGuidelineDocumentsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleGuidelineDocumentClick = (e) => {
    e.preventDefault();
    setActiveNav('guideline-documents');
  };

  const handleAddGuidelineDocumentClick = () => {
    setEditingGuidelineDocument(null);
    setShowAddGuidelineDocumentForm(true);
  };

  const handleEditGuidelineDocument = (document) => {
    setEditingGuidelineDocument(document);
    setShowAddGuidelineDocumentForm(true);
  };

  const handleDeleteGuidelineDocument = async (id) => {
    const document = guidelineDocuments.find(d => d.id === id);
    const documentName = document?.title || 'this guideline document';
    showDeleteConfirmation(id, documentName, 'guideline document', async () => {
      try {
        const response = await guidelineDocumentsAPI.delete(id);
        if (response.status === 'OK') {
          await fetchGuidelineDocuments();
          alert('Guideline Document deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete guideline document');
        }
      } catch (err) {
        console.error('Error deleting guideline document:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete guideline document. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveGuidelineDocument = async (documentData, documentId) => {
    try {
      const response = documentId 
        ? await guidelineDocumentsAPI.update(documentId, documentData)
        : await guidelineDocumentsAPI.create(documentData);

      if (response.status === 'OK') {
        await fetchGuidelineDocuments();
        setShowAddGuidelineDocumentForm(false);
        setEditingGuidelineDocument(null);
        alert(documentId ? 'Guideline Document updated successfully!' : 'Guideline Document saved successfully!');
      } else {
        alert(response.errorMessage || (documentId ? 'Failed to update guideline document' : 'Failed to save guideline document'));
      }
    } catch (err) {
      console.error('Error saving guideline document:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (documentId ? 'Failed to update guideline document. Please try again.' : 'Failed to save guideline document. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchConferences = async () => {
    try {
      const response = await conferenceAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to conferences format
        const mappedConferences = response.returnData.list_of_item.map(conf => ({
          id: conf.id?.toString() || Date.now().toString(),
          title: conf.title || '',
          description: conf.description || '',
          image: conf.image || null,
          createdAt: conf.created_at || conf.createdAt || new Date().toISOString(),
        }));
        setConferences(mappedConferences);
      }
    } catch (err) {
      console.error('Error fetching conferences:', err);
    }
  };

  const handleConferenceClick = (e) => {
    e.preventDefault();
    setActiveNav('conference');
  };

  const handleAddConferenceClick = () => {
    setEditingConference(null);
    setShowAddConferenceForm(true);
  };

  const handleEditConference = (conference) => {
    setEditingConference(conference);
    setShowAddConferenceForm(true);
  };

  const handleDeleteConference = async (id) => {
    const conference = conferences.find(c => c.id === id);
    const conferenceName = conference?.title || 'this conference';
    showDeleteConfirmation(id, conferenceName, 'conference', async () => {
      try {
        const response = await conferenceAPI.delete(id);
        if (response.status === 'OK') {
          await fetchConferences();
          alert('Conference deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete conference');
        }
      } catch (err) {
        console.error('Error deleting conference:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete conference. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveConference = async (conferenceData, conferenceId) => {
    try {
      const response = conferenceId 
        ? await conferenceAPI.update(conferenceId, conferenceData)
        : await conferenceAPI.create(conferenceData);

      if (response.status === 'OK') {
        await fetchConferences();
        setShowAddConferenceForm(false);
        setEditingConference(null);
        alert(conferenceId ? 'Conference updated successfully!' : 'Conference saved successfully!');
      } else {
        alert(response.errorMessage || (conferenceId ? 'Failed to update conference' : 'Failed to save conference'));
      }
    } catch (err) {
      console.error('Error saving conference:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (conferenceId ? 'Failed to update conference. Please try again.' : 'Failed to save conference. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchExhibitions = async () => {
    try {
      const response = await exhibitionAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to exhibitions format
        const mappedExhibitions = response.returnData.list_of_item.map(exh => ({
          id: exh.id?.toString() || Date.now().toString(),
          title: exh.title || '',
          date: exh.date || '',
          image: exh.image || null,
          createdAt: exh.created_at || exh.createdAt || new Date().toISOString(),
        }));
        setExhibitions(mappedExhibitions);
      }
    } catch (err) {
      console.error('Error fetching exhibitions:', err);
    }
  };

  const handleExhibitionClick = (e) => {
    e.preventDefault();
    setActiveNav('exhibition');
  };

  const handleAddExhibitionClick = () => {
    setEditingExhibition(null);
    setShowAddExhibitionForm(true);
  };

  const handleEditExhibition = (exhibition) => {
    setEditingExhibition(exhibition);
    setShowAddExhibitionForm(true);
  };

  const handleDeleteExhibition = async (id) => {
    const exhibition = exhibitions.find(e => e.id === id);
    const exhibitionName = exhibition?.title || 'this exhibition';
    showDeleteConfirmation(id, exhibitionName, 'exhibition', async () => {
      try {
        const response = await exhibitionAPI.delete(id);
        if (response.status === 'OK') {
          await fetchExhibitions();
          alert('Exhibition deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete exhibition');
        }
      } catch (err) {
        console.error('Error deleting exhibition:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete exhibition. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveExhibition = async (exhibitionData, exhibitionId) => {
    try {
      const response = exhibitionId 
        ? await exhibitionAPI.update(exhibitionId, exhibitionData)
        : await exhibitionAPI.create(exhibitionData);

      if (response.status === 'OK') {
        await fetchExhibitions();
        setShowAddExhibitionForm(false);
        setEditingExhibition(null);
        alert(exhibitionId ? 'Exhibition updated successfully!' : 'Exhibition saved successfully!');
      } else {
        alert(response.errorMessage || (exhibitionId ? 'Failed to update exhibition' : 'Failed to save exhibition'));
      }
    } catch (err) {
      console.error('Error saving exhibition:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (exhibitionId ? 'Failed to update exhibition. Please try again.' : 'Failed to save exhibition. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchOngoingProjects = async (page = ongoingProjectsPagination.page, limit = ongoingProjectsPagination.limit) => {
    try {
      const response = await ongoingProjectAPI.getAll(page, limit);
      
      // Handle different response structures
      let projectsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        projectsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || projectsList.length;
      } else if (response.returnData?.list_of_item) {
        projectsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || projectsList.length;
      } else if (Array.isArray(response.returnData)) {
        projectsList = response.returnData;
        total = projectsList.length;
      } else if (Array.isArray(response)) {
        projectsList = response;
        total = projectsList.length;
      }
      
      if (projectsList && projectsList.length > 0) {
        // Map API response to ongoing projects format
        const mappedProjects = projectsList.map(proj => ({
          id: proj.id?.toString() || Date.now().toString(),
          title: proj.title || '',
          description: proj.description || '',
          image: proj.image || null,
          createdAt: proj.created_at || proj.createdAt || new Date().toISOString(),
        }));
        setOngoingProjects(mappedProjects);
        setOngoingProjectsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setOngoingProjects([]);
        setOngoingProjectsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching ongoing projects:', err);
      setOngoingProjects([]);
      setOngoingProjectsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleOngoingProjectClick = (e) => {
    e.preventDefault();
    setActiveNav('ongoing-project');
  };

  const handleAddOngoingProjectClick = () => {
    setEditingOngoingProject(null);
    setShowAddOngoingProjectForm(true);
  };

  const handleEditOngoingProject = (project) => {
    setEditingOngoingProject(project);
    setShowAddOngoingProjectForm(true);
  };

  const handleDeleteOngoingProject = async (id) => {
    const project = ongoingProjects.find(p => p.id === id);
    const projectName = project?.title || 'this ongoing project';
    showDeleteConfirmation(id, projectName, 'ongoing project', async () => {
      try {
        const response = await ongoingProjectAPI.delete(id);
        if (response.status === 'OK') {
          await fetchOngoingProjects();
          alert('Ongoing Project deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete ongoing project');
        }
      } catch (err) {
        console.error('Error deleting ongoing project:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete ongoing project. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveOngoingProject = async (projectData, projectId) => {
    try {
      const response = projectId 
        ? await ongoingProjectAPI.update(projectId, projectData)
        : await ongoingProjectAPI.create(projectData);

      if (response.status === 'OK') {
        await fetchOngoingProjects();
        setShowAddOngoingProjectForm(false);
        setEditingOngoingProject(null);
        alert(projectId ? 'Ongoing Project updated successfully!' : 'Ongoing Project saved successfully!');
      } else {
        alert(response.errorMessage || (projectId ? 'Failed to update ongoing project' : 'Failed to save ongoing project'));
      }
    } catch (err) {
      console.error('Error saving ongoing project:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (projectId ? 'Failed to update ongoing project. Please try again.' : 'Failed to save ongoing project. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchAreasOfPartnership = async (page = areasOfPartnershipPagination.page, limit = areasOfPartnershipPagination.limit) => {
    try {
      const response = await areaOfPartnershipAPI.getAll(page, limit);
      
      // Handle different response structures
      let areasList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        areasList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || areasList.length;
      } else if (response.returnData?.list_of_item) {
        areasList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || areasList.length;
      } else if (Array.isArray(response.returnData)) {
        areasList = response.returnData;
        total = areasList.length;
      } else if (Array.isArray(response)) {
        areasList = response;
        total = areasList.length;
      }
      
      if (areasList && areasList.length > 0) {
        // Map API response to areas of partnership format
        const mappedAreas = areasList.map(area => ({
          id: area.id?.toString() || Date.now().toString(),
          title: area.title || '',
          description: area.description || '',
          createdAt: area.created_at || area.createdAt || new Date().toISOString(),
        }));
        setAreasOfPartnership(mappedAreas);
        setAreasOfPartnershipPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setAreasOfPartnership([]);
        setAreasOfPartnershipPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching areas of partnership:', err);
      setAreasOfPartnership([]);
      setAreasOfPartnershipPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleAreaOfPartnershipClick = (e) => {
    e.preventDefault();
    setActiveNav('area-of-partnership');
  };

  const handleAddAreaOfPartnershipClick = () => {
    setEditingAreaOfPartnership(null);
    setShowAddAreaOfPartnershipForm(true);
  };

  const handleEditAreaOfPartnership = (area) => {
    setEditingAreaOfPartnership(area);
    setShowAddAreaOfPartnershipForm(true);
  };

  const handleDeleteAreaOfPartnership = async (id) => {
    const area = areasOfPartnership.find(a => a.id === id);
    const areaName = area?.title || 'this area of partnership';
    showDeleteConfirmation(id, areaName, 'area of partnership', async () => {
      try {
        const response = await areaOfPartnershipAPI.delete(id);
        if (response.status === 'OK') {
          await fetchAreasOfPartnership();
          alert('Area of Partnership deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete area of partnership');
        }
      } catch (err) {
        console.error('Error deleting area of partnership:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete area of partnership. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveAreaOfPartnership = async (areaData, areaId) => {
    try {
      const response = areaId 
        ? await areaOfPartnershipAPI.update(areaId, areaData)
        : await areaOfPartnershipAPI.create(areaData);

      if (response.status === 'OK') {
        await fetchAreasOfPartnership();
        setShowAddAreaOfPartnershipForm(false);
        setEditingAreaOfPartnership(null);
        alert(areaId ? 'Area of Partnership updated successfully!' : 'Area of Partnership saved successfully!');
      } else {
        alert(response.errorMessage || (areaId ? 'Failed to update area of partnership' : 'Failed to save area of partnership'));
      }
    } catch (err) {
      console.error('Error saving area of partnership:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (areaId ? 'Failed to update area of partnership. Please try again.' : 'Failed to save area of partnership. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchFellowshipGrants = async (page = fellowshipGrantsPagination.page, limit = fellowshipGrantsPagination.limit) => {
    try {
      const response = await fellowshipGrantsAPI.getAll(page, limit);
      
      // Handle different response structures
      let grantsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        grantsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || grantsList.length;
      } else if (response.returnData?.list_of_item) {
        grantsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || grantsList.length;
      } else if (Array.isArray(response.returnData)) {
        grantsList = response.returnData;
        total = grantsList.length;
      } else if (Array.isArray(response)) {
        grantsList = response;
        total = grantsList.length;
      }
      
      if (grantsList && grantsList.length > 0) {
        const mappedGrants = grantsList.map(grant => ({
          id: grant.id,
          title: grant.title || '',
          description: grant.description || '',
          link: grant.link || '',
          status: grant.status || 'OPEN',
          image: grant.image || null
        }));
        setFellowshipGrants(mappedGrants);
        setFellowshipGrantsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setFellowshipGrants([]);
        setFellowshipGrantsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching fellowship grants:', err);
      setFellowshipGrants([]);
      setFellowshipGrantsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleFellowshipGrantClick = (e) => {
    e.preventDefault();
    setActiveNav('fellowship-grants');
  };

  const handleAddFellowshipGrantClick = () => {
    setEditingFellowshipGrant(null);
    setShowAddFellowshipGrantForm(true);
  };

  const handleEditFellowshipGrant = (grant) => {
    setEditingFellowshipGrant(grant);
    setShowAddFellowshipGrantForm(true);
  };

  const handleDeleteFellowshipGrant = async (id) => {
    const grant = fellowshipGrants.find(g => g.id === id);
    const grantName = grant?.title || 'this fellowship grant';
    showDeleteConfirmation(id, grantName, 'fellowship grant', async () => {
      try {
        const response = await fellowshipGrantsAPI.delete(id);
        if (response.status === 'OK') {
          await fetchFellowshipGrants();
          alert('Fellowship Grant deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete fellowship grant');
        }
      } catch (err) {
        console.error('Error deleting fellowship grant:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete fellowship grant. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveFellowshipGrant = async (grantData, grantId) => {
    try {
      const response = grantId 
        ? await fellowshipGrantsAPI.update(grantId, grantData)
        : await fellowshipGrantsAPI.create(grantData);

      if (response.status === 'OK') {
        await fetchFellowshipGrants();
        setShowAddFellowshipGrantForm(false);
        setEditingFellowshipGrant(null);
        alert(grantId ? 'Fellowship Grant updated successfully!' : 'Fellowship Grant saved successfully!');
      } else {
        // Handle array or string error messages
        const errorMsg = Array.isArray(response.errorMessage) 
          ? response.errorMessage.join(', ') 
          : response.errorMessage || (grantId ? 'Failed to update fellowship grant' : 'Failed to save fellowship grant');
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Error saving fellowship grant:', err);
      // Handle array or string error messages from backend
      const backendError = err.response?.data?.errorMessage;
      const errorMessage = Array.isArray(backendError)
        ? backendError.join(', ')
        : backendError || err.message || (grantId ? 'Failed to update fellowship grant. Please try again.' : 'Failed to save fellowship grant. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchPressReleases = async (page = pressReleasesPagination.page, limit = pressReleasesPagination.limit) => {
    try {
      const response = await pressReleaseAPI.getAll(page, limit);
      
      // Handle different response structures
      let pressReleasesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        pressReleasesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || pressReleasesList.length;
      } else if (response.returnData?.list_of_item) {
        pressReleasesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || pressReleasesList.length;
      } else if (Array.isArray(response.returnData)) {
        pressReleasesList = response.returnData;
        total = pressReleasesList.length;
      } else if (Array.isArray(response)) {
        pressReleasesList = response;
        total = pressReleasesList.length;
      }
      
      if (pressReleasesList && pressReleasesList.length > 0) {
        const mappedPressReleases = pressReleasesList.map(pr => ({
          id: pr.id?.toString() || Date.now().toString(),
          title: pr.title || '',
          description: pr.description || '',
          image: pr.image || null
        }));
        setPressReleases(mappedPressReleases);
        setPressReleasesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setPressReleases([]);
        setPressReleasesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching press releases:', err);
      setPressReleases([]);
      setPressReleasesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handlePressReleaseClick = (e) => {
    e.preventDefault();
    setActiveNav('press-release');
  };

  const handleAddPressReleaseClick = () => {
    setEditingPressRelease(null);
    setShowAddPressReleaseForm(true);
  };

  const handleEditPressRelease = (pressRelease) => {
    setEditingPressRelease(pressRelease);
    setShowAddPressReleaseForm(true);
  };

  const handleDeletePressRelease = async (id) => {
    const pressRelease = pressReleases.find(pr => pr.id === id);
    const pressReleaseName = pressRelease?.title || 'this press release';
    showDeleteConfirmation(id, pressReleaseName, 'press release', async () => {
      try {
        const response = await pressReleaseAPI.delete(id);
        if (response.status === 'OK') {
          await fetchPressReleases();
          alert('Press Release deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete press release');
        }
      } catch (err) {
        console.error('Error deleting press release:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete press release. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSavePressRelease = async (pressReleaseData, pressReleaseId = null) => {
    try {
      let response;
      
      if (pressReleaseId) {
        // Update existing press release
        response = await pressReleaseAPI.update(pressReleaseId, pressReleaseData);
      } else {
        // Create new press release
        response = await pressReleaseAPI.create(pressReleaseData);
      }
      
      if (response.status === 'OK') {
        // Refresh press releases list from API
        await fetchPressReleases();
        setShowAddPressReleaseForm(false);
        setEditingPressRelease(null);
        alert(pressReleaseId ? 'Press Release updated successfully!' : 'Press Release saved successfully!');
      } else {
        alert(response.errorMessage || (pressReleaseId ? 'Failed to update press release' : 'Failed to save press release'));
      }
    } catch (err) {
      console.error('Error saving press release:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (pressReleaseId ? 'Failed to update press release. Please try again.' : 'Failed to save press release. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchStatements = async (page = statementsPagination.page, limit = statementsPagination.limit) => {
    try {
      const response = await statementAPI.getAll(page, limit);
      
      // Handle different response structures
      let statementsList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        statementsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || statementsList.length;
      } else if (response.returnData?.list_of_item) {
        statementsList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || statementsList.length;
      } else if (Array.isArray(response.returnData)) {
        statementsList = response.returnData;
        total = statementsList.length;
      } else if (Array.isArray(response)) {
        statementsList = response;
        total = statementsList.length;
      }
      
      if (statementsList && statementsList.length > 0) {
        const mappedStatements = statementsList.map(s => ({
          id: s.id?.toString() || Date.now().toString(),
          title: s.title || '',
          description: s.description || '',
          image: s.image || null
        }));
        setStatements(mappedStatements);
        setStatementsPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setStatements([]);
        setStatementsPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching statements:', err);
      setStatements([]);
      setStatementsPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleStatementClick = (e) => {
    e.preventDefault();
    setActiveNav('statement');
  };

  const handleAddStatementClick = () => {
    setEditingStatement(null);
    setShowAddStatementForm(true);
  };

  const handleEditStatement = (statement) => {
    setEditingStatement(statement);
    setShowAddStatementForm(true);
  };

  const handleDeleteStatement = async (id) => {
    const statement = statements.find(s => s.id === id);
    const statementName = statement?.title || 'this statement';
    showDeleteConfirmation(id, statementName, 'statement', async () => {
      try {
        const response = await statementAPI.delete(id);
        if (response.status === 'OK') {
          await fetchStatements();
          alert('Statement deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete statement');
        }
      } catch (err) {
        console.error('Error deleting statement:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete statement. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveStatement = async (statementData, statementId = null) => {
    try {
      let response;
      
      if (statementId) {
        // Update existing statement
        response = await statementAPI.update(statementId, statementData);
      } else {
        // Create new statement
        response = await statementAPI.create(statementData);
      }
      
      if (response.status === 'OK') {
        // Refresh statements list from API
        await fetchStatements();
        setShowAddStatementForm(false);
        setEditingStatement(null);
        alert(statementId ? 'Statement updated successfully!' : 'Statement saved successfully!');
      } else {
        alert(response.errorMessage || (statementId ? 'Failed to update statement' : 'Failed to save statement'));
      }
    } catch (err) {
      console.error('Error saving statement:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (statementId ? 'Failed to update statement. Please try again.' : 'Failed to save statement. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchVideos = async (page = videosPagination.page, limit = videosPagination.limit) => {
    try {
      const response = await costechVideoAPI.getAll(page, limit);
      
      // Handle different response structures
      let videosList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        videosList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || videosList.length;
      } else if (response.returnData?.list_of_item) {
        videosList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || videosList.length;
      } else if (Array.isArray(response.returnData)) {
        videosList = response.returnData;
        total = videosList.length;
      } else if (Array.isArray(response)) {
        videosList = response;
        total = videosList.length;
      }
      
      if (videosList && videosList.length > 0) {
        const mappedVideos = videosList.map(v => ({
          id: v.id?.toString() || Date.now().toString(),
          title: v.title || '',
          description: v.description || '',
          video_link: v.video_link || null
        }));
        setVideos(mappedVideos);
        setVideosPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setVideos([]);
        setVideosPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setVideos([]);
      setVideosPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    setActiveNav('costech-video');
  };

  const handleAddVideoClick = () => {
    setEditingVideo(null);
    setShowAddVideoForm(true);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setShowAddVideoForm(true);
  };

  const handleDeleteVideo = async (id) => {
    const video = videos.find(v => v.id === id);
    const videoName = video?.title || 'this video';
    showDeleteConfirmation(id, videoName, 'video', async () => {
      try {
        const response = await costechVideoAPI.delete(id);
        if (response.status === 'OK') {
          await fetchVideos();
          alert('Video deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete video');
        }
      } catch (err) {
        console.error('Error deleting video:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete video. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveVideo = async (videoData, videoId = null) => {
    try {
      let response;
      
      if (videoId) {
        // Update existing video
        response = await costechVideoAPI.update(videoId, videoData);
      } else {
        // Create new video
        response = await costechVideoAPI.create(videoData);
      }
      
      if (response.status === 'OK') {
        // Refresh videos list from API
        await fetchVideos();
        setShowAddVideoForm(false);
        setEditingVideo(null);
        alert(videoId ? 'Video updated successfully!' : 'Video saved successfully!');
      } else {
        alert(response.errorMessage || (videoId ? 'Failed to update video' : 'Failed to save video'));
      }
    } catch (err) {
      console.error('Error saving video:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (videoId ? 'Failed to update video. Please try again.' : 'Failed to save video. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchCommunityEngagements = async () => {
    try {
      const response = await communityEngagementAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        const mappedEngagements = response.returnData.list_of_item.map(e => ({
          id: e.id?.toString() || Date.now().toString(),
          title: e.title || '',
          description: e.description || '',
          date: e.date || e.created_at || new Date().toISOString().split('T')[0],
          image: e.image || null
        }));
        setCommunityEngagements(mappedEngagements);
      }
    } catch (err) {
      console.error('Error fetching community engagements:', err);
    }
  };

  const handleCommunityEngagementClick = (e) => {
    e.preventDefault();
    setActiveNav('community-engagement');
  };

  const handleAddCommunityEngagementClick = () => {
    setEditingCommunityEngagement(null);
    setShowAddCommunityEngagementForm(true);
  };

  const handleEditCommunityEngagement = (engagement) => {
    setEditingCommunityEngagement(engagement);
    setShowAddCommunityEngagementForm(true);
  };

  const handleDeleteCommunityEngagement = async (id) => {
    const engagement = communityEngagements.find(e => e.id === id);
    const engagementName = engagement?.title || 'this community engagement';
    showDeleteConfirmation(id, engagementName, 'community engagement', async () => {
      try {
        const response = await communityEngagementAPI.delete(id);
        if (response.status === 'OK') {
          await fetchCommunityEngagements();
          alert('Community Engagement deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete community engagement');
        }
      } catch (err) {
        console.error('Error deleting community engagement:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete community engagement. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveCommunityEngagement = async (engagementData, engagementId = null) => {
    try {
      let response;
      
      if (engagementId) {
        // Update existing engagement
        response = await communityEngagementAPI.update(engagementId, engagementData);
      } else {
        // Create new engagement
        response = await communityEngagementAPI.create(engagementData);
      }
      
      if (response.status === 'OK') {
        // Refresh engagements list from API
        await fetchCommunityEngagements();
        setShowAddCommunityEngagementForm(false);
        setEditingCommunityEngagement(null);
        alert(engagementId ? 'Community Engagement updated successfully!' : 'Community Engagement saved successfully!');
      } else {
        alert(response.errorMessage || (engagementId ? 'Failed to update community engagement' : 'Failed to save community engagement'));
      }
    } catch (err) {
      console.error('Error saving community engagement:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (engagementId ? 'Failed to update community engagement. Please try again.' : 'Failed to save community engagement. Please try again.');
      alert(errorMessage);
    }
  };

  const fetchHerinInstitutions = async () => {
    try {
      const response = await herinInstitutionAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        const mappedInstitutions = response.returnData.list_of_item.map(i => ({
          id: i.id?.toString() || Date.now().toString(),
          name: i.institution_name || i.name || '',
          institution_name: i.institution_name || i.name || '',
          description: i.description || '',
          operation_area: i.operation_area || '',
          region: i.region || '',
          category: i.category || '',
          createdAt: i.created_at || i.createdAt || new Date().toISOString(),
        }));
        setHerinInstitutions(mappedInstitutions);
      }
    } catch (err) {
      console.error('Error fetching HERIN institutions:', err);
    }
  };

  const handleHerinInstitutionClick = (e) => {
    e.preventDefault();
    setActiveNav('herin-institution');
  };

  const handleAddHerinInstitutionClick = () => {
    setEditingHerinInstitution(null);
    setShowAddHerinInstitutionForm(true);
  };

  const handleEditHerinInstitution = (institution) => {
    setEditingHerinInstitution(institution);
    setShowAddHerinInstitutionForm(true);
  };

  const handleDeleteHerinInstitution = async (id) => {
    const institution = herinInstitutions.find(i => i.id === id);
    const institutionName = institution?.name || 'this institution';
    showDeleteConfirmation(id, institutionName, 'HERIN institution', async () => {
      try {
        const response = await herinInstitutionAPI.delete(id);
        if (response.status === 'OK') {
          await fetchHerinInstitutions();
          alert('HERIN Institution deleted successfully!');
        } else {
          alert(response.errorMessage || 'Failed to delete HERIN institution');
        }
      } catch (err) {
        console.error('Error deleting HERIN institution:', err);
        const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete HERIN institution. Please try again.';
        alert(errorMessage);
      }
    });
  };

  const handleSaveHerinInstitution = async (institutionData, institutionId = null) => {
    try {
      let response;
      
      if (institutionId) {
        response = await herinInstitutionAPI.update(institutionId, institutionData);
      } else {
        response = await herinInstitutionAPI.create(institutionData);
      }
      
      if (response.status === 'OK') {
        await fetchHerinInstitutions();
        setShowAddHerinInstitutionForm(false);
        setEditingHerinInstitution(null);
        alert(institutionId ? 'HERIN Institution updated successfully!' : 'HERIN Institution saved successfully!');
      } else {
        const errorMsg = Array.isArray(response.errorMessage) 
          ? response.errorMessage.join(', ') 
          : response.errorMessage || (institutionId ? 'Failed to update HERIN institution' : 'Failed to save HERIN institution');
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Error saving HERIN institution:', err);
      const backendError = err.response?.data?.errorMessage;
      const errorMessage = Array.isArray(backendError)
        ? backendError.join(', ')
        : backendError || err.message || (institutionId ? 'Failed to update HERIN institution. Please try again.' : 'Failed to save HERIN institution. Please try again.');
      alert(errorMessage);
    }
  };

  // Directorate handlers
  const fetchDirectorates = async (page = directoratesPagination.page, limit = directoratesPagination.limit) => {
    try {
      const response = await directorateAPI.getAll(page, limit);
      
      // Handle different response structures
      let directoratesList = [];
      let total = 0;
      
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        directoratesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || directoratesList.length;
      } else if (response.returnData?.list_of_item) {
        directoratesList = response.returnData.list_of_item;
        total = response.returnData?.total || response.returnData?.total_count || directoratesList.length;
      } else if (Array.isArray(response.returnData)) {
        directoratesList = response.returnData;
        total = directoratesList.length;
      } else if (Array.isArray(response)) {
        directoratesList = response;
        total = directoratesList.length;
      }
      
      if (directoratesList && directoratesList.length > 0) {
        const mappedDirectorates = directoratesList.map(d => {
          // Parse service_offered - could be JSON string or array
          let serviceOffered = [];
          if (d.service_offered) {
            if (typeof d.service_offered === 'string') {
              try {
                serviceOffered = JSON.parse(d.service_offered);
              } catch (e) {
                console.error('Error parsing service_offered:', e);
                serviceOffered = [];
              }
            } else if (Array.isArray(d.service_offered)) {
              serviceOffered = d.service_offered;
            }
          }

          // Parse downloads - could be JSON string, object, or array
          // Backend returns it as JSON string, can be single object or array
          let downloads = [];
          if (d.downloads) {
            if (typeof d.downloads === 'string') {
              try {
                const parsed = JSON.parse(d.downloads);
                // Backend can return single object like {"name": "...", "document": "..."}
                // or array of objects, always convert to array for consistency
                if (Array.isArray(parsed)) {
                  downloads = parsed;
                } else if (parsed && typeof parsed === 'object') {
                  // Single object, convert to array
                  downloads = [parsed];
                }
              } catch (e) {
                console.error('Error parsing downloads:', e);
                downloads = [];
              }
            } else if (Array.isArray(d.downloads)) {
              downloads = d.downloads;
            } else if (typeof d.downloads === 'object' && d.downloads !== null) {
              // Single object, convert to array
              downloads = [d.downloads];
            }
          }

          return {
            id: d.id?.toString() || Date.now().toString(),
            name: d.name || '',
            message_from_director: d.message_from_director || '',
            director_name: d.director_name || '',
            service_offered: serviceOffered,
            downloads: downloads,
            document: d.document || '',
            date: d.date || d.created_at || d.createdAt || '',
            createdAt: d.created_at || d.createdAt || new Date().toISOString(),
          };
        });
        setDirectorates(mappedDirectorates);
        setDirectoratesPagination(prev => ({ ...prev, page, limit, total }));
      } else {
        setDirectorates([]);
        setDirectoratesPagination(prev => ({ ...prev, page, limit, total: 0 }));
      }
    } catch (err) {
      console.error('Error fetching directorates:', err);
      setDirectorates([]);
      setDirectoratesPagination(prev => ({ ...prev, total: 0 }));
    }
  };

  const handleDirectorateClick = (e) => {
    e.preventDefault();
    setActiveNav('directorate');
  };

  const handleAddDirectorateClick = () => {
    setEditingDirectorate(null);
    setShowAddDirectorateForm(true);
  };

  const handleEditDirectorate = (directorate) => {
    setEditingDirectorate(directorate);
    setShowAddDirectorateForm(true);
  };

  const handleDeleteDirectorate = (id) => {
    if (window.confirm('Are you sure you want to delete this directorate?')) {
      (async () => {
        try {
          const response = await directorateAPI.delete(id);
          if (response.status === 'OK') {
            await fetchDirectorates(directoratesPagination.page, directoratesPagination.limit);
            alert('Directorate deleted successfully!');
          } else {
            alert(response.errorMessage || 'Failed to delete directorate');
          }
        } catch (err) {
          console.error('Error deleting directorate:', err);
          const errorMessage = err.response?.data?.errorMessage || err.message || 'Failed to delete directorate. Please try again.';
          alert(errorMessage);
        }
      })();
    }
  };

  const handleSaveDirectorate = async (directorateData, directorateId = null) => {
    try {
      let response;
      
      if (directorateId) {
        response = await directorateAPI.update(directorateId, directorateData);
      } else {
        response = await directorateAPI.create(directorateData);
      }
      
      if (response.status === 'OK') {
        await fetchDirectorates(directoratesPagination.page, directoratesPagination.limit);
        setShowAddDirectorateForm(false);
        setEditingDirectorate(null);
        alert(directorateId ? 'Directorate updated successfully!' : 'Directorate saved successfully!');
      } else {
        const errorMsg = Array.isArray(response.errorMessage) 
          ? response.errorMessage.join(', ') 
          : response.errorMessage || (directorateId ? 'Failed to update directorate' : 'Failed to save directorate');
        alert(errorMsg);
      }
    } catch (err) {
      console.error('Error saving directorate:', err);
      const backendError = err.response?.data?.errorMessage;
      const errorMessage = Array.isArray(backendError)
        ? backendError.join(', ')
        : backendError || err.message || (directorateId ? 'Failed to update directorate. Please try again.' : 'Failed to save directorate. Please try again.');
      alert(errorMessage);
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img 
            src="/assets/img/costechlogonew.png" 
            alt="CosTech Logo" 
            className="admin-logo"
          />
          <h1 className="admin-brand">Admin Panel</h1>
        </div>
        
        <nav className="sidebar-nav">
          <a 
            href="#dashboard" 
            className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('dashboard'); }}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>DASHBOARD</span>
          </a>
          <a 
            href="#section" 
            className={`nav-item ${activeNav === 'SECTION' ? 'active' : ''}`}
            onClick={handleSectionClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>SECTION</span>
          </a>
          
          {/* HOMEPAGE Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.homepage ? 'open' : ''} ${['heroes', 'news', 'partners'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('homepage')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>HOMEPAGE</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.homepage ? 'open' : ''}`}>
              <a 
                href="#heroes" 
                className={`nav-dropdown-item ${activeNav === 'heroes' ? 'active' : ''}`}
                onClick={handleHeroesClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Heroes</span>
          </a>
          <a 
            href="#news" 
                className={`nav-dropdown-item ${activeNav === 'news' ? 'active' : ''}`}
            onClick={handleNewsClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 4a2 2 0 002 2m0 0a2 2 0 002-2m-2 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>News</span>
          </a>
          <a 
            href="#partners" 
                className={`nav-dropdown-item ${activeNav === 'partners' ? 'active' : ''}`}
            onClick={handlePartnersClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Partners</span>
          </a>
            </div>
          </div>
          
          {/* ABOUT MENU Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.about ? 'open' : ''} ${['positions', 'management-team', 'commission-members'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('about')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
                <span>ABOUT MENU</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.about ? 'open' : ''}`}>
          <a 
            href="#positions" 
                className={`nav-dropdown-item ${activeNav === 'positions' ? 'active' : ''}`}
            onClick={handlePositionsClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Position/Cheo</span>
          </a>
          <a 
            href="#management-team" 
                className={`nav-dropdown-item ${activeNav === 'management-team' ? 'active' : ''}`}
            onClick={handleManagementTeamClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Management Team</span>
          </a>
          <a 
            href="#commission-members" 
                className={`nav-dropdown-item ${activeNav === 'commission-members' ? 'active' : ''}`}
            onClick={handleCommissionMembersClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Commission Members</span>
          </a>
            </div>
          </div>

          {/* FAQ MANAGEMENT Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.faqManagement ? 'open' : ''} ${['faq-category', 'faq'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('faqManagement')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>FAQ MANAGEMENT</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.faqManagement ? 'open' : ''}`}>
              <a 
                href="#faq-category" 
                    className={`nav-dropdown-item ${activeNav === 'faq-category' ? 'active' : ''}`}
                onClick={handleFaqCategoryClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>FAQ Category</span>
              </a>
              <a 
                href="#faq" 
                    className={`nav-dropdown-item ${activeNav === 'faq' ? 'active' : ''}`}
                onClick={handleFaqClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>FAQ</span>
          </a>
            </div>
          </div>
          <a 
            href="#innovation-space" 
            className={`nav-item ${activeNav === 'innovation-space' ? 'active' : ''}`}
            onClick={handleInnovationSpaceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>INNOVATION SPACE</span>
          </a>
          <a 
            href="#online-service" 
            className={`nav-item ${activeNav === 'online-service' ? 'active' : ''}`}
            onClick={handleOnlineServiceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>ONLINE SERVICES</span>
          </a>

          {/* HERIN Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.herin ? 'open' : ''} ${activeNav === 'herin-institution' ? 'active' : ''}`}
              onClick={() => toggleDropdown('herin')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>HERIN</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.herin ? 'open' : ''}`}>
              <a 
                href="#herin-institution" 
                className={`nav-dropdown-item ${activeNav === 'herin-institution' ? 'active' : ''}`}
                onClick={handleHerinInstitutionClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Institution</span>
              </a>
            </div>
          </div>
          
          {/* PUBLICATION Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.publication ? 'open' : ''} ${['books', 'magazine', 'reports', 'policies', 'guideline-documents', 'strategic-plan', 'acts-and-legal', 'financial-report'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('publication')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>PUBLICATION</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.publication ? 'open' : ''}`}>
              <a 
                href="#books" 
                className={`nav-dropdown-item ${activeNav === 'books' ? 'active' : ''}`}
                onClick={handleBookClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
                <span>Books</span>
          </a>
          <a 
            href="#magazine" 
                className={`nav-dropdown-item ${activeNav === 'magazine' ? 'active' : ''}`}
            onClick={handleMagazineClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Magazine</span>
          </a>
          <a 
            href="#reports" 
                className={`nav-dropdown-item ${activeNav === 'reports' ? 'active' : ''}`}
            onClick={handleReportClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Reports</span>
          </a>
          <a 
                href="#policies" 
                className={`nav-dropdown-item ${activeNav === 'policies' ? 'active' : ''}`}
                onClick={handlePolicyClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                <span>Policies</span>
          </a>
          <a 
                href="#guideline-documents"
                className={`nav-dropdown-item ${activeNav === 'guideline-documents' ? 'active' : ''}`}
                onClick={handleGuidelineDocumentClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                <span>Guideline Documents</span>
          </a>
          <a 
            href="#strategic-plan" 
                className={`nav-dropdown-item ${activeNav === 'strategic-plan' ? 'active' : ''}`}
            onClick={handleStrategicPlanClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Strategic Plan</span>
          </a>
          <a
                href="#acts-and-legal" 
                className={`nav-dropdown-item ${activeNav === 'acts-and-legal' ? 'active' : ''}`}
                onClick={handleActsAndLegalClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Acts and Legal</span>
              </a>
              <a 
                href="#financial-report" 
                className={`nav-dropdown-item ${activeNav === 'financial-report' ? 'active' : ''}`}
                onClick={handleFinancialReportClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                <span>Financial Report</span>
              </a>
            </div>
          </div>
          
          {/* PROGRAM Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.program ? 'open' : ''} ${['ongoing-project', 'area-of-partnership'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('program')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>PROGRAM</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.program ? 'open' : ''}`}>
              <a
                href="#ongoing-project"
                className={`nav-dropdown-item ${activeNav === 'ongoing-project' ? 'active' : ''}`}
                onClick={handleOngoingProjectClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
                <span>Ongoing Project</span>
              </a>
              <a
                href="#area-of-partnership"
                className={`nav-dropdown-item ${activeNav === 'area-of-partnership' ? 'active' : ''}`}
                onClick={handleAreaOfPartnershipClick}
              >
                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Area of Partnership</span>
              </a>
            </div>
          </div>
          
          {/* EVENTS Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.events ? 'open' : ''} ${['exhibition', 'conference', 'community-engagement'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('events')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>EVENTS</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.events ? 'open' : ''}`}>
          <a
            href="#exhibition"
                className={`nav-dropdown-item ${activeNav === 'exhibition' ? 'active' : ''}`}
            onClick={handleExhibitionClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Exhibition</span>
          </a>
          <a
                href="#conference"
                className={`nav-dropdown-item ${activeNav === 'conference' ? 'active' : ''}`}
                onClick={handleConferenceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
                <span>Conference</span>
          </a>
          <a
                href="#community-engagement" 
                className={`nav-dropdown-item ${activeNav === 'community-engagement' ? 'active' : ''}`}
                onClick={handleCommunityEngagementClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
                <span>Community Engagement</span>
          </a>
            </div>
          </div>
          <a 
            href="#fellowship-grants" 
            className={`nav-item ${activeNav === 'fellowship-grants' ? 'active' : ''}`}
            onClick={handleFellowshipGrantClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>FELLOWSHIP GRANTS</span>
          </a>
          {/* MEDIA CENTRE Dropdown */}
          <div className="nav-dropdown">
            <div 
              className={`nav-dropdown-header ${openDropdowns.mediaCentre ? 'open' : ''} ${['press-release', 'statement', 'costech-video', 'newsletter'].includes(activeNav) ? 'active' : ''}`}
              onClick={() => toggleDropdown('mediaCentre')}
            >
              <div className="nav-dropdown-title">
                <svg className="nav-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
                <span>MEDIA CENTRE</span>
              </div>
              <svg className="nav-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`nav-dropdown-menu ${openDropdowns.mediaCentre ? 'open' : ''}`}>
              <a 
                href="#press-release" 
                className={`nav-dropdown-item ${activeNav === 'press-release' ? 'active' : ''}`}
                onClick={handlePressReleaseClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 4a2 2 0 002 2m0 0a2 2 0 002-2m-2 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
                <span>Press Release</span>
          </a>
          <a 
                href="#statement" 
                className={`nav-dropdown-item ${activeNav === 'statement' ? 'active' : ''}`}
                onClick={handleStatementClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
                <span>Statements</span>
          </a>
          <a 
                href="#costech-video" 
                className={`nav-dropdown-item ${activeNav === 'costech-video' ? 'active' : ''}`}
                onClick={handleVideoClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
                <span>Costech Videos</span>
          </a>
          <a 
            href="#newsletter" 
            className={`nav-dropdown-item ${activeNav === 'newsletter' ? 'active' : ''}`}
            onClick={handleNewsletterClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Newsletter</span>
          </a>
            </div>
          </div>

          {/* Directorate */}
          <a 
            href="#directorate" 
            className={`nav-item ${activeNav === 'directorate' ? 'active' : ''}`}
            onClick={handleDirectorateClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>DIRECTORATES</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {activeNav === 'SECTION' ? (
          <SectionPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveSection}
            sections={sections}
            onAddSectionClick={handleAddSectionClick}
                onDelete={handleDeleteSection}
                onEdit={handleEditSection}
          />
        ) : activeNav === 'news' ? (
          <NewsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveNews}
            news={news}
            onAddNewsClick={handleAddNewsClick}
            onDelete={handleDeleteNews}
            onEdit={handleEditNews}
            pagination={{
              currentPage: newsPagination.page,
              totalPages: Math.ceil(newsPagination.total / newsPagination.limit),
              itemsPerPage: newsPagination.limit,
              totalItems: newsPagination.total,
              onPageChange: handleNewsPageChange,
              onItemsPerPageChange: handleNewsItemsPerPageChange
            }}
          />
        ) : activeNav === 'partners' ? (
          <PartnersPage 
            onBack={handleBackToDashboard}
            onSave={handleSavePartner}
            partners={partners}
            onAddPartnerClick={handleAddPartnerClick}
            onDelete={handleDeletePartner}
            onEdit={handleEditPartner}
            pagination={{
              currentPage: partnersPagination.page,
              totalPages: Math.ceil(partnersPagination.total / partnersPagination.limit),
              itemsPerPage: partnersPagination.limit,
              totalItems: partnersPagination.total,
              onPageChange: handlePartnersPageChange,
              onItemsPerPageChange: handlePartnersItemsPerPageChange
            }}
          />
        ) : activeNav === 'heroes' ? (
          <HeroesPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveHero}
            heroes={heroes}
            onAddHeroClick={handleAddHeroClick}
            onDelete={handleDeleteHero}
            onEdit={handleEditHero}
            pagination={{
              currentPage: heroesPagination.page,
              totalPages: Math.ceil(heroesPagination.total / heroesPagination.limit),
              itemsPerPage: heroesPagination.limit,
              totalItems: heroesPagination.total,
              onPageChange: handleHeroesPageChange,
              onItemsPerPageChange: handleHeroesItemsPerPageChange
            }}
          />
        ) : activeNav === 'positions' ? (
          <PositionPage 
            onBack={handleBackToDashboard}
            onSave={handleSavePosition}
            positions={positions}
            onAddPositionClick={handleAddPositionClick}
            onDelete={handleDeletePosition}
            onEdit={handleEditPosition}
          />
        ) : activeNav === 'faq-category' ? (
          <FaqCategoryPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFaqCategory}
            categories={faqCategories}
            onAddCategoryClick={handleAddFaqCategoryClick}
            onDelete={handleDeleteFaqCategory}
            onEdit={handleEditFaqCategory}
            pagination={{
              currentPage: faqCategoriesPagination.page,
              totalPages: Math.ceil(faqCategoriesPagination.total / faqCategoriesPagination.limit),
              itemsPerPage: faqCategoriesPagination.limit,
              totalItems: faqCategoriesPagination.total,
              onPageChange: handleFaqCategoriesPageChange,
              onItemsPerPageChange: handleFaqCategoriesItemsPerPageChange
            }}
          />
        ) : activeNav === 'faq' ? (
          <FaqPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFaq}
            faqs={faqs}
            categories={faqCategories}
            onAddFaqClick={handleAddFaqClick}
            onDelete={handleDeleteFaq}
            onEdit={handleEditFaq}
            pagination={{
              currentPage: faqsPagination.page,
              totalPages: Math.ceil(faqsPagination.total / faqsPagination.limit),
              itemsPerPage: faqsPagination.limit,
              totalItems: faqsPagination.total,
              onPageChange: handleFaqsPageChange,
              onItemsPerPageChange: handleFaqsItemsPerPageChange
            }}
          />
        ) : activeNav === 'management-team' ? (
          <ManagementTeamPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveTeamMember}
            teamMembers={teamMembers}
            positions={positions}
            onAddTeamMemberClick={handleAddTeamMemberClick}
            onDelete={handleDeleteTeamMember}
            onEdit={handleEditTeamMember}
          />
        ) : activeNav === 'commission-members' ? (
          <CommissionMembersPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveCommissionMember}
            members={commissionMembers}
            onAddMemberClick={handleAddCommissionMemberClick}
            onDelete={handleDeleteCommissionMember}
            onEdit={handleEditCommissionMember}
          />
        ) : activeNav === 'innovation-space' ? (
          <InnovationSpacePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveInnovationSpace}
            spaces={innovationSpaces}
            onAddSpaceClick={handleAddInnovationSpaceClick}
            onDelete={handleDeleteInnovationSpace}
            onEdit={handleEditInnovationSpace}
            pagination={{
              currentPage: innovationSpacesPagination.page,
              totalPages: Math.ceil(innovationSpacesPagination.total / innovationSpacesPagination.limit),
              itemsPerPage: innovationSpacesPagination.limit,
              totalItems: innovationSpacesPagination.total,
              onPageChange: handleInnovationSpacesPageChange,
              onItemsPerPageChange: handleInnovationSpacesItemsPerPageChange
            }}
          />
        ) : activeNav === 'online-service' ? (
          <OnlineServicePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveOnlineService}
            services={onlineServices}
            onAddServiceClick={handleAddOnlineServiceClick}
            onDelete={handleDeleteOnlineService}
            onEdit={handleEditOnlineService}
            pagination={{
              currentPage: onlineServicesPagination.page,
              totalPages: Math.ceil(onlineServicesPagination.total / onlineServicesPagination.limit),
              itemsPerPage: onlineServicesPagination.limit,
              totalItems: onlineServicesPagination.total,
              onPageChange: handleOnlineServicesPageChange,
              onItemsPerPageChange: handleOnlineServicesItemsPerPageChange
            }}
          />
        ) : activeNav === 'financial-report' ? (
          <FinancialReportPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFinancialReport}
            reports={financialReports}
            onAddReportClick={handleAddFinancialReportClick}
            onDelete={handleDeleteFinancialReport}
            onEdit={handleEditFinancialReport}
            pagination={{
              currentPage: financialReportsPagination.page,
              totalPages: Math.ceil(financialReportsPagination.total / financialReportsPagination.limit),
              itemsPerPage: financialReportsPagination.limit,
              totalItems: financialReportsPagination.total,
              onPageChange: handleFinancialReportsPageChange,
              onItemsPerPageChange: handleFinancialReportsItemsPerPageChange
            }}
          />
        ) : activeNav === 'magazine' ? (
          <MagazinePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveMagazine}
            magazines={magazines}
            onAddMagazineClick={handleAddMagazineClick}
            onDelete={handleDeleteMagazine}
            onEdit={handleEditMagazine}
            pagination={{
              currentPage: magazinesPagination.page,
              totalPages: Math.ceil(magazinesPagination.total / magazinesPagination.limit),
              itemsPerPage: magazinesPagination.limit,
              totalItems: magazinesPagination.total,
              onPageChange: handleMagazinesPageChange,
              onItemsPerPageChange: handleMagazinesItemsPerPageChange
            }}
          />
        ) : activeNav === 'newsletter' ? (
          <NewsletterPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveNewsletter}
            newsletters={newsletters}
            onAddNewsletterClick={handleAddNewsletterClick}
            onDelete={handleDeleteNewsletter}
            onEdit={handleEditNewsletter}
            pagination={{
              currentPage: newslettersPagination.page,
              totalPages: Math.ceil(newslettersPagination.total / newslettersPagination.limit),
              itemsPerPage: newslettersPagination.limit,
              totalItems: newslettersPagination.total,
              onPageChange: handleNewslettersPageChange,
              onItemsPerPageChange: handleNewslettersItemsPerPageChange
            }}
          />
        ) : activeNav === 'books' ? (
          <BooksPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveBook}
            books={books}
            onAddBookClick={handleAddBookClick}
            onDelete={handleDeleteBook}
            onEdit={handleEditBook}
            pagination={{
              currentPage: booksPagination.page,
              totalPages: Math.ceil(booksPagination.total / booksPagination.limit),
              itemsPerPage: booksPagination.limit,
              totalItems: booksPagination.total,
              onPageChange: handleBooksPageChange,
              onItemsPerPageChange: handleBooksItemsPerPageChange
            }}
          />
        ) : activeNav === 'reports' ? (
          <ReportsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveReport}
            reports={reports}
            onAddReportClick={handleAddReportClick}
            onDelete={handleDeleteReport}
            onEdit={handleEditReport}
            pagination={{
              currentPage: reportsPagination.page,
              totalPages: Math.ceil(reportsPagination.total / reportsPagination.limit),
              itemsPerPage: reportsPagination.limit,
              totalItems: reportsPagination.total,
              onPageChange: handleReportsPageChange,
              onItemsPerPageChange: handleReportsItemsPerPageChange
            }}
          />
        ) : activeNav === 'acts-and-legal' ? (
          <ActsAndLegalPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveActsAndLegal}
            actsAndLegal={actsAndLegal}
            onAddActClick={handleAddActsAndLegalClick}
            onDelete={handleDeleteActsAndLegal}
            onEdit={handleEditActsAndLegal}
            pagination={{
              currentPage: actsAndLegalPagination.page,
              totalPages: Math.ceil(actsAndLegalPagination.total / actsAndLegalPagination.limit),
              itemsPerPage: actsAndLegalPagination.limit,
              totalItems: actsAndLegalPagination.total,
              onPageChange: handleActsAndLegalPageChange,
              onItemsPerPageChange: handleActsAndLegalItemsPerPageChange
            }}
          />
        ) : activeNav === 'policies' ? (
          <PoliciesPage 
            onBack={handleBackToDashboard}
            onSave={handleSavePolicy}
            policies={policies}
            onAddPolicyClick={handleAddPolicyClick}
            onDelete={handleDeletePolicy}
            onEdit={handleEditPolicy}
            pagination={{
              currentPage: policiesPagination.page,
              totalPages: Math.ceil(policiesPagination.total / policiesPagination.limit),
              itemsPerPage: policiesPagination.limit,
              totalItems: policiesPagination.total,
              onPageChange: handlePoliciesPageChange,
              onItemsPerPageChange: handlePoliciesItemsPerPageChange
            }}
          />
        ) : activeNav === 'strategic-plan' ? (
          <StrategicPlanPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveStrategicPlan}
            strategicPlans={strategicPlans}
            onAddPlanClick={handleAddStrategicPlanClick}
            onDelete={handleDeleteStrategicPlan}
            onEdit={handleEditStrategicPlan}
            pagination={{
              currentPage: strategicPlansPagination.page,
              totalPages: Math.ceil(strategicPlansPagination.total / strategicPlansPagination.limit),
              itemsPerPage: strategicPlansPagination.limit,
              totalItems: strategicPlansPagination.total,
              onPageChange: handleStrategicPlansPageChange,
              onItemsPerPageChange: handleStrategicPlansItemsPerPageChange
            }}
          />
        ) : activeNav === 'guideline-documents' ? (
          <GuidelineDocumentsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveGuidelineDocument}
            guidelineDocuments={guidelineDocuments}
            onAddDocumentClick={handleAddGuidelineDocumentClick}
            onDelete={handleDeleteGuidelineDocument}
            onEdit={handleEditGuidelineDocument}
            pagination={{
              currentPage: guidelineDocumentsPagination.page,
              totalPages: Math.ceil(guidelineDocumentsPagination.total / guidelineDocumentsPagination.limit),
              itemsPerPage: guidelineDocumentsPagination.limit,
              totalItems: guidelineDocumentsPagination.total,
              onPageChange: handleGuidelineDocumentsPageChange,
              onItemsPerPageChange: handleGuidelineDocumentsItemsPerPageChange
            }}
          />
        ) : activeNav === 'conference' ? (
          <ConferencePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveConference}
            conferences={conferences}
            onAddConferenceClick={handleAddConferenceClick}
            onDelete={handleDeleteConference}
            onEdit={handleEditConference}
          />
        ) : activeNav === 'exhibition' ? (
          <ExhibitionPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveExhibition}
            exhibitions={exhibitions}
            onAddExhibitionClick={handleAddExhibitionClick}
            onDelete={handleDeleteExhibition}
            onEdit={handleEditExhibition}
          />
        ) : activeNav === 'ongoing-project' ? (
          <OngoingProjectPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveOngoingProject}
            ongoingProjects={ongoingProjects}
            onAddProjectClick={handleAddOngoingProjectClick}
            onDelete={handleDeleteOngoingProject}
            onEdit={handleEditOngoingProject}
            pagination={{
              currentPage: ongoingProjectsPagination.page,
              totalPages: Math.ceil(ongoingProjectsPagination.total / ongoingProjectsPagination.limit),
              itemsPerPage: ongoingProjectsPagination.limit,
              totalItems: ongoingProjectsPagination.total,
              onPageChange: handleOngoingProjectsPageChange,
              onItemsPerPageChange: handleOngoingProjectsItemsPerPageChange
            }}
          />
        ) : activeNav === 'area-of-partnership' ? (
          <AreaOfPartnershipPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveAreaOfPartnership}
            areasOfPartnership={areasOfPartnership}
            onAddAreaClick={handleAddAreaOfPartnershipClick}
            onDelete={handleDeleteAreaOfPartnership}
            onEdit={handleEditAreaOfPartnership}
            pagination={{
              currentPage: areasOfPartnershipPagination.page,
              totalPages: Math.ceil(areasOfPartnershipPagination.total / areasOfPartnershipPagination.limit),
              itemsPerPage: areasOfPartnershipPagination.limit,
              totalItems: areasOfPartnershipPagination.total,
              onPageChange: handleAreasOfPartnershipPageChange,
              onItemsPerPageChange: handleAreasOfPartnershipItemsPerPageChange
            }}
          />
        ) : activeNav === 'fellowship-grants' ? (
          <FellowshipGrantsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFellowshipGrant}
            fellowshipGrants={fellowshipGrants}
            onAddGrantClick={handleAddFellowshipGrantClick}
            onDelete={handleDeleteFellowshipGrant}
            onEdit={handleEditFellowshipGrant}
            pagination={{
              currentPage: fellowshipGrantsPagination.page,
              totalPages: Math.ceil(fellowshipGrantsPagination.total / fellowshipGrantsPagination.limit),
              itemsPerPage: fellowshipGrantsPagination.limit,
              totalItems: fellowshipGrantsPagination.total,
              onPageChange: handleFellowshipGrantsPageChange,
              onItemsPerPageChange: handleFellowshipGrantsItemsPerPageChange
            }}
          />
        ) : activeNav === 'press-release' ? (
          <PressReleasePage 
            onBack={handleBackToDashboard}
            onSave={handleSavePressRelease}
            pressReleases={pressReleases}
            onAddPressReleaseClick={handleAddPressReleaseClick}
            onDelete={handleDeletePressRelease}
            onEdit={handleEditPressRelease}
            pagination={{
              currentPage: pressReleasesPagination.page,
              totalPages: Math.ceil(pressReleasesPagination.total / pressReleasesPagination.limit),
              itemsPerPage: pressReleasesPagination.limit,
              totalItems: pressReleasesPagination.total,
              onPageChange: handlePressReleasesPageChange,
              onItemsPerPageChange: handlePressReleasesItemsPerPageChange
            }}
          />
        ) : activeNav === 'statement' ? (
          <StatementPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveStatement}
            statements={statements}
            onAddStatementClick={handleAddStatementClick}
            onDelete={handleDeleteStatement}
            onEdit={handleEditStatement}
            pagination={{
              currentPage: statementsPagination.page,
              totalPages: Math.ceil(statementsPagination.total / statementsPagination.limit),
              itemsPerPage: statementsPagination.limit,
              totalItems: statementsPagination.total,
              onPageChange: handleStatementsPageChange,
              onItemsPerPageChange: handleStatementsItemsPerPageChange
            }}
          />
        ) : activeNav === 'costech-video' ? (
          <CostechVideoPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveVideo}
            videos={videos}
            onAddVideoClick={handleAddVideoClick}
            onDelete={handleDeleteVideo}
            onEdit={handleEditVideo}
            pagination={{
              currentPage: videosPagination.page,
              totalPages: Math.ceil(videosPagination.total / videosPagination.limit),
              itemsPerPage: videosPagination.limit,
              totalItems: videosPagination.total,
              onPageChange: handleVideosPageChange,
              onItemsPerPageChange: handleVideosItemsPerPageChange
            }}
          />
        ) : activeNav === 'community-engagement' ? (
          <CommunityEngagementPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveCommunityEngagement}
            engagements={communityEngagements}
            onAddEngagementClick={handleAddCommunityEngagementClick}
            onDelete={handleDeleteCommunityEngagement}
            onEdit={handleEditCommunityEngagement}
          />
        ) : activeNav === 'herin-institution' ? (
          <HerinInstitutionPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveHerinInstitution}
            institutions={herinInstitutions}
            onAddInstitutionClick={handleAddHerinInstitutionClick}
            onDelete={handleDeleteHerinInstitution}
            onEdit={handleEditHerinInstitution}
          />
        ) : activeNav === 'directorate' ? (
          <DirectoratePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveDirectorate}
            directorates={directorates}
            onAddDirectorateClick={handleAddDirectorateClick}
            onDelete={handleDeleteDirectorate}
            onEdit={handleEditDirectorate}
            pagination={{
              currentPage: directoratesPagination.page,
              totalPages: Math.ceil(directoratesPagination.total / directoratesPagination.limit),
              itemsPerPage: directoratesPagination.limit,
              totalItems: directoratesPagination.total,
              onPageChange: handleDirectoratesPageChange,
              onItemsPerPageChange: handleDirectoratesItemsPerPageChange
            }}
          />
        ) : (
          <>
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <h2 className="page-title">Dashboard</h2>
          </div>
          <div className="header-right">
            <button className="header-button">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="user-menu">
              <div className="user-avatar">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="admin-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-content">
                    <p className="stat-label">Number of Sections</p>
                    <p className="stat-value">{sections.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-green">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="stat-content">
                    <p className="stat-label">Number of Content</p>
                    <p className="stat-value">{sections.filter(s => s.isVisible !== false).length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-orange">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </div>
              <div className="stat-content">
                    <p className="stat-label">Number of Invisible Content</p>
                    <p className="stat-value">{sections.filter(s => s.isVisible === false).length}</p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="content-grid">
            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">Recent Activity</h3>
                <button className="card-action">View All</button>
              </div>
              <div className="card-body">
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">New user registered</p>
                      <p className="activity-time">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">System update completed</p>
                      <p className="activity-time">1 hour ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">Security alert resolved</p>
                      <p className="activity-time">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <h3 className="card-title">Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="actions-grid">
                  <button className="action-button">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add User</span>
                  </button>
                  <button className="action-button">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </button>
                  <button className="action-button">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Generate Report</span>
                  </button>
                  <button className="action-button">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Export Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
          </>
        )}
      </div>

      {/* Add Section Modal */}
      {showAddSectionForm && (
        <AddSectionModal
          onClose={handleCloseForm}
          onSave={handleSaveSection}
              editSection={editingSection}
        />
      )}

      {/* Add News Modal */}
      {showAddNewsForm && (
        <AddNewsModal
          onClose={handleCloseForm}
          onSave={handleSaveNews}
          editNews={editingNews}
          loading={savingNews}
        />
      )}

      {/* Add Partner Modal */}
      {showAddPartnerForm && (
        <AddPartnerModal
          onClose={handleCloseForm}
          onSave={handleSavePartner}
          editPartner={editingPartner}
          loading={savingPartner}
        />
      )}

      {/* Add Hero Modal */}
      {showAddHeroForm && (
        <AddHeroModal
          onClose={handleCloseForm}
          onSave={handleSaveHero}
          editHero={editingHero}
          loading={savingHero}
        />
      )}

      {showAddPositionForm && (
        <AddPositionModal
          onClose={handleCloseForm}
          onSave={handleSavePosition}
          editPosition={editingPosition}
        />
      )}
      {showAddFaqCategoryForm && (
        <AddFaqCategoryModal
          onClose={handleCloseForm}
          onSave={handleSaveFaqCategory}
          editCategory={editingFaqCategory}
        />
      )}
      {showAddFaqForm && (
        <AddFaqModal
          onClose={handleCloseForm}
          onSave={handleSaveFaq}
          editFaq={editingFaq}
          categories={faqCategories}
        />
      )}
      {showAddTeamMemberForm && (
        <AddManagementTeamModal
          onClose={handleCloseForm}
          onSave={handleSaveTeamMember}
          editMember={editingTeamMember}
          positions={positions}
        />
      )}
      {showAddCommissionMemberForm && (
        <AddCommissionMemberModal
          onClose={handleCloseForm}
          onSave={handleSaveCommissionMember}
          editMember={editingCommissionMember}
        />
      )}
      {showAddInnovationSpaceForm && (
        <AddInnovationSpaceModal
          onClose={handleCloseForm}
          onSave={handleSaveInnovationSpace}
          editSpace={editingInnovationSpace}
        />
      )}
      {showAddOnlineServiceForm && (
        <AddOnlineServiceModal
          onClose={() => {
            setShowAddOnlineServiceForm(false);
            setEditingOnlineService(null);
          }}
          onSave={handleSaveOnlineService}
          editService={editingOnlineService}
        />
      )}
      {showAddFinancialReportForm && (
        <AddFinancialReportModal
          onClose={() => {
            setShowAddFinancialReportForm(false);
            setEditingFinancialReport(null);
          }}
          onSave={handleSaveFinancialReport}
          editReport={editingFinancialReport}
        />
      )}
      {showAddMagazineForm && (
        <AddMagazineModal
          onClose={() => {
            setShowAddMagazineForm(false);
            setEditingMagazine(null);
          }}
          onSave={handleSaveMagazine}
          editMagazine={editingMagazine}
        />
      )}
      {showAddNewsletterForm && (
        <AddNewsletterModal
          onClose={() => {
            setShowAddNewsletterForm(false);
            setEditingNewsletter(null);
          }}
          onSave={handleSaveNewsletter}
          editNewsletter={editingNewsletter}
        />
      )}
      {showAddBookForm && (
        <AddBookModal
          onClose={() => {
            setShowAddBookForm(false);
            setEditingBook(null);
          }}
          onSave={handleSaveBook}
          editBook={editingBook}
        />
      )}
      {showAddReportForm && (
        <AddReportModal
          onClose={() => {
            setShowAddReportForm(false);
            setEditingReport(null);
          }}
          onSave={handleSaveReport}
          editReport={editingReport}
        />
      )}
      {showAddActsAndLegalForm && (
        <AddActsAndLegalModal
          onClose={() => {
            setShowAddActsAndLegalForm(false);
            setEditingActsAndLegal(null);
          }}
          onSave={handleSaveActsAndLegal}
          editAct={editingActsAndLegal}
        />
      )}
      {showAddPolicyForm && (
        <AddPolicyModal
          onClose={() => {
            setShowAddPolicyForm(false);
            setEditingPolicy(null);
          }}
          onSave={handleSavePolicy}
          editPolicy={editingPolicy}
        />
      )}
      {showAddStrategicPlanForm && (
        <AddStrategicPlanModal
          onClose={() => {
            setShowAddStrategicPlanForm(false);
            setEditingStrategicPlan(null);
          }}
          onSave={handleSaveStrategicPlan}
          editPlan={editingStrategicPlan}
        />
      )}
      {showAddGuidelineDocumentForm && (
        <AddGuidelineDocumentModal
          onClose={() => {
            setShowAddGuidelineDocumentForm(false);
            setEditingGuidelineDocument(null);
          }}
          onSave={handleSaveGuidelineDocument}
          editDocument={editingGuidelineDocument}
        />
      )}
      {showAddConferenceForm && (
        <AddConferenceModal
          onClose={() => {
            setShowAddConferenceForm(false);
            setEditingConference(null);
          }}
          onSave={handleSaveConference}
          editConference={editingConference}
        />
      )}
      {showAddExhibitionForm && (
        <AddExhibitionModal
          onClose={() => {
            setShowAddExhibitionForm(false);
            setEditingExhibition(null);
          }}
          onSave={handleSaveExhibition}
          editExhibition={editingExhibition}
        />
      )}
      {showAddOngoingProjectForm && (
        <AddOngoingProjectModal
          onClose={() => {
            setShowAddOngoingProjectForm(false);
            setEditingOngoingProject(null);
          }}
          onSave={handleSaveOngoingProject}
          editProject={editingOngoingProject}
        />
      )}
      {showAddAreaOfPartnershipForm && (
        <AddAreaOfPartnershipModal
          onClose={() => {
            setShowAddAreaOfPartnershipForm(false);
            setEditingAreaOfPartnership(null);
          }}
          onSave={handleSaveAreaOfPartnership}
          editArea={editingAreaOfPartnership}
        />
      )}
      {showAddFellowshipGrantForm && (
        <AddFellowshipGrantModal
          onClose={() => {
            setShowAddFellowshipGrantForm(false);
            setEditingFellowshipGrant(null);
          }}
          onSave={handleSaveFellowshipGrant}
          editGrant={editingFellowshipGrant}
        />
      )}
      {showAddHerinInstitutionForm && (
        <AddHerinInstitutionModal
          onClose={() => {
            setShowAddHerinInstitutionForm(false);
            setEditingHerinInstitution(null);
          }}
          onSave={handleSaveHerinInstitution}
          editInstitution={editingHerinInstitution}
        />
      )}
      {showAddDirectorateForm && (
        <AddDirectorateModal
          onClose={() => {
            setShowAddDirectorateForm(false);
            setEditingDirectorate(null);
          }}
          onSave={handleSaveDirectorate}
          editDirectorate={editingDirectorate}
        />
      )}
      {showAddPressReleaseForm && (
        <AddPressReleaseModal
          onClose={() => {
            setShowAddPressReleaseForm(false);
            setEditingPressRelease(null);
          }}
          onSave={handleSavePressRelease}
          editPressRelease={editingPressRelease}
        />
      )}
      {showAddStatementForm && (
        <AddStatementModal
          onClose={() => {
            setShowAddStatementForm(false);
            setEditingStatement(null);
          }}
          onSave={handleSaveStatement}
          editStatement={editingStatement}
        />
      )}
      {showAddVideoForm && (
        <AddCostechVideoModal
          onClose={() => {
            setShowAddVideoForm(false);
            setEditingVideo(null);
          }}
          onSave={handleSaveVideo}
          editVideo={editingVideo}
        />
      )}
      {showAddCommunityEngagementForm && (
        <AddCommunityEngagementModal
          onClose={() => {
            setShowAddCommunityEngagementForm(false);
            setEditingCommunityEngagement(null);
          }}
          onSave={handleSaveCommunityEngagement}
          editEngagement={editingCommunityEngagement}
        />
      )}
      {deleteConfirmation.show && (
        <DeleteConfirmationModal
          onClose={() => setDeleteConfirmation({ show: false, id: null, name: '', type: '', onConfirm: null })}
          onConfirm={deleteConfirmation.onConfirm}
          itemName={deleteConfirmation.name}
          itemType={deleteConfirmation.type}
        />
      )}
    </div>
  );
}

