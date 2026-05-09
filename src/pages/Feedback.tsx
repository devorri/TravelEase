import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface Review {
  id: string;
  user_name: string;
  entity_type: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Feedback: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('destination');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
    if (user) setName(user.full_name);
  }, [user]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setReviews(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit feedback');
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from('reviews').insert([{
      user_id: user.id,
      user_name: name,
      entity_type: category,
      entity_id: user.id, // Dummy ID for general reviews
      rating,
      comment
    }]);

    if (!error) {
      setComment('');
      fetchReviews();
    }
    setSubmitting(false);
  };

  return (
    <section className="tab-section container animate-fade-in">
      <div className="section-header">
        <p className="section-eyebrow">Traveler Voice</p>
        <h2 className="section-title">Feedback & Reviews</h2>
      </div>

      <div className="feedback-layout">
        <div className="feedback-form-card glass">
          <h3>Share your experience</h3>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="destination">Destination</option>
                <option value="hotel">Hotel</option>
                <option value="flight">Flight</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="star-input">
                {[1, 2, 3, 4, 5].map(s => (
                  <span 
                    key={s} 
                    className={`star ${rating >= s ? 'active' : ''}`}
                    onClick={() => setRating(s)}
                  >★</span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea 
                rows={4} 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="How was your trip?"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary full-width" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        </div>

        <div className="reviews-list">
          <h3>Recent traveler stories</h3>
          {reviews.length === 0 ? <p>No reviews yet. Be the first!</p> : (
            reviews.map(review => (
              <div key={review.id} className="review-card glass animate-fade-in">
                <div className="review-header">
                  <strong>{review.user_name}</strong>
                  <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <div className="review-stars">{'★'.repeat(review.rating)}</div>
                <div className="review-category">{review.entity_type}</div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
