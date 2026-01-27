export const BrunoButton = ({
  collectionUrl,
  width = 160,
  height = 40,
  className = '',
  style = {}
}) => {
  const encodedUrl = encodeURIComponent(collectionUrl);
  const buttonUrl = `https://fetch.usebruno.com?url=${encodedUrl}`;

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        margin: '2rem 0',
        ...style
      }}
      className={className}
    >
      <a 
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-block' }}
      >
        <img 
          src="https://fetch.usebruno.com/button.svg" 
          alt="Fetch in Bruno" 
          width={width} 
          height={height}
          noZoom
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            display: 'block',
            cursor: 'pointer'
          }}
        />
      </a>
    </div>
  );
};

