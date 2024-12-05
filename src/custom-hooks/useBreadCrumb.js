import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Split the pathname into an array
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Function to format path segment (e.g., "any-any" -> "Any Any")
  const formatBreadcrumbLabel = (value) => {
    // Replace hyphens with spaces and capitalize each word
    return value
      .replace(/-/g, ' ')          // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase());  // Capitalize first letters of each word
  };

  return (
    <div>
      <ol className="breadcrumb">
        {pathnames.map((value, index) => {
          // Create the path up to the current index
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item active" aria-current="page">
              {formatBreadcrumbLabel(value)}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{formatBreadcrumbLabel(value)}</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
