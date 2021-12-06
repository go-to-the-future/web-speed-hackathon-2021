import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
  const { ref, inView } = useInView();
  const latestItem = items[items.length - 1];
  const [count, setCount] = React.useState(0);

  const prevReachedRef = React.useRef(false);

  React.useEffect(() => {
    if (!inView || latestItem === prevReachedRef.current) {
      return;
    }
    // アイテムがないときは追加で読み込まない
    if (latestItem !== undefined) {
      setCount(count + 1);
      fetchMore(count);
    }
    prevReachedRef.current = latestItem;
  }, [latestItem, inView]);

  return (
    <>
      {children}
      <div ref={ref} style={{ height: 1, width: '100%' }} />
    </>
  );
};

export { InfiniteScroll };