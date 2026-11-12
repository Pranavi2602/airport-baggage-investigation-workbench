import {
  ClipboardCheck,
  ShieldCheck,
  ArrowDownUp,
  PackagePlus,
  PlaneLanding,
  PackageMinus,
  ArrowLeftRight,
  PackageCheck,
  ScanLine,
  MapPin,
  Clock,
  Plane,
  Building,
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatDate';
import { journeyTypeConfig } from '../../utils/statusConfig';

const eventTypeMap = {
  CHECK_IN: { icon: ClipboardCheck, color: '#2563eb', label: 'Check In' },
  SECURITY_SCAN: { icon: ShieldCheck, color: '#7c3aed', label: 'Security Scan' },
  SORTED: { icon: ArrowDownUp, color: '#0891b2', label: 'Sorted' },
  LOADED: { icon: PackagePlus, color: '#16a34a', label: 'Loaded' },
  ARRIVED: { icon: PlaneLanding, color: '#0d9488', label: 'Arrived' },
  UNLOADED: { icon: PackageMinus, color: '#d97706', label: 'Unloaded' },
  TRANSFER: { icon: ArrowLeftRight, color: '#d97706', label: 'Transfer' },
  DELIVERED: { icon: PackageCheck, color: '#16a34a', label: 'Delivered' },
};

function getEventConfig(eventType) {
  return eventTypeMap[eventType] || {
    icon: ScanLine,
    color: '#64748b',
    label: eventType || 'Unknown Event',
  };
}

export default function ScanTimeline({ scanEvents }) {
  if (!scanEvents || scanEvents.length === 0) {
    return (
      <div className="info-card">
        <div className="info-card-header">
          <Clock size={18} />
          <h3>Baggage Scan Timeline</h3>
        </div>
        <div className="info-card-body">
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            No scan events found.
          </p>
        </div>
      </div>
    );
  }

  const sortedEvents = [...scanEvents].sort(
    (a, b) => new Date(a.eventTime) - new Date(b.eventTime)
  );

  // Track distinct flight numbers in chronological order to identify connecting flight legs
  const flightOrder = [];
  for (const ev of sortedEvents) {
    if (ev.flightNumber && !flightOrder.includes(ev.flightNumber)) {
      flightOrder.push(ev.flightNumber);
    }
  }
  const hasMultipleFlights = flightOrder.length > 1;

  return (
    <div className="info-card">
      <div className="info-card-header">
        <Clock size={18} />
        <h3>Baggage Scan Timeline</h3>
        <span className="info-card-count">{sortedEvents.length} events</span>
      </div>
      <div className="info-card-body">
        <div className="scan-timeline">
          {sortedEvents.map((event) => {
            const config = getEventConfig(event.eventType);
            const EventIcon = config.icon;
            const isTransfer = event.eventType === 'TRANSFER';
            const flightLegIndex = event.flightNumber
              ? flightOrder.indexOf(event.flightNumber) + 1
              : 0;
            const isConnectingFlightEvent = hasMultipleFlights && flightLegIndex > 1;

            const eventClasses = [
              'timeline-event',
              isTransfer ? 'timeline-event--transfer' : '',
              !isTransfer && isConnectingFlightEvent ? 'timeline-event--connecting' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div className={eventClasses} key={event.eventId}>
                <div
                  className="timeline-dot"
                  style={{
                    backgroundColor: isTransfer
                      ? '#d97706'
                      : isConnectingFlightEvent
                      ? journeyTypeConfig.CONNECTING.color
                      : config.color,
                  }}
                >
                  <EventIcon size={11} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-event-type">{config.label}</span>
                    <div className="timeline-badges">
                      {isTransfer && (
                        <span className="timeline-badge timeline-badge--transfer">
                          <ArrowLeftRight size={12} />
                          Transfer Event
                        </span>
                      )}
                      {isConnectingFlightEvent && (
                        <span className="timeline-badge timeline-badge--connecting">
                          <Plane size={12} />
                          Connecting Flight (Leg {flightLegIndex})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="timeline-details">
                    {event.airportCode && (
                      <span className="timeline-detail">
                        <MapPin size={14} />
                        <strong>{event.airportCode}</strong>
                      </span>
                    )}
                    {event.terminal && (
                      <span className="timeline-detail">
                        <Building size={14} />
                        {event.terminal}
                      </span>
                    )}
                    {event.flightNumber && (
                      <span
                        className={`timeline-detail ${
                          isConnectingFlightEvent ? 'timeline-detail--flight-highlight' : ''
                        }`}
                      >
                        <Plane size={14} />
                        {event.flightNumber}
                      </span>
                    )}
                    {event.eventTime && (
                      <span className="timeline-detail">
                        <Clock size={14} />
                        {formatDateTime(event.eventTime)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
