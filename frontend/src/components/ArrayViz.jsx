import React, { useState, useEffect, useRef } from 'react'
import { generateBubbleSortStates } from '../utils/vizHelpers'

export default function ArrayViz({ data }) {
  const nums = data.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)).slice(0, 12)
  const [states] = useState(() => generateBubbleSortStates(nums))
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(400)
  const intervalRef = useRef(null)

  const state = states[idx] || states[0]
  const max = Math.max(...state.arr, 1)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setIdx(prev => {
          if (prev >= states.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, speed)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, speed, states.length])

  const togglePlay = () => {
    if (idx >= states.length - 1) setIdx(0)
    setPlaying(p => !p)
  }

  const btnStyle = (disabled) => ({
    padding: '5px 12px', borderRadius: 6,
    border: '1px solid var(--accent)', background: 'transparent',
    color: 'var(--accent2)', fontSize: 12, fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.3 : 1,
    display: 'flex', alignItems: 'center', gap: 4, transition: 'all .2s',
  })

  return (
    <div>
      {/* Bars */}
      <div style={{
        background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)',
        padding: '16px 16px 8px', marginBottom: 8,
      }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 100 }}>
          {state.arr.map((val, i) => {
            const isComparing = state.comparing.includes(i)
            const isSorted = state.sorted.includes(i)
            const color = isComparing ? 'var(--pink)' : isSorted ? 'var(--green)' : 'var(--accent)'
            const h = Math.max(16, Math.round((val / max) * 80))
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 1 }}>
                <div style={{
                  fontSize: 9, fontFamily: 'var(--font-code)', color: 'var(--text2)', fontWeight: 600,
                }}>{val}</div>
                <div style={{
                  width: '100%', height: h, background: color,
                  borderRadius: '3px 3px 0 0', transition: 'all 0.3s ease',
                }} />
                <div style={{ fontSize: 8, color: 'var(--text3)' }}>{i}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <button style={btnStyle(idx === 0)} onClick={() => { setPlaying(false); setIdx(i => Math.max(0, i - 1)) }} disabled={idx === 0}>
          <i className="ti ti-arrow-left" /> Prev
        </button>
        <button style={btnStyle(false)} onClick={togglePlay}>
          <i className={`ti ti-${playing ? 'player-pause' : 'player-play'}`} />
          {playing ? 'Pause' : 'Play'}
        </button>
        <button style={btnStyle(idx >= states.length - 1)} onClick={() => { setPlaying(false); setIdx(i => Math.min(states.length - 1, i + 1)) }} disabled={idx >= states.length - 1}>
          Next <i className="ti ti-arrow-right" />
        </button>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-code)' }}>
          Step {idx} / {states.length - 1}
        </span>
        <select
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          style={{
            padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border2)',
            background: 'var(--bg3)', color: 'var(--text2)', fontSize: 11,
          }}
        >
          <option value={900}>Slow</option>
          <option value={400}>Normal</option>
          <option value={150}>Fast</option>
        </select>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {[['var(--accent)', 'Unsorted'], ['var(--pink)', 'Comparing'], ['var(--green)', 'Sorted']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            <span style={{ fontSize: 10, color: 'var(--text3)' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
