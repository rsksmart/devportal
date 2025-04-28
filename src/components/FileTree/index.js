import React, { useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

const FileTree = ({ children }) => {
  const parseContent = () => {
    const rawContent = React.Children.toArray(children).map(child => {
      if (typeof child === 'string') {
        return child;
      }
      return child?.props?.children || '';
    }).join('\n');

    const lines = rawContent.toString().split('\n');
    const root = { name: '', children: [], level: -1 };
    const stack = [root];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const dashMatches = trimmedLine.match(/^-+\s*/);
      if (!dashMatches) return;

      const dashes = dashMatches[0];
      const level = (dashes.match(/--/g) || []).length - 1;
      const name = trimmedLine.replace(/^-+\s*/, '').trim();

      if (!name) return;

      while (stack.length > level + 1) {
        stack.pop();
      }

      const node = {
        name,
        children: [],
        level,
        isDirectory: name.endsWith('/')
      };

      const parent = stack[stack.length - 1];
      parent.children.push(node);

      if (parent !== root) {
        parent.isDirectory = true;
      }

      stack.push(node);
    });

    return root.children;
  };

  const TreeNode = ({ node }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children.length > 0;

    const toggleExpand = (e) => {
      e.preventDefault();
      if (hasChildren) {
        setIsExpanded(!isExpanded);
      }
    };

    return (
      <li className={clsx({
        [styles.directory]: node.isDirectory,
        [styles.file]: !node.isDirectory,
        [styles.collapsed]: !isExpanded,
        [styles.hasChildren]: hasChildren
      })}>
        <span
          className={clsx(styles.name, {
            [styles.clickable]: hasChildren
          })}
          onClick={toggleExpand}
          role={hasChildren ? "button" : undefined}
          tabIndex={hasChildren ? 0 : undefined}
        >
          {node.isDirectory && hasChildren && (
            <span className={styles.arrow}>
              {isExpanded ? '▾' : '▸'}
            </span>
          )}
          <span className={styles.icon}>
            {node.isDirectory ? (isExpanded ? '📂' : '📁') : '📄'}
          </span>
          {node.isDirectory ? node.name.replace(/\/$/, '') : node.name}
        </span>
        {hasChildren && (
          <ul className={clsx(styles.children, {
            [styles.hidden]: !isExpanded
          })}>
            {node.children.map((child, index) => (
              <TreeNode key={`${child.name}-${index}`} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className={styles.fileTree}>
      <ul className={styles.root}>
        {parseContent().map((node, index) => (
          <TreeNode key={`${node.name}-${index}`} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default FileTree;
