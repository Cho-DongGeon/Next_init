import React from 'react'

export default function page() {
    const testseq = () => {
        seqlog.warn('테스트', {proptest: 1234})
    }
    testseq();
  return (
    <div>page</div>
  )
}
