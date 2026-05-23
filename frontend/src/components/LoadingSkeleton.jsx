import React from 'react'

const Shimmer = ({ w = '100%', h = 14, mb = 8 }) => (
  <div className="shimmer-line" style={{ width: w, height: h, marginBottom: mb }} />
)

export default function LoadingSkeleton() {
  return (
    <div style={{ padding: '20px 18px' }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>
        Analyzing algorithm...
      </div>
      <Shimmer w="50%" h={20} mb={8} />
      <Shimmer w="30%" h={12} mb={20} />
      <Shimmer w="90%" mb={8} />
      <Shimmer w="80%" mb={8} />
      <Shimmer w="70%" mb={24} />

      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
        Building visualization...
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
        <Shimmer h={70} mb={0} />
        <Shimmer h={70} mb={0} />
      </div>

      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
        Generating steps...
      </div>
      {[1,2,3,4].map(i => <Shimmer key={i} h={56} mb={8} />)}
    </div>
  )
}
