import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

export default function NoSSR() {
  // https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);
  const NoSSR = dynamic(() => import("../components/no-ssr"), { ssr: false });

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      {NoSSR}
      <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1>
    </div>
  );
}
