import React, { useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

const MDXRenderer = ({ mdxString }) => {
  const [MdxComponent, setMdxComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const compileMDX = async () => {
      try {
        setError(null);

        // Compile the MDX string
        const { default: Component } = await evaluate(mdxString, {
          ...runtime,
          useDynamicImport: true
        });

        setMdxComponent(() => Component);
      } catch (err) {
        console.error('MDX compilation error:', err);
        setError(err.message);
      }
    };

    if (mdxString) {
      compileMDX();
    }
  }, [mdxString]);

  if (error) {
    return <div className="error">Error rendering MDX: {error}</div>;
  }

  if (!MdxComponent) {
    return <div>Loading...</div>;
  }

  return <MdxComponent />;
};

export default MDXRenderer;
