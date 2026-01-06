import '../css/ManagementTeamPage.css';

export function ManagementTeamPage({ onBack, onSave, teamMembers = [], positions = [], onAddTeamMemberClick, onDelete, onEdit }) {

  return (
    <div className="management-team-page">
      <div className="management-team-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="management-team-page-title">Management Team</h1>
      </div>

      <div className="management-team-page-content">
        {/* Team Members List */}
        <div className="team-members-list-container">
          <div className="team-members-list-header">
            <h2 className="team-members-list-title">All Team Members ({teamMembers.length})</h2>
            <button className="add-team-member-button" onClick={onAddTeamMemberClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Team Member</span>
            </button>
          </div>
          {teamMembers.length === 0 ? (
            <div className="no-team-members">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>No team members added yet. Create your first team member above!</p>
            </div>
          ) : (
            <div className="team-members-table-wrapper">
              <table className="team-members-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => {
                    const position = positions.find(p => p.id === member.position_id);
                    return (
                      <tr key={member.id}>
                        <td className="table-image-cell">
                          {member.image ? (
                            <div className="table-image">
                              <img src={member.image} alt={member.name} />
                            </div>
                          ) : (
                            <span className="no-image">No Image</span>
                          )}
                        </td>
                        <td className="table-name-cell">
                          <strong>{member.name}</strong>
                        </td>
                        <td className="table-position-cell">
                          {position ? position.name : member.position_id || 'N/A'}
                        </td>
                        <td className="table-description-cell">
                          {member.description || 'N/A'}
                        </td>
                        <td className="table-date-cell">
                          {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="table-actions-cell">
                          <div className="action-buttons">
                            {onEdit && (
                              <button
                                className="edit-button"
                                onClick={() => onEdit(member)}
                                title="Edit team member"
                              >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            )}
                            {onDelete && (
                              <button
                                className="delete-button"
                                onClick={() => onDelete(member.id)}
                                title="Delete team member"
                              >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
