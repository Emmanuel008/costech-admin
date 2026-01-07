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
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { authAPI, sectionsAPI, newsAPI, partnersAPI, heroesAPI, positionAPI, managementTeamAPI, commissionMembersAPI, innovationSpaceAPI, onlineServiceAPI, financialReportAPI, magazineAPI, booksAPI, reportsAPI, actsAndLegalAPI, policiesAPI, strategicPlanAPI, guidelineDocumentsAPI, conferenceAPI, exhibitionAPI, ongoingProjectAPI, areaOfPartnershipAPI, fellowshipGrantsAPI } from '../services/api';

export function AdminPanel({ onLogout }) {
  const [activeNav, setActiveNav] = useState('dashboard');
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
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: '', type: '', onConfirm: null });

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
  }, []);

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

  const fetchNews = async () => {
    try {
      const response = await newsAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to news format
        const mappedNews = response.returnData.list_of_item.map(item => ({
          id: item.id?.toString() || Date.now().toString(),
          title: item.title || '',
          description: item.description || '',
          date: item.date || item.created_at || new Date().toISOString().split('T')[0],
          image: item.image || null,
          createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        }));
        setNews(mappedNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await partnersAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to partners format
        const mappedPartners = response.returnData.list_of_item.map(partner => ({
          id: partner.id?.toString() || Date.now().toString(),
          name: partner.name || '',
          logo: partner.logo || partner.image || null,
          createdAt: partner.created_at || partner.createdAt || new Date().toISOString(),
        }));
        setPartners(mappedPartners.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching partners:', err);
    }
  };

  const fetchHeroes = async () => {
    try {
      const response = await heroesAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to heroes format
        // Use a single timestamp outside the map to ensure uniqueness
        const baseTimestamp = Date.now();
        const mappedHeroes = response.returnData.list_of_item.map((hero, index) => {
          // Use UUID as primary identifier, fallback to generated unique ID
          const uniqueId = hero.uuid || `hero-${baseTimestamp}-${index}`;
          return {
            id: uniqueId,
            uuid: hero.uuid || null,
            name: hero.name || hero.title || '',
            description: hero.description || hero.content || '',
            title: hero.title || '',
            tagline: hero.tagline || '',
            content: hero.content || '',
            preference: hero.preference || null,
            image: hero.image || null,
            createdAt: hero.created_at || hero.createdAt || new Date().toISOString(),
          };
        });
        setHeroes(mappedHeroes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error('Error fetching heroes:', err);
    }
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

  const fetchInnovationSpaces = async () => {
    try {
      const response = await innovationSpaceAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to innovation spaces format
        const mappedSpaces = response.returnData.list_of_item.map(space => ({
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
      }
    } catch (err) {
      console.error('Error fetching innovation spaces:', err);
    }
  };

  const handleSectionClick = (e) => {
    e.preventDefault();
    setActiveNav('section');
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
  };

  const handleDeleteNews = async (id) => {
    const newsItem = news.find(n => n.id === id);
    const newsName = newsItem?.title || 'this news';
    showDeleteConfirmation(id, newsName, 'news', async () => {
    try {
      const response = await newsAPI.delete(id);
      if (response.status === 'OK') {
        await fetchNews();
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
        await fetchNews();
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
    }
  };

  const handleDeletePartner = async (id) => {
    const partner = partners.find(p => p.id === id);
    const partnerName = partner?.name || 'this partner';
    showDeleteConfirmation(id, partnerName, 'partner', async () => {
    try {
      const response = await partnersAPI.delete(id);
      if (response.status === 'OK') {
        await fetchPartners();
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
        await fetchPartners();
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
    }
  };

  const handleDeleteHero = async (id) => {
    // Find hero by id or uuid (id could be either)
    const hero = heroes.find(h => h.id === id || h.uuid === id);
    if (!hero) {
      alert('Hero not found');
      return;
    }
    
    const heroName = hero.name || hero.title || 'this hero';
    // Use the id value (which contains the UUID) for deletion
    const heroId = hero.id;
    
    if (!heroId) {
      alert('Cannot delete hero: ID not found');
      return;
    }
    
    showDeleteConfirmation(heroId, heroName, 'hero', async () => {
      try {
        const response = await heroesAPI.delete(heroId);
        if (response.status === 'OK') {
          await fetchHeroes();
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
    try {
      let response;
      
      if (heroId) {
        // Find hero to get uuid
        const hero = heroes.find(h => h.id === heroId || h.uuid === heroId);
        const heroUuid = hero?.uuid || heroId;
        // Update existing hero
        response = await heroesAPI.update(heroUuid, heroData);
      } else {
        // Create new hero
        response = await heroesAPI.create(heroData);
      }
      
      if (response.status === 'OK') {
        // Refresh heroes list from API
        await fetchHeroes();
        setShowAddHeroForm(false);
        setEditingHero(null);
        alert(heroId ? 'Hero updated successfully!' : 'Hero saved successfully!');
      } else {
        alert(response.errorMessage || (heroId ? 'Failed to update hero' : 'Failed to save hero'));
      }
    } catch (err) {
      console.error('Error saving hero:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (heroId ? 'Failed to update hero. Please try again.' : 'Failed to save hero. Please try again.');
      alert(errorMessage);
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

  const fetchOnlineServices = async () => {
    try {
      const response = await onlineServiceAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to online services format
        const mappedServices = response.returnData.list_of_item.map(service => ({
          id: service.id?.toString() || Date.now().toString(),
          name: service.name || '',
          link: service.link || '',
          createdAt: service.created_at || service.createdAt || new Date().toISOString(),
        }));
        setOnlineServices(mappedServices);
      }
    } catch (err) {
      console.error('Error fetching online services:', err);
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
          await fetchOnlineServices();
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
        await fetchOnlineServices();
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

  const fetchFinancialReports = async () => {
    try {
      const response = await financialReportAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to financial reports format
        const mappedReports = response.returnData.list_of_item.map(report => ({
          id: report.id?.toString() || Date.now().toString(),
          title: report.title || '',
          description: report.description || '',
          document: report.document || null,
          createdAt: report.created_at || report.createdAt || new Date().toISOString(),
        }));
        setFinancialReports(mappedReports);
      }
    } catch (err) {
      console.error('Error fetching financial reports:', err);
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

  const fetchMagazines = async () => {
    try {
      const response = await magazineAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to magazines format
        const mappedMagazines = response.returnData.list_of_item.map(magazine => ({
          id: magazine.id?.toString() || Date.now().toString(),
          title: magazine.title || '',
          date: magazine.date || '',
          document: magazine.document || null,
          createdAt: magazine.created_at || magazine.createdAt || new Date().toISOString(),
        }));
        setMagazines(mappedMagazines);
      }
    } catch (err) {
      console.error('Error fetching magazines:', err);
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

  const fetchBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to books format
        const mappedBooks = response.returnData.list_of_item.map(book => ({
          id: book.id?.toString() || Date.now().toString(),
          title: book.title || '',
          date: book.date || '',
          document: book.document || null,
          createdAt: book.created_at || book.createdAt || new Date().toISOString(),
        }));
        setBooks(mappedBooks);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
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

  const fetchReports = async () => {
    try {
      const response = await reportsAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to reports format
        const mappedReports = response.returnData.list_of_item.map(report => ({
          id: report.id?.toString() || Date.now().toString(),
          title: report.title || '',
          date: report.date || '',
          document: report.document || null,
          createdAt: report.created_at || report.createdAt || new Date().toISOString(),
        }));
        setReports(mappedReports);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
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

  const fetchActsAndLegal = async () => {
    try {
      const response = await actsAndLegalAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to acts and legal format
        const mappedActs = response.returnData.list_of_item.map(act => ({
          id: act.id?.toString() || Date.now().toString(),
          title: act.title || '',
          date: act.date || '',
          document: act.document || null,
          createdAt: act.created_at || act.createdAt || new Date().toISOString(),
        }));
        setActsAndLegal(mappedActs);
      }
    } catch (err) {
      console.error('Error fetching acts and legal:', err);
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

  const fetchPolicies = async () => {
    try {
      const response = await policiesAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to policies format
        const mappedPolicies = response.returnData.list_of_item.map(policy => ({
          id: policy.id?.toString() || Date.now().toString(),
          title: policy.title || '',
          date: policy.date || '',
          document: policy.document || null,
          createdAt: policy.created_at || policy.createdAt || new Date().toISOString(),
        }));
        setPolicies(mappedPolicies);
      }
    } catch (err) {
      console.error('Error fetching policies:', err);
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

  const fetchStrategicPlans = async () => {
    try {
      const response = await strategicPlanAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to strategic plans format
        const mappedPlans = response.returnData.list_of_item.map(plan => ({
          id: plan.id?.toString() || Date.now().toString(),
          title: plan.title || '',
          date: plan.date || '',
          document: plan.document || null,
          createdAt: plan.created_at || plan.createdAt || new Date().toISOString(),
        }));
        setStrategicPlans(mappedPlans);
      }
    } catch (err) {
      console.error('Error fetching strategic plans:', err);
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

  const fetchGuidelineDocuments = async () => {
    try {
      const response = await guidelineDocumentsAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to guideline documents format
        const mappedDocuments = response.returnData.list_of_item.map(doc => ({
          id: doc.id?.toString() || Date.now().toString(),
          title: doc.title || '',
          date: doc.date || '',
          document: doc.document || null,
          createdAt: doc.created_at || doc.createdAt || new Date().toISOString(),
        }));
        setGuidelineDocuments(mappedDocuments);
      }
    } catch (err) {
      console.error('Error fetching guideline documents:', err);
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

  const fetchOngoingProjects = async () => {
    try {
      const response = await ongoingProjectAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to ongoing projects format
        const mappedProjects = response.returnData.list_of_item.map(proj => ({
          id: proj.id?.toString() || Date.now().toString(),
          title: proj.title || '',
          description: proj.description || '',
          image: proj.image || null,
          createdAt: proj.created_at || proj.createdAt || new Date().toISOString(),
        }));
        setOngoingProjects(mappedProjects);
      }
    } catch (err) {
      console.error('Error fetching ongoing projects:', err);
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

  const fetchAreasOfPartnership = async () => {
    try {
      const response = await areaOfPartnershipAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        // Map API response to areas of partnership format
        const mappedAreas = response.returnData.list_of_item.map(area => ({
          id: area.id?.toString() || Date.now().toString(),
          title: area.title || '',
          description: area.description || '',
          createdAt: area.created_at || area.createdAt || new Date().toISOString(),
        }));
        setAreasOfPartnership(mappedAreas);
      }
    } catch (err) {
      console.error('Error fetching areas of partnership:', err);
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

  const fetchFellowshipGrants = async () => {
    try {
      const response = await fellowshipGrantsAPI.getAll();
      if (response.status === 'OK' && response.returnData?.list_of_item) {
        const mappedGrants = response.returnData.list_of_item.map(grant => ({
          id: grant.id,
          title: grant.title || '',
          description: grant.description || '',
          status: grant.status || 'OPEN',
          image: grant.image || null
        }));
        setFellowshipGrants(mappedGrants);
      }
    } catch (err) {
      console.error('Error fetching fellowship grants:', err);
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
        alert(response.errorMessage || (grantId ? 'Failed to update fellowship grant' : 'Failed to save fellowship grant'));
      }
    } catch (err) {
      console.error('Error saving fellowship grant:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || (grantId ? 'Failed to update fellowship grant. Please try again.' : 'Failed to save fellowship grant. Please try again.');
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
            <span>Dashboard</span>
          </a>
          <a 
            href="#section" 
            className={`nav-item ${activeNav === 'section' ? 'active' : ''}`}
            onClick={handleSectionClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Section</span>
          </a>
          <a 
            href="#news" 
            className={`nav-item ${activeNav === 'news' ? 'active' : ''}`}
            onClick={handleNewsClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 4a2 2 0 002 2m0 0a2 2 0 002-2m-2 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>News</span>
          </a>
          <a 
            href="#partners" 
            className={`nav-item ${activeNav === 'partners' ? 'active' : ''}`}
            onClick={handlePartnersClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Partners</span>
          </a>
          <a 
            href="#heroes" 
            className={`nav-item ${activeNav === 'heroes' ? 'active' : ''}`}
            onClick={handleHeroesClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>Heroes</span>
          </a>
          <a 
            href="#positions" 
            className={`nav-item ${activeNav === 'positions' ? 'active' : ''}`}
            onClick={handlePositionsClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Position/Cheo</span>
          </a>
          <a 
            href="#management-team" 
            className={`nav-item ${activeNav === 'management-team' ? 'active' : ''}`}
            onClick={handleManagementTeamClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Management Team</span>
          </a>
          <a 
            href="#commission-members" 
            className={`nav-item ${activeNav === 'commission-members' ? 'active' : ''}`}
            onClick={handleCommissionMembersClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Commission Members</span>
          </a>
          <a 
            href="#innovation-space" 
            className={`nav-item ${activeNav === 'innovation-space' ? 'active' : ''}`}
            onClick={handleInnovationSpaceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Innovation Space</span>
          </a>
          <a 
            href="#online-service" 
            className={`nav-item ${activeNav === 'online-service' ? 'active' : ''}`}
            onClick={handleOnlineServiceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>Online Service</span>
          </a>
          <a 
            href="#financial-report" 
            className={`nav-item ${activeNav === 'financial-report' ? 'active' : ''}`}
            onClick={handleFinancialReportClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Financial Report</span>
          </a>
          <a 
            href="#magazine" 
            className={`nav-item ${activeNav === 'magazine' ? 'active' : ''}`}
            onClick={handleMagazineClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Magazine</span>
          </a>
          <a 
            href="#books" 
            className={`nav-item ${activeNav === 'books' ? 'active' : ''}`}
            onClick={handleBookClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Books</span>
          </a>
          <a 
            href="#reports" 
            className={`nav-item ${activeNav === 'reports' ? 'active' : ''}`}
            onClick={handleReportClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Reports</span>
          </a>
          <a 
            href="#acts-and-legal" 
            className={`nav-item ${activeNav === 'acts-and-legal' ? 'active' : ''}`}
            onClick={handleActsAndLegalClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Acts and Legal</span>
          </a>
          <a 
            href="#policies" 
            className={`nav-item ${activeNav === 'policies' ? 'active' : ''}`}
            onClick={handlePolicyClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Policies</span>
          </a>
          <a 
            href="#strategic-plan" 
            className={`nav-item ${activeNav === 'strategic-plan' ? 'active' : ''}`}
            onClick={handleStrategicPlanClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Strategic Plan</span>
          </a>
          <a
            href="#guideline-documents"
            className={`nav-item ${activeNav === 'guideline-documents' ? 'active' : ''}`}
            onClick={handleGuidelineDocumentClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Guideline Documents</span>
          </a>
          <a
            href="#conference"
            className={`nav-item ${activeNav === 'conference' ? 'active' : ''}`}
            onClick={handleConferenceClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Conference</span>
          </a>
          <a
            href="#exhibition"
            className={`nav-item ${activeNav === 'exhibition' ? 'active' : ''}`}
            onClick={handleExhibitionClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Exhibition</span>
          </a>
          <a
            href="#ongoing-project"
            className={`nav-item ${activeNav === 'ongoing-project' ? 'active' : ''}`}
            onClick={handleOngoingProjectClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>Ongoing Project</span>
          </a>
          <a
            href="#area-of-partnership"
            className={`nav-item ${activeNav === 'area-of-partnership' ? 'active' : ''}`}
            onClick={handleAreaOfPartnershipClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Area of Partnership</span>
          </a>
          <a 
            href="#fellowship-grants" 
            className={`nav-item ${activeNav === 'fellowship-grants' ? 'active' : ''}`}
            onClick={handleFellowshipGrantClick}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fellowship Grants</span>
          </a>
          <a 
            href="#users" 
            className={`nav-item ${activeNav === 'users' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('users'); }}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Users</span>
          </a>
          <a 
            href="#settings" 
            className={`nav-item ${activeNav === 'settings' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('settings'); }}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 01-6 0 3 3 0 1118 0z" />
            </svg>
            <span>Settings</span>
          </a>
          <a 
            href="#reports" 
            className={`nav-item ${activeNav === 'reports' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNavClick('reports'); }}
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Reports</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {activeNav === 'section' ? (
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
          />
        ) : activeNav === 'partners' ? (
          <PartnersPage 
            onBack={handleBackToDashboard}
            onSave={handleSavePartner}
            partners={partners}
            onAddPartnerClick={handleAddPartnerClick}
            onDelete={handleDeletePartner}
            onEdit={handleEditPartner}
          />
        ) : activeNav === 'heroes' ? (
          <HeroesPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveHero}
            heroes={heroes}
            onAddHeroClick={handleAddHeroClick}
            onDelete={handleDeleteHero}
            onEdit={handleEditHero}
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
          />
        ) : activeNav === 'online-service' ? (
          <OnlineServicePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveOnlineService}
            services={onlineServices}
            onAddServiceClick={handleAddOnlineServiceClick}
            onDelete={handleDeleteOnlineService}
            onEdit={handleEditOnlineService}
          />
        ) : activeNav === 'financial-report' ? (
          <FinancialReportPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFinancialReport}
            reports={financialReports}
            onAddReportClick={handleAddFinancialReportClick}
            onDelete={handleDeleteFinancialReport}
            onEdit={handleEditFinancialReport}
          />
        ) : activeNav === 'magazine' ? (
          <MagazinePage 
            onBack={handleBackToDashboard}
            onSave={handleSaveMagazine}
            magazines={magazines}
            onAddMagazineClick={handleAddMagazineClick}
            onDelete={handleDeleteMagazine}
            onEdit={handleEditMagazine}
          />
        ) : activeNav === 'books' ? (
          <BooksPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveBook}
            books={books}
            onAddBookClick={handleAddBookClick}
            onDelete={handleDeleteBook}
            onEdit={handleEditBook}
          />
        ) : activeNav === 'reports' ? (
          <ReportsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveReport}
            reports={reports}
            onAddReportClick={handleAddReportClick}
            onDelete={handleDeleteReport}
            onEdit={handleEditReport}
          />
        ) : activeNav === 'acts-and-legal' ? (
          <ActsAndLegalPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveActsAndLegal}
            actsAndLegal={actsAndLegal}
            onAddActClick={handleAddActsAndLegalClick}
            onDelete={handleDeleteActsAndLegal}
            onEdit={handleEditActsAndLegal}
          />
        ) : activeNav === 'policies' ? (
          <PoliciesPage 
            onBack={handleBackToDashboard}
            onSave={handleSavePolicy}
            policies={policies}
            onAddPolicyClick={handleAddPolicyClick}
            onDelete={handleDeletePolicy}
            onEdit={handleEditPolicy}
          />
        ) : activeNav === 'strategic-plan' ? (
          <StrategicPlanPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveStrategicPlan}
            strategicPlans={strategicPlans}
            onAddPlanClick={handleAddStrategicPlanClick}
            onDelete={handleDeleteStrategicPlan}
            onEdit={handleEditStrategicPlan}
          />
        ) : activeNav === 'guideline-documents' ? (
          <GuidelineDocumentsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveGuidelineDocument}
            guidelineDocuments={guidelineDocuments}
            onAddDocumentClick={handleAddGuidelineDocumentClick}
            onDelete={handleDeleteGuidelineDocument}
            onEdit={handleEditGuidelineDocument}
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
          />
        ) : activeNav === 'area-of-partnership' ? (
          <AreaOfPartnershipPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveAreaOfPartnership}
            areasOfPartnership={areasOfPartnership}
            onAddAreaClick={handleAddAreaOfPartnershipClick}
            onDelete={handleDeleteAreaOfPartnership}
            onEdit={handleEditAreaOfPartnership}
          />
        ) : activeNav === 'fellowship-grants' ? (
          <FellowshipGrantsPage 
            onBack={handleBackToDashboard}
            onSave={handleSaveFellowshipGrant}
            fellowshipGrants={fellowshipGrants}
            onAddGrantClick={handleAddFellowshipGrantClick}
            onDelete={handleDeleteFellowshipGrant}
            onEdit={handleEditFellowshipGrant}
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
        />
      )}

      {/* Add Partner Modal */}
      {showAddPartnerForm && (
        <AddPartnerModal
          onClose={handleCloseForm}
          onSave={handleSavePartner}
          editPartner={editingPartner}
        />
      )}
      {showAddHeroForm && (
        <AddHeroModal
          onClose={handleCloseForm}
          onSave={handleSaveHero}
          editHero={editingHero}
        />
      )}
      {showAddPositionForm && (
        <AddPositionModal
          onClose={handleCloseForm}
          onSave={handleSavePosition}
          editPosition={editingPosition}
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

