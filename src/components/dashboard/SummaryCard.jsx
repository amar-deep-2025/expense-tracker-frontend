const SummaryCard = ({ title, value, icon: Icon, variant, subtitle }) => {
  return (
    <article className={`summary-card summary-card-${variant}`}>
      <div className="summary-card-header">
        <div className="summary-card-icon">
          <Icon size={20} strokeWidth={2} />
        </div>

        <span className="summary-card-title">{title}</span>
      </div>

      <p className="summary-card-value">{value}</p>

      {subtitle && <p className="summary-card-subtitle">{subtitle}</p>}
    </article>
  );
};

export default SummaryCard;
