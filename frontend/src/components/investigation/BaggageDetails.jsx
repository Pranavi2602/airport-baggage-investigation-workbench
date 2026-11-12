import { Luggage } from 'lucide-react';

export default function BaggageDetails({ baggage }) {
  if (!baggage) return null;

  const fields = [
    { label: 'Bag ID', value: baggage.bagId },
    { label: 'Tag Number', value: baggage.tagNumber },
    { label: 'Booking Reference', value: baggage.bookingReference },
    { label: 'Passenger Reference', value: baggage.passengerReference },
  ];

  return (
    <div className="info-card">
      <div className="info-card-header">
        <Luggage size={18} />
        <h3>Baggage Information</h3>
      </div>
      <div className="info-card-body">
        <div className="details-grid">
          {fields.map(({ label, value }) => (
            <div className="detail-item" key={label}>
              <span className="detail-label">{label}</span>
              <span className="detail-value">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
