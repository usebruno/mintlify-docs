export const PremiumBadge = ({ noLink }) => {
  const badge = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        fontWeight: '600',
        borderRadius: '0.5rem',
        backgroundColor: '#FCD34D',
        color: '#92400E',
        marginLeft: '0.5rem',
        lineHeight: '1.2'
      }}
    >
      PREMIUM
    </span>
  );

  if (noLink) {
    return badge;
  }

  return (
    <a
      href="https://www.usebruno.com/pricing"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      {badge}
    </a>
  );
};

export default PremiumBadge;


