import { useState, useEffect } from 'react';
import { weatherAPI } from '../utils/api';

function SavedQueries() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        location: '',
        startDate: '',
        endDate: '',
        notes: ''
    });

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const response = await weatherAPI.getAllQueries();
            if (response.data.success) {
                setQueries(response.data.data);
            }
        } catch (err) {
            setError('Failed to load saved queries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.location || !formData.startDate || !formData.endDate) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const response = await weatherAPI.createQuery({
                location: formData.location,
                dateRange: {
                    start: formData.startDate,
                    end: formData.endDate
                },
                notes: formData.notes
            });

            if (response.data.success) {
                setShowCreateForm(false);
                setFormData({ location: '', startDate: '', endDate: '', notes: '' });
                fetchQueries();
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to create query');
        }
    };

    const handleUpdate = async (id) => {
        const query = queries.find(q => q._id === id);

        try {
            const response = await weatherAPI.updateQuery(id, {
                location: formData.location || query.location,
                dateRange: {
                    start: formData.startDate || query.dateRange.start,
                    end: formData.endDate || query.dateRange.end
                },
                notes: formData.notes !== undefined ? formData.notes : query.notes
            });

            if (response.data.success) {
                setEditingId(null);
                setFormData({ location: '', startDate: '', endDate: '', notes: '' });
                fetchQueries();
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update query');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this query?')) return;

        try {
            await weatherAPI.deleteQuery(id);
            fetchQueries();
        } catch (err) {
            alert('Failed to delete query');
        }
    };

    const startEdit = (query) => {
        setEditingId(query._id);
        setFormData({
            location: query.location,
            startDate: query.dateRange.start.split('T')[0],
            endDate: query.dateRange.end.split('T')[0],
            notes: query.notes || ''
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ location: '', startDate: '', endDate: '', notes: '' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="loading"><div className="spinner"></div><p>Loading queries...</p></div>;
    }

    return (
        <div className="saved-queries">
            <div className="queries-header">
                <h2>Saved Weather Queries</h2>
                <button
                    className="create-button"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? '❌ Cancel' : '➕ Create New Query'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showCreateForm && (
                <form className="query-form" onSubmit={handleCreate}>
                    <h3>Create New Query</h3>
                    <div className="form-group">
                        <label>Location *</label>
                        <input
                            type="text"
                            placeholder="City, zip code, or coordinates"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Start Date *</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date *</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            placeholder="Optional notes..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="submit-button">💾 Save Query</button>
                </form>
            )}

            <div className="queries-list">
                {queries.length === 0 ? (
                    <div className="empty-state">
                        <p>No saved queries yet. Create one to get started!</p>
                    </div>
                ) : (
                    queries.map((query) => (
                        <div key={query._id} className="query-card">
                            {editingId === query._id ? (
                                <form className="query-edit-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(query._id); }}>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Location"
                                    />
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Notes"
                                    />
                                    <div className="edit-actions">
                                        <button type="submit" className="save-btn">✓ Save</button>
                                        <button type="button" onClick={cancelEdit} className="cancel-btn">✗ Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="query-header">
                                        <h3>{query.location}</h3>
                                        <span className="query-country">{query.country}</span>
                                    </div>

                                    <div className="query-info">
                                        <p className="query-dates">
                                            📅 {formatDate(query.dateRange.start)} - {formatDate(query.dateRange.end)}
                                        </p>
                                        <p className="query-coords">
                                            📍 {query.coordinates.lat.toFixed(4)}, {query.coordinates.lon.toFixed(4)}
                                        </p>
                                    </div>

                                    {query.weatherData?.current && (
                                        <div className="query-weather">
                                            <span className="weather-temp">{Math.round(query.weatherData.current.temp)}°C</span>
                                            <span className="weather-desc">{query.weatherData.current.weather?.description}</span>
                                            <span className="weather-humidity">💧 {query.weatherData.current.humidity}%</span>
                                        </div>
                                    )}

                                    {query.notes && (
                                        <p className="query-notes">📝 {query.notes}</p>
                                    )}

                                    <div className="query-meta">
                                        <span className="query-date">Created: {formatDate(query.createdAt)}</span>
                                    </div>

                                    <div className="query-actions">
                                        <button onClick={() => startEdit(query)} className="edit-btn">✏️ Edit</button>
                                        <button onClick={() => handleDelete(query._id)} className="delete-btn">🗑️ Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SavedQueries;
